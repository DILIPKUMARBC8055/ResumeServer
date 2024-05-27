import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectionToDB from "./src/config/mongoose.js";
import messageRoute from "./src/Route/message.route.js";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
const server = express();
server.use(cors());
server.use(bodyParser.json()); // Use bodyParser.json() to parse JSON bodies

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
server.set("views", path.join(path.resolve(), "src", "views"));
server.set("view engine", "ejs");
server.use("/", messageRoute);

server.listen(3000, async () => {
  // Make the callback async
  await connectionToDB(); // Await connectionToDB() to ensure database connection
  console.log("Server is listening at port 3000");
});
