import mongoose, { Schema, model } from "mongoose";


const schema = new Schema(
  {
    privateflag:{
      type: Boolean,
      default: false,
    },
    name:{
      type: String,
      required: true,
    },
   
  url: [
    {
      type: String,  
    },
  ],
    },
  {
    timestamps: true,
  }
);

export const list = mongoose.models.list || model("list", schema);
