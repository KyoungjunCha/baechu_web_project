const express = require('express');
const router = express.Router();

// Maria DB 
const connection = require('./db');

// DB 연결해제
function doRelease(conn, message){
      conn.release(function(err){
          if(err){
              console.error(err.message);
          }
          console.log(message);
      })
}

router.get('/', function(req, res) {

    connection.query('SELECT * from customers where isDeleted = 0', (error, rows, fields) => {
    if(error){
      console.error(error.message);
      return;
    }

    // 객체의 키를 배열로 추출하여 리스트 생성
    const result = new ArrayList;
    for(index in rows){
      const value = Object.values(rows[index]);

      const L = require("list");
      var list = L.list(value);
      result.add(list.prefix);
    }
      
    res.send(result);
    });
});

const multer = require('multer');
const ArrayList = require('arraylist');
const upload = multer({dest:'./upload'});

router.post('/', upload.single('image'), (req, res) => {
  try {
    let query = 'INSERT INTO customers (id, image, name, birthday, gender, job, createddate, isDeleted) ' +
                 'VALUES (?, ?, ?, ?, ?, ?, NOW(), 0)';

    console.log(req.file);

    let binddata = [
        Number(req.body.id),
        '/image/' + req.file.filename,
        req.body.name,
        req.body.birthday,
        req.body.gender,
        req.body.job
    ];

    const result = connection.query(query, binddata);

    console.log('Row Inserted:', result.affectedRows);
    res.send('' + result.affectedRows);
  } catch (err) {
    console.error(err.message);
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

router.delete('/:id', function(req, res) {

  try {
    let query = 'UPDATE customers SET isDeleted = 1 WHERE id = ?';
    
    let binddata = [
      Number(req.params.id)
    ];
    console.log('req.params.id : ' + req.params.id);

    const result = connection.query(query, binddata);

    res.send('' + result.affectedRows);
  } catch (err) {
    console.error(err.message);
  }

});

module.exports = router;