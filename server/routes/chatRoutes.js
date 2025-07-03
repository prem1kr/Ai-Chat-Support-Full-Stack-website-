const express = require('express');
const router = express.Router();
const {
  chatWithBot,
  getChatHistory,
  getAllConversations,
  startNewConversation // ✅ Added
} = require('../controllers/chatController');

router.post('/', chatWithBot);
router.get('/:convoId', getChatHistory); 
router.get('/history/:userId', getAllConversations);
router.post('/new', startNewConversation); 

module.exports = router;
