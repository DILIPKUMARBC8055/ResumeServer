import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
};
export default connectionToDB;
