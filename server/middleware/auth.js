import jwt from "jsonwebtoken";


const isAuthenticated = async(req, res, next) => {
    try{

  const token = req.cookies["UPlay"];
  console.log("*********",token);

        if(!token){
           return  res.redirect("https://move-list.vercel.app/login");
        }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req._id = decodedData._id;

  console.log("decodedData 3334434",decodedData);

  next();
    }catch(err){

        // redirect
        console.log(err);
     return res.redirect("https://move-list.vercel.app/login");
    // return res.redirect("http://localhost:3000/login");
    }
};






  

export { isAuthenticated };
