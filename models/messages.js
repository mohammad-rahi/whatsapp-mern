const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema({
  massage: {
    type: String,
    required: true,
  },
  senderUid: {
    type: String,
    required: true,
  },
  receiverUid: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = WhatsappMessages = mongoose.model("messages", whatsappSchema);
