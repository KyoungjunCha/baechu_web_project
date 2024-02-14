// voteController.js

const Vote = require("../Models/vote");

const voteController = {};

voteController.getVoteCounts = async roomId => {
  try {
    // 해당 방에서의 모든 투표를 가져옵니다.
    const votes = await Vote.find({ room: roomId });

    // agree와 disagree의 총 수를 계산합니다.
    let agreeCount = 0;
    let disagreeCount = 0;
    votes.forEach(vote => {
      if (vote.voteType === "agree") {
        agreeCount++;
      } else if (vote.voteType === "disagree") {
        disagreeCount++;
      }
    });
    console.log(
      `투표 정보 가져오기 성공 - Agree: ${agreeCount}, Disagree: ${disagreeCount}`
    );
    return { agreeCount, disagreeCount };
  } catch (error) {
    console.error(`투표 정보 가져오기 중 오류 발생 : ${error.message}`);
    throw new Error(`투표 정보 가져오기 중 오류 발생 : ${error.message}`);
  }
};

voteController.saveVote = async (io, roomId, receiveVote, user) => {
  try {
    // 중복 투표 방지: 사용자가 이미 해당 방에서 투표했는지 확인
    const existingVote = await Vote.findOne({ room: roomId, user: user._id });
    if (existingVote) {
      throw new Error(`User ${user.name} has already voted in this room`);
    }

    // 새로운 투표 생성
    const newVote = new Vote({
      voteType: receiveVote,
      user: user._id,
      room: roomId
    });

    await newVote.save();

    // 실시간 투표 갱신: 새로운 투표 정보를 해당 방의 모든 사용자에게 전송
    io.to(roomId).emit("newVote", newVote);

    return newVote;
  } catch (error) {
    throw new Error(`투표 저장 중 오류 발생 : ${error.message}`);
  }
};

module.exports = voteController;
