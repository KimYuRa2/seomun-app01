const express=require('express');
const router = express.Router(); 
// 20220513 express-ejs-layouts
var expressLayouts = require('express-ejs-layouts');
const {check, validationResult} = require('express-validator');

/* db.js 파일 연결 */
const db = require('../db');


//파일관련 모듈
// var fs = require('fs');
// var ejs = require('ejs');
// var multer = require('multer');

router.use(expressLayouts);

//ejs파일은 확장자 필요X!! res.render('index.html'); =>  res.render('index');
router.get('/', (req,res,next)=>{
    res.render('index'); //서문시장 야시장의 main페이지 렌더링
})

router.get('/intro',(req,res)=>{
    res.render('intro');
})



//views > sub1.html ( 이름 변경 : sub1 -> login )
router.get('/login', (req,res)=>{
    res.render("login");
})

router.get('/signup', (req,res)=>{
    res.render("signup");
})

/********** notice ******** */
router.get('/notice',(req,res,next)=>{
    db.getAllNotice((rows) => {
        res.render('notice',{ rows : rows }); 
    })
})



router.get('/notice_read',(req,res,next)=>{
    let id = req.query.id;

    db.getNoticeById(id, (row)=>{
        if(typeof id === 'undefined' || row.length <= 0){
            res.status(404).json({error : 'undefined notice'});
        }else{
           res.render('notice_read', {row: row[0]}); 
        }
    })
})

router.get('/newNotice', (req,res,next) => {
    res.render('newNotice');
})


router.post('/store',
 //[check('content').isLength({min:1, max:3000})],
 function(req,res,next){
    //let errs = validationResult(req);
    
    // if(errs['errors'].length > 0){ //에러가 있다면, 화면에 에러 출력하기
    //     res.render('newNotice',{errs : errs['errors']});
    // }else{ //에러 없으면 실행
        let param = JSON.parse(JSON.stringify(req.body));
        let cate = param['cate'];
        let content = param['content'];
        let title = param['title'];
        
        db.insertNotice(title,cate,content, () => { //
            res.redirect('/notice');
        })
    // }
});

router.get('/updateNotice',(req,res)=>{
    let id = req.query.id;

    db.getNoticeById(id, (row)=>{
        if(typeof id === 'undefined' || row.length <= 0){
            res.status(404).json({error : 'undefined notice'});
        }else{
           res.render('updateNotice', {row: row[0]}); 
        }
    })
});

router.post('/updateNotice' , 
    [check('content').isLength({min:1, max:1000})],
    (req,res)=>{
        let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let title = param['title'];
        let cate = param['cate'];
        let content = param['content'];

        if( errs['errors'].length > 0 ){ //에러가 있다면
            db.getNoticeById(id, (row)=>{
                res.render('updateNotice', {row: row[0], errs: errs['errors']} )
            });
        } else{ //에러가 없다면 notice 수정하기
            db.updateNoticeById(id, title, cate, content, ()=> {
                res.redirect('/notice');
            });
        }
});

router.get('/deleteNotice',(req,res)=>{
    let id = req.query.id;
    db.deleteNoticeById(id, ()=>{
        res.redirect('/notice');
    });
});

/**
 * 여러 파일 업로드
 * 
 * 클라이언트에서 file이라는 Key(fieldname) 값을 통해 파일을 전송하면 req.files 안에 파일 정보를 배열([]) 형태로 얻을 수 있다.
 * 
 * array('fieldname', maxCount) 필드 이름과 최대 파일 수를 정합니다.
 * 지정된 수 보다 더 많은 파일을 업로드하면 에러가 발생합니다.
 */
// router.post('/multipart/upload', upload.array('file'),(req,res,next)=>{
//     const {name} = req.body;
//     console.log("body데이터 : "+ name);

//     //배열 형태이므로 반복문을 통해 파일 정보를 알아낸다
//     req.files.map(data=>{
//         console.log("폼에 정의된 필드명 : ", data.fieldname);
//         console.log("사용자가 업로드한 파일 명 : ", data.originalname);
//         console.log("파일의 엔코딩 타입 : ", data.encoding);
//         console.log("파일의 Mime 타입 : ", data.mimetype);
//         console.log("파일이 저장된 폴더 : ", data.destination);
//         console.log("destinatin에 저장된 파일 명 : ", data.filename);
//         console.log("업로드된 파일의 전체 경로 ", data.path);
//         console.log("파일의 바이트(byte 사이즈)", data.size);
//     })

//     res.json({ok: true, data : "Multipart Upload Ok"});
// })


module.exports = router;