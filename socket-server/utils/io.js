const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller")

module.exports = function (io) {
    io.on("connection", async (socket) => {
        console.log("client is connected", socket.id);

        // user 정보는 따로 처리 Controller 에서
        // socket.on('login',async(userName,cb)=>{
        //     console.log("backend",userName);
        // })

        socket.on("login", async (userName, cb) => {
            try {
                const user = await userController.saveUser(userName, socket.id);
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: {id:null,name:"system"},
                };
                io.emit("message",welcomeMessage);
                cb({ ok: true, data: user });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("sendMessage", async (message, cb) => {
            try {
                //유저 찾기 socket.id 로 
                const user = await userController.checkUser(socket.id);
                //메시지 저장(유저 id 매개변수로 저장)
                const newMessage = await chatController.saveChat(message, user);

                //새로운 메시지 모두에게 전송
                io.emit("message", newMessage);
                cb({ ok: true })
            } catch (error) {
                cb({ ok: false, error: error.message });
            }


        })

        socket.on("disconnect", () => {
            console.log("user is disconnected");
        });
    });

}