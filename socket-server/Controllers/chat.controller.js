const Chat = require("../Models/chat")
const chatController = {}

chatController.saveChat = async(message,user)=>{
    const newMessage = new Chat({
        chat:message,
        user:{
            id:user._id, //몽고db id 형식
            name:user.name
        }
    })
    await newMessage.save();
    return newMessage
}

module.exports = chatController