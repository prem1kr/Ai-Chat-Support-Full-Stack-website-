const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  lastMessage: {
    type: String,
    default: '',
  },
  messages: [messageSchema],
}, {
  timestamps: true // ✅ Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Conversation', conversationSchema);
