const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema({
  massage: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  received: {
    type: String,
    required: true,
  },
});

module.exports = WhatsappMessages = mongoose.model("messages", whatsappSchema);
