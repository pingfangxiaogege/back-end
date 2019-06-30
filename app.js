var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multipart = require('connect-multiparty');   // 对于from-data数据徐娅引入
var expressJwt = require('express-jwt');
var vertoken = require('./token/getToken.js');
var multipartMiddleware = multipart();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multipartMiddleware);


app.use(function(req, res, next){
  //设置可访问的域名 req.headers.orgin为nodejs下获取访问的域名地址
  res.header("Access-Control-Allow-Origin", '*');
  //设置可访问方法名
  res.header('Access-Control-Allow-Methods', req.headers['Access-Control-Allow-Methods']);
  //设置可访问的头
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  //设置cookie时长
  // res.header("Access-Control-Max-Age","1728000");
  // //允许凭证,解决session跨域丢失问题
  // res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: 'pingfanya'
}).unless({
	path: ['/user/login']//除了这个地址，其他的URL都需要验证
}));

app.use(function (err, req, res, next) {
  var token = rq.body.token || rq.query.token || rq.headers["x-access-token"];
  console.log(token, 'token')
  if (err.name === 'UnauthorizedError') {   
      //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.status(401).send('invalid token...');
  }
  console.log( vertoken.verToken, ' vertoken.verToken')
  vertoken.verToken(token).then((data)=> {
    console.log(data, 'asd')
  })
});

// // 解析token获取用户信息
// app.use(function(req, res, next) {
//   var token = req.headers['authorization'];
// 	if(token == undefined){
// 		 next();
// 	}else{
// 		vertoken.verToken(token).then((data)=> {
//       console.log(data, 'data00')
// 			req.data = data;
// 			 next();
// 		}).catch((error)=>{
//       console.log(error, 'd')
// 			 next();
// 		})
// 	}
// });



app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/menu', menuRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
 
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
