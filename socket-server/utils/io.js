const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");
const roomController = require("../Controllers/room.controller");
const voteController = require("../Controllers/vote.controller");

module.exports = function(io) {
  io.on("connection", async socket => {
    console.log("client is connected", socket.id);
    socket.emit("rooms", await roomController.getAllRooms());

    socket.on("login", async (userName, cb) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" }
        };
        io.to(user.room.toString()).emit("message", welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("createRoom", async (data, cb) => {
      try {
        const room = await roomController.createRoom(data);
        socket.emit("rooms", await roomController.getAllRooms());
        cb({ ok: true, data: room });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("getRoomInfo", async (roomId, callback) => {
      try {
        const room = await roomController.getRoomById(roomId); // 가정: 이 메서드는 특정 ID를 가진 방을 반환
        if (room) {
          // 방 정보를 찾았을 경우, 클라이언트에 전송
          callback({ ok: true, data: room });
        } else {
          // 방을 찾지 못했을 경우, 오류 메시지 전송
          callback({ ok: false, message: "Room not found." });
        }
      } catch (error) {
        callback({ ok: false, message: error.message });
      }
    });

    // 서버에서 소켓 이벤트 처리 부분에 콘솔 로그 추가
    socket.on("sendMessage", async (data, cb) => {
      try {
        const { message, room } = data;
        const user = await userController.checkUser(socket.id);
        if (user && room) {
          const savedMessage = await chatController.saveChat(
            room,
            message,
            user
          );
          // io.to(room).emit("message", savedMessage);
          io.emit("message", savedMessage);
          console.log("Message sent:", savedMessage); // 콘솔에 메시지 출력
          cb({ ok: true });
        } else {
          cb({ ok: false, error: "User or currentRoom not found" });
        }
      } catch (error) {
        console.error("Error in sendMessage:", error);
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendVote", async (data, cb) => {
      try {
        const { vote, room } = data;
        const user = await userController.checkUser(socket.id);
        if (user && room) {
          const savedVote = await voteController.saveVote(io, room, vote, user);
          io.to(room).emit("vote", savedVote);
          console.log("Vote sent:", savedVote);
          cb({ ok: true });
        } else {
          cb({ ok: false, error: "User or vote Data not found" });
        }
      } catch (error) {
        console.log("Error in Votedata:", error);
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("getVoteCounts", async (roomId, cb) => {
      try {
        const voteCounts = await voteController.getVoteCounts(roomId);
        cb({ ok: true, data: voteCounts });
      } catch (error) {
        console.error("Error getting vote counts:", error);
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("joinRoom", async (roomId, cb) => {
      try {
        const user = await userController.checkUser(socket.id);
        await roomController.joinRoom(roomId, user);
        socket.join(user.room.toString());
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" }
        };
        io.to(user.room.toString()).emit("message", welcomeMessage);
        io.emit("rooms", await roomController.getAllRooms());
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("getChatHistory", async (roomId, cb) => {
      try {
        const chatHistory = await chatController.getChatHistory(roomId);
        cb({ ok: true, data: chatHistory });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("leaveRoom", async (_, cb) => {
      try {
        const user = await userController.checkUser(socket.id);
        await roomController.leaveRoom(user);
        const leaveMessage = {
          chat: `${user.name} left this room`,
          user: { id: null, name: "system" }
        };
        socket.broadcast.to(user.room.toString()).emit("message", leaveMessage);
        io.emit("rooms", await roomController.getAllRooms());
        socket.leave(user.room.toString());
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
