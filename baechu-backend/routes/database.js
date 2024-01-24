// module.exports = {
//     user			:process.env.NODE_ORACLEDB_USER || "ex_user",
//     password		:process.env.NODE_ORACLEDB_PASSWORD || "1234",
//     connectString	:process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/xe",
//     externalAuth	:process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
// };
module.exports = {
    user			:process.env.NODE_ORACLEDB_USER || "c##ex_user",
    password		:process.env.NODE_ORACLEDB_PASSWORD || "1234",
    connectString	:process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/orcl",
    externalAuth	:process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};