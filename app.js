// 20220509 route(경로 설정)
// 20220510 views(html파일들) 경로 설정 (모듈화 작업을 위해!)
// 20220512 public/css + img 경로 설정 
// 20220513 express-ejs-layouts

const express = require('express')
// const cors = require("cors")
const app = express()
const port = 3000
/**
 * Multer 미들웨어는 파일 업로드를 위해 사용되는 multipart/form-data에서 사용된다.
 * 다른 폼으로 데이터를 전송하면 적용이 안된다.
 * Header의 명시해서 보내주는게 좋다.
 */
// const multer  = require('multer')

//파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
// const upload = multer({ 
//     dest: __dirname+'/uploads/', // 이미지 업로드 경로
// }) 


var expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const routers = require('./routes/route.js');
const { builtinModules } = require('module');



app.use(expressLayouts);//express-ejs-layout 사용
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(logger('dev'));
app.use('/', routers);//use : 미들웨어 등록

//app.use(cors()) // test를 하기위해서 세팅 "실제 서버에 배포할 땐 아이피를 설정해야 함"

//view(html파일들) 경로 설정
app.set('views', __dirname + "/views");

//화면 엔진을 ejs로 설정한다.
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile); //html문서로 되어있는 ejs엔진

//express-ejs-layouts 설정
app.set('layout','layout'); //layout 이름으로 ejs파일 만듦.
app.set('layout extractScripts', true);

const mySub1=``

//css + img + js 경로(/public/css+img+js) 설정 
app.use(express.static(__dirname + '/public'));


//css + img 경로 설정
//app.use(express.static(path.join(__dirname,'public')));


module.exports = app;
