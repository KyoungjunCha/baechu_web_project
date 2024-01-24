const express = require('express');
const router = express.Router();

// Oracle DB 
const dbConf = require('./database');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

router.get('/', function(req, res) {
    oracledb.getConnection(dbConf, (err, conn) => {
        if(err){
          console.error("ORA-ERROR: " + err.message);
          return;
        }
        
        let query = 'select * from member';
        conn.execute(query, [], function(err, result){
          if(err){
            console.error(err.message);
            doRelease(conn);
            return;
          }
          console.log(result.rows);
          doRelease(conn, result.rows);
        });
    });

    // DB 연결해제
    function doRelease(conn, rows){
        conn.release(function(err){
            if(err){
                console.error(err.message);
            }
            console.log('list size:' + rows.length);
            res.send(rows);
        })
    }
});

router.post('/', (req, res) => {
    oracledb.getConnection(dbConf, (err, conn) => {
        if(err){
          console.error("ORA-ERROR: " + err.message);
          return;
        }
        
        let query = 'INSERT INTO USERS (USERID, USERNAME, USERPASSWORD, USERAGE, USEREMAIL) ' +
                    'VALUES (:USERID, :USERNAME, :USERPASSWORD, :USERAGE, :USEREMAIL)';
        
        let binddata = [
            req.body.id,
            req.body.name,
            req.body.password,
            Number(req.body.age),
            req.body.email
        ];

        conn.execute(query, binddata, function(err, result){
          if(err){
            console.error(err.message);
            doRelease(conn);
            return;
          }
          console.log('Row Insert ' + result.rowsAffected);
          doRelease(conn, result.rowsAffected);
        });
    });

    // DB 연결해제
    function doRelease(conn, result){
        conn.release(function(err){
            if(err){
                console.error(err.message);
            }
            res.send('' + result);
        })
    }
});

router.get('/:id', function(req, res) {
    res.send('Received a GET request, param:' + req.params.id);
});

router.post('/1', function(req, res) {
    console.log(JSON.stringify(req.body, null, 2));
    res.json({
        success:true,
        user:req.body.username
    });
});

router.put('/', function(req, res) {
    res.status(400).json({message:'Hey, You. Bad Request!'});
});

router.delete('/', function(req, res) {
    res.send('Received a DELETE request');
});

module.exports = router;