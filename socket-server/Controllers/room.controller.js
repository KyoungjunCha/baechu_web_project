// const Room = require("../Models/room");
// const roomController = {};

// roomController.getAllRooms = async () => {
//   const roomList = await Room.find({});
//   return roomList;
// };

// roomController.joinRoom = async (roomId, user) => {
//   try {
//     const room = await Room.findById(roomId);
//     if (!room) {
//       throw new Error("해당 방이 없습니다.");
//     }

//     if (!room.members.includes(user._id)) {
//       room.members.push(user._id);
//       await room.save();
//     }

//     if (!user.room.includes(roomId)) {
//       user.room.push(roomId);
//       await user.save();
//     }
//   } catch (error) {
//     throw new Error(`Error joining room: ${error.message}`);
//   }
// };

// roomController.createRoom = async roomName => {
//   const existingRoom = await Room.findOne({ room: roomName });
//   if (existingRoom) {
//     throw new Error("이미 존재하는 방입니다.");
//   }

//   const room = new Room({
//     room: roomName,
//     members: []
//   });

//   await room.save();
//   return room;
// };

// module.exports = roomController;

const Room = require("../Models/room");
const roomController = {};

roomController.getAllRooms = async () => {
  const roomList = await Room.find({});
  return roomList;
};

roomController.getRoomById = async roomId => {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return { ok: false, message: "해당 방이 없습니다." };
    }
    return { ok: true, room: room };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

roomController.joinRoom = async (roomId, user) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new Error("해당 방이 없습니다.");
    }

    if (!room.members.includes(user._id)) {
      room.members.push(user._id);
      await room.save();
    }

    if (!user.room.includes(roomId)) {
      user.room.push(roomId);
      await user.save();
    }
  } catch (error) {
    throw new Error(`Error joining room: ${error.message}`);
  }
};

roomController.createRoom = async roomData => {
  try {
    const existingRoom = await Room.findOne({ room: roomData.roomName });
    if (existingRoom) {
      throw new Error("이미 존재하는 방입니다.");
    }

    const room = new Room({
      room: roomData.roomName,
      category: roomData.category,
      votetitle: roomData.voteTitle,
      description: roomData.description,
      price: roomData.price,
      members: []
    });

    await room.save();
    return room;
  } catch (error) {
    throw new Error(`Error creating room: ${error.message}`);
  }
};

module.exports = roomController;
