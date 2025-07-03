const axios = require('axios');
const Conversation = require('../models/Conversation');

// Send message and get Gemini bot response
exports.chatWithBot = async (req, res) => {
  const { userId, convoId, message } = req.body;

  if (!userId || !convoId || !message) {
    return res.status(400).json({ error: "userId, convoId and message are required." });
  }

  try {
    // Send request to Gemini API
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );

    const botMessage =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I didn't understand that.";

    // Fetch conversation by convoId
    let convo = await Conversation.findById(convoId);
    if (!convo) return res.status(404).json({ error: 'Conversation not found.' });

    // Push both user and bot messages
    convo.messages.push({ sender: 'user', text: message });
    convo.messages.push({ sender: 'bot', text: botMessage });
    convo.lastMessage = botMessage;
    await convo.save();

    res.json({ reply: botMessage });
  } catch (err) {
    console.error("Gemini API error:", err?.response?.data || err.message);
    res.status(500).send("Error fetching response from Gemini API.");
  }
};

// Get messages from a conversation
exports.getChatHistory = async (req, res) => {
  const { convoId } = req.params;
  try {
    const convo = await Conversation.findById(convoId);
    if (!convo) return res.status(404).send("Conversation not found.");
    res.json(convo.messages || []);
  } catch (err) {
    console.error("Chat history error:", err.message);
    res.status(500).send("Failed to fetch chat history.");
  }
};

// Get all conversations for the user
exports.getAllConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const convos = await Conversation.find({ userId });
    const simplified = convos.map(convo => {
      const lastMsg = convo.messages[convo.messages.length - 1];
      return {
        _id: convo._id,
        lastMessage: lastMsg?.text || '',
        timestamp: lastMsg?.timestamp || convo.updatedAt,
      };
    });
    res.json(simplified);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch conversations.");
  }
};

// Start a new conversation
exports.startNewConversation = async (req, res) => {
  const { userId } = req.body;
  try {
    const convo = new Conversation({ userId, messages: [] });
    await convo.save();
    res.status(201).json({ convoId: convo._id });
  } catch (err) {
    console.error('Failed to create new conversation:', err);
    res.status(500).send('Could not start new chat');
  }
};
