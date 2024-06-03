import {User} from "../model/user.js";
import {list as List} from "../model/list.js";
import {playList} from "../model/playlist.js";

//create a new list


  export const createList = async (req, res) => {
    try{
        const {isPrivate,listName}=req.body;
        const userId=req._id; 
        console.log("222",req.body);
        const userExits = await User.findById(userId).populate
        ({
            path: 'playList',
            populate: {
              path: 'lists',
              model: 'list'
            }
          });
      
        if(!userExits) return res.status(400).json({success:false,message:"User not found"});
    // check if list already exists
    const exists=userExits.playList.lists.find((list)=>list.name===listName);

    if(exists) return res.status(400).json({success:false,message:"List already exists"});
     
        const listt=await List.create({name:listName,privateflag:isPrivate});
 

    userExits.playList.lists.push(listt._id);

    
        await userExits.playList.save();
        
        res.status(200).json({success:true,message:"List created successfully"});
       
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }   
}

// add item to list
export const addItem=async(req,res)=>{
    try{
        let {url}=req.body;
   url=url.split(":")[1];
        console.log("url^^^^^^^^^^",url);
        const listId=req.params.id;
        const userId=req._id;

        const user=await User.findById(userId);
        if(!user) return res.status(400).json({success:false,message:"User not found"});

        const listt=await List.findById(listId);
        const exists=listt.url.includes(url);
        if(exists) return res.status(400).json({success:false,message:"Already exists"});
      
        const item=await List.findByIdAndUpdate(listId,{$push:{url}});
        res.status(200).json({success:true,message:" added successfully",data:item});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

//show personal list
export const showListData=async(req,res)=>{
    try{
        const userId=req._id;
    const listId=req.params.id;
    const user=await User.findById(userId);
    if(!user) return res.status(400).json({success:false,message:"User not found"});
    const list=await List.findById(listId);
    if(!list) return res.status(400).json({success:false,message:"List not found"});
    res.status(200).json({success:true,data:list});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

// show all personal list
export const showAllPersonalList=async(req,res)=>{
    try{
        const userId=req._id;
        const user=await User.findById(userId).populate
        ({
            path: 'playList',
            populate: {
              path: 'lists',
              model: 'list'
            }
          });
        
        if(!user) return res.status(400).json({success:false,message:"User not found"});
        res.status(200).json({success:true,data:user.playList.lists});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    };
}


//show all list that is public
 export   const showAllList=async(req,res)=>{
    try{
        const userId=req._id;
        const user=await User.findById(userId);
        if(!user) return res.status(400).json({success:false,message:"User not found"});
        const list=await List.find({privateflag:false});
        res.status(200).json({success:true,data:list});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
// change list visibility
export const changeVisibility=async(req,res)=>{
    try{
        const userId=req._id;
        const listId=req.params.id;
        const user=await User.findById(userId);
        if(!user) return res.status(400).json({success:false,message:"User not found"});
        const list=await List.findById(listId);
        if(!list) return res.status(400).json({success:false,message:"List not found"});
        list.privateflag=!privateflag;
        await list.save();
        res.status(200).json({success:true,message:"Visibility changed successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

//particular list detalis 
export  const showDetails=async(req,res)=>{
    try{
        const listId=req.params.id;
        const list=await List.findById(listId);
        if(!list) return res.status(400).json({success:false,message:"List not found"});
        res.status(200).json({success:true,data:list.url});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


