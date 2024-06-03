import mongoose, { Schema, model } from "mongoose";


const schema = new Schema(
  {
    
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        }, 
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'list',  
    },
  ],
    },
  {
    timestamps: true,
  }
);

export const playList = mongoose.models.playList || model("playList", schema);
