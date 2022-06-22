/* DB 연결 - 스키마 이름 :memo / 데이터베이스 이름 : memos */
/* DB 연결 - 스키마 이름 :hnotice / 데이터베이스 이름 : notice */
const mysql = require('mysql');
const moment = require('moment'); // 날짜 포멧을 위한 모듈

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : '3306',
    database : 'hnotice',
    dateStrings:'date' //날짜 시간 출력
})

/* 리스트 전체를 불러오는 함수 */

function getAllNotice(callback){
    connection.query('select * from notice ORDER BY id DESC',
    (err, rows, fields) => {
        for(let i=0; i<rows.length;i++){
            /* YYYY-MM-DD 형식으로 출력할 것 */
            console.log('rows'+JSON.stringify(rows[i]));
            rows[i].update_time = moment( rows[i].update_time).format('YYYY-MM-DD'); //db에서 date 타입을 Date로 했기에 필요없는 부분은 날리려구 포멧해주어서 다시 넣어준다.
        }
        if(err) throw err;
        callback(rows);
    })
}



/* 리스트에 새로운 내용을 추가하는 함수 */

function insertNotice(title,cate,content,callback){
    connection.query(`insert into notice (title,cate,content, create_time, update_time) values ("${title}","${cate}","${content}",now(),now())`,(err,result)=>{
        if(err) throw err;
        callback();
    })

}



/* 리스트 중 id값이 일치하는 row만 불러오는 함수 */
function getNoticeById(id, callback){
    connection.query(`select * from notice where id=${id}`,
    (err, row, fields) => {
        if(err) throw err;
        callback(row);
    })
}


/* 리스트를 수정하고 싶을 때 id값이 일치하는 부분을 수정하는 함수 */

function updateNoticeById(id, title,cate,content, callback){
    connection.query(`update notice set title='${title}',cate='${cate}',update_time=now(),content='${content}' where id=${id}`, (err, result)=>{
        if(err) throw err;
        callback();
    })
}

/* 리스트 중 id값이 일치하는 부분을 삭제하는 함수 */

function deleteNoticeById(id,callback){
    connection.query(`delete from notice where id=${id}`,
    (err, result) => {
        if(err) throw err;
        callback();
    });
}



module.exports = {
    getAllNotice,
    insertNotice,
    getNoticeById,
    updateNoticeById,
    deleteNoticeById,
}