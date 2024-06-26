import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "./helper.js";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  sameSite: isProduction ? "none" : "lax", // Use "none" for cross-site cookies in production, "lax" for local development
  httpOnly: true,
  secure: isProduction, // Secure flag true in production, false in development
  path: "/",
};



const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "UPlay" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};





const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};



export {
  connectDB,
  cookieOptions,
  uploadFilesToCloudinary,
};
