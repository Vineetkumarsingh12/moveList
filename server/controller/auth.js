import { compare } from "bcrypt";
import { User } from "../model/user.js";
import jwt from "jsonwebtoken";
import {
  cookieOptions,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {playList} from "../model/playlist.js";

dotenv.config();



// Create a new user and save it to the database and save token in cookie
const newUser =async(req,res) => {

    try{
  const { name,email, password,gender} = req.body;
    if(!name || !email || !password) return res.status(400).json({success:false,message:"Please fill all the fields"});
  
    console.log(req.body);
   
  const file = req.file;
  console.log(file);

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image",
    });
  }




  const userExists= await User.findOne({email:email});
    if(userExists) return res.status(400).json({success:false,message:"User already exists"});
    console.log(userExists);

  const result = await uploadFilesToCloudinary([file]);

 if(!result) return res.status(400).json({success:false,message:"Image upload failed"});

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };


  // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

  console.log("pass1");
  const playlist = await playList.create({});

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
    avatar,
    playList:playlist._id
  });

  playlist.user = user._id;

  console.log("pass2");

  

  
    return res.status(200).json({
        success: true,
        message: "User created successfully",
        });
  
   
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false,message:"Something went wrong"});
  }
}

// Login user and save token in cookie
const login = async(req,res) => {
    try{
        const { email, password } = req.body;


 console.log("login", req.body);
        const user = await User.findOne({ email }).select("+password")
        if (!user) return res.status(400).json({success:false,message:"Invalid email or Password"});

        const isMatch = await compare(password, user.password);


        
  if (!isMatch)
  return res.status(400).json({
    success: false,
    message: "Invalid email or Password",
  });
    user.password = undefined;

     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d', 
      });
  


     return  res.cookie("UPlay", token, cookieOptions).status(200).json({
        data:user,
        success: true,
   token,
        message: "Logged in successfully",
      });



    
   
}catch(err){
    return res.status(500).json({success:false,message:"Something went wrong"});
}
}

  
//logout
const logout = async (req, res) => {
  console.log("logout2222");
    try{
  return res.status(200).cookie("UPlay", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
}catch(err){
  console.log(err);
    return res.status(500).json({success:false,message:"Something went wrong"});
}
};



export {


  login,
  logout,
  newUser,

};
