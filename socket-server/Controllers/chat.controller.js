const Chat = require("../Models/chat");
const chatController = {};

chatController.saveChat = async (roomId, receivedMessage, user) => {
  try {
    const newChat = new Chat({
      chat: receivedMessage,
      user: {
        id: user._id,
        name: user.name
      },
      room: roomId
    });

    await newChat.save();
    return newChat;
  } catch (error) {
    throw new Error(`채팅 저장 중 오류 발생: ${error.message}`);
  }
};

chatController.getChatHistory = async roomId => {
  const chatHistory = await Chat.find({ room: roomId }).sort({ createdAt: 1 });
  return chatHistory;
};

module.exports = chatController;
