const connection = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const accessSecretKey = 'accessSecretKey'
const refreshSecretKey = 'refreshSecretKey'


// 로그인 처리 함수
exports.login = async (req, res) => {
    const { userNickName, password } = req.body;

    let query = "SELECT * FROM user WHERE userNickName = ? LIMIT 1";
    connection.query(query, [userNickName], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "서버 에러" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "사용자를 찾을 수 없습니다." });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
        }

        const accessToken = exports.generateAccessToken(user);
        const refreshToken = exports.generateRefreshToken(user);

        res.json({ success: true, message: "로그인 성공", accessToken, refreshToken });
    });
};

// 액세스 토큰 생성 함수
exports.generateAccessToken = (user) => {
    return jwt.sign({
        user_id: user.user_id,
        userNickName: user.userNickName,
        email: user.email,
        province: user.province,
        city: user.city,
        birthday: user.birthday
    }, accessSecretKey, { expiresIn: "15m" });
};

// 리프레시 토큰 생성 함수
exports.generateRefreshToken = (user) => {
    return jwt.sign({ user_id: user.user_id }, refreshSecretKey, { expiresIn: "7d" });
};

// 리프레시 토큰으로 액세스 토큰 재발급 함수
exports.refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, refreshSecretKey, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = exports.generateAccessToken(user);
        res.json({ accessToken });
    });
};

// 로그아웃 처리 함수
exports.logout = (req, res) => {
    // 클라이언트 측에서 토큰 제거
    res.json({ success: true, message: "로그아웃 성공" });
};



// const login = (req, res) => {
//     const { userNickName, password } = req.body;

//     // 사용자 데이터를 데이터베이스에서 찾습니다.
//     let query = "SELECT * FROM user WHERE userNickName = ? LIMIT 1";
//     connection.query(query, [userNickName], async (err, results) => {
//         if (err) {
//             console.error("Error fetching user data:", err);
//             return res.status(500).json({ success: false, message: "서버 에러" });
//         }

//         if (results.length === 0) {
//             // 해당 닉네임을 가진 사용자가 없을 경우
//             return res.status(401).json({
//                 success: false,
//                 message: "해당 닉네임을 가진 사용자를 찾을 수 없습니다."
//             });
//         }

//         const user = results[0];
//         // 비밀번호 검증
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         const accesstoken = accessToken(user);
//         const refreshtoken = refreshToken(user);

//         if (!isPasswordValid) {
//             // 비밀번호가 일치하지 않을 경우
//             return res
//                 .status(401)
//                 .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
//         }

//         // 03.26 수정

//         // // JWT 토큰 발급
//         // const token = jwt.sign(
//         //     {
//         //         user_id: user.user_id,
//         //         userNickName: user.userNickName,
//         //         email: user.email,
//         //         province: user.province,
//         //         city: user.city,
//         //         birthday: user.birthday
//         //     },
//         //     secretKey,
//         //     { expiresIn: "1h" } // 토큰 만료 시간 설정 (1시간)
//         // );

//         // 로그인 성공 및 토큰 전송
//         res.json({
//             success: true,
//             message: "로그인 성공",
//             accessToken,
//             refreshToken
//         });
//     });
// }

// // 03.26 수정
// // const accessToken = (req, res) => {
// //     //사용자를 특정할 수 있는 기능
// //     try {
// //         const token = req.accessToken;
// //         const data = jwt.verify(token, secretKey);

// //         const userData = connection.filter(item => {
// //             return item.userNickName === data.userNickName;
// //         })[0];

// //         const { password, ...others } = userData;

// //         res.status(200).json(others);
// //     } catch (error) {
// //         res.status(500).json(error)
// //     }
// // }

// const accessToken = (user) => {
//     return jwt.sign(
//         {
//             user_id: user.user_id,
//             userNickName: user.userNickName,
//             email: user.email,
//             province: user.province,
//             city: user.city,
//             birthday: user.birthday
//         },
//         accessSecretKey,
//         { expiresIn: "1m" }
//     );
// };


// // 03.26 수정
// // const refreshToken = (req, res) => {
// //     // access token 갱신
// //     try {
// //         const token = req.refreshToken;
// //         const data = jwt.verify(token, secretKey);

// //         const userData = connection.filter(item => {
// //             return item.userNickName == data.userNickName;
// //         })[0]


// //         //access token 새로 발급
// //         const accessToken = jwt.sign(
// //             {
// //                 user_id: userData.user_id,
// //                 userNickName: userData.userNickName,
// //                 email: userData.email,
// //                 province: userData.province,
// //                 city: userData.city,
// //                 birthday: userData.birthday
// //             },
// //             secretKey,
// //             { expiresIn: "1m" } // 토큰 만료 시간 설정 (1시간)
// //         );

// //         res.json("accessToken", accessToken, {
// //             success: true,
// //             message: "로그인 성공",
// //             token
// //         })

// //         res.status(200).json("Access Token Recreated")
// //     } catch (error) {
// //         res.status(500).json(error)
// //     }
// // }


// const refreshToken = (req, res) => {
//     const { token } = req.body;
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, refreshSecretKey, (err, user) => {
//         if (err) return res.sendStatus(403);

//         const accesstoken = accessToken(user);
//         res.json({
//             accesstoken
//         });
//     });
// };


// //클라이언트에서 app.js useEffect 훅 사용해서 최초 요청시에 success 를 사용하게됨.
// // 걍 리액트에서 처음에 전부 돌아간다는것
// const loginSuccess = (req, res) => {
//     try {
//         const token = req.accessToken;
//         const data = jwt.verify(token, secretKey)
//         const userData = connection.filter(item => {
//             return item.userNickName === data.userNickName;
//         })[0]

//         res.status(200).json(userData);

//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// const logout = (req, res) => {
//     try {
//         res.localStorage.removeItem('token');
//         res.status(200).json("Logout Success");
//         console.log('로그아웃 완료');
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// module.exports = {
//     login,
//     accessToken,
//     refreshToken,
//     loginSuccess,
//     logout
// }