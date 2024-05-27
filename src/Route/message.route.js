import { Router } from "express";
import Message from "../models/Message.model.js";

const messageRoute = Router();

messageRoute.get("/", async (req, res) => {
  try {
    // Fetch all messages from the database and sort them by sendAt field in descending order
    const messages = await Message.find().sort({ sendAt: 1 });
    // Group messages by day and time
    const messagesByDayAndTime = {};
    messages.forEach((message) => {
      const dayAndTime = message.sendAt; // Assuming sendAt is already in string format
      if (!messagesByDayAndTime[dayAndTime]) {
        messagesByDayAndTime[dayAndTime] = [];
      }
      messagesByDayAndTime[dayAndTime].push(message);
    });

    // Render UI to view messages day-wise with time
    res.render("messages", { messagesByDayAndTime });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

messageRoute.post("/submit_form", async (req, res) => {
  try {
    const { Name, Email, message } = req.body;
    console.log(req.body);

    const newMessage = new Message({ Name, Email, message });

    await newMessage.save();
    res.send("Message sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

export default messageRoute;
