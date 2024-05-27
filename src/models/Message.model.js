import mongoose from "mongoose";

// Define a schema and model for messages
const messageSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  message: String,
  sendAt: { type: String, default: new Date().toLocaleTimeString() },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
