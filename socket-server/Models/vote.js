const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: true
    },
    voteType: {
      type: String,
      enum: ["agree", "disagree"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);
