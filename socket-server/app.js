const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

// const roomSchema = require("./Models/room.js");
// const Room = mongoose.model("Room", roomSchema);

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to database"));

// app.get("/", async (req, res) => {
//   Room.insertMany([
//     {
//       room: "자바스크립트 단톡방",
//       members: []
//     },
//     {
//       room: "리액트 단톡방",
//       members: []
//     },
//     {
//       room: "NodeJS 단톡방",
//       members: []
//     }
//   ])
//     .then(result => {
//       console.log("InsertMany Result:", result);
//       res.send("ok");
//     })
//     .catch(error => {
//       console.error("Error during insertMany:", error);
//       res.status(500).send("Internal Server Error");
//     });
// });

module.exports = app;
