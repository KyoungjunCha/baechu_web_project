const maria = require('mysql');
const conn = maria.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'baechu',
    password:'1234',
    database:'baechu'
});
module.exports = conn;