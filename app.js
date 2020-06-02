var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var util = require('util');
var url = require('url');
var request = require('request');
//解决跨域
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
/**
 * todo createFormData  (image)  中第一个参数文件名一定要与后台完全一致,否则报500
 */
app.use(multer({dest: '/tmp/'}).array('image'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//todo
//todo
//todo

app.get('/download', function (req, res) {
    res.sendFile(__dirname + "/" + "/public/download.html");
});

app.get('/firebase', function (req, res) {
    res.sendFile(__dirname + "/" + "/public/firebase/firebase.html");
});

/**
 * todo 读取文件目录
 */
app.get('/readDir', function (req, res) {
    var params = req.query
    console.log('打印参数:' + params.type)
    var dirPath = "files/";
    switch (params.type) {
        case 'wms': {
            dirPath = dirPath + "wms"
        }
            break;
        case 'newasia5b_cn': {
            dirPath = dirPath + "newasia5b/cn"
        }
            break;
        case 'newasia5b_com': {
            dirPath = dirPath + "newasia5b/com"
        }
            break;
        case 'jy_cn': {
            dirPath = dirPath + "jy/com"
        }
            break;
        case 'jy_com': {
            dirPath = dirPath + "jy/com"
        }
            break;
        case 'shop_cn': {
            dirPath = dirPath + "shop/cn"
        }
            break;
        case 'shop_com': {
            dirPath = dirPath + "shop/com"
        }
            break;
        case 'pay_cn': {
            dirPath = dirPath + "pay/cn"
        }
            break;
        case 'pay_com': {
            dirPath = dirPath + "pay/com"
        }
            break;
        case 'live_cn': {
            dirPath = dirPath + "live/cn"
        }
            break;
        case 'live_com': {
            dirPath = dirPath + "live/com"
        }
            break;
        case 'other':
            dirPath = dirPath + "other"
            break;

        default:
            break;
    }


    var queryPath = path.join(__dirname, 'public', dirPath)
    fs.readdir(queryPath, function (err, files) {
        if (err) {
            res.send(err);
            return console.error(err);
        }
        console.log("文件数量:" + files.length);
        var resultFiles = [];
        files.forEach(function (file) {
            var fileBean = {
                filename: file,
                filepath: "http://" + req.headers.host + "/" + dirPath + '/' + file
            }
            resultFiles.push(fileBean);
            console.log("文件名称:" + file);
        });
        res.send(resultFiles)
    });
});


/**
 *  todo 上传文件
 */
app.post('/uploadFile/*', function (req, res) {
    //具体文件类型
    var childFilePath = req.params[0]
    console.log(childFilePath);
    var inputFile = req.files[0];//From the name
    console.log(inputFile);// 上传的文件信息
    /**
     * todo createFormData  (image)  中第一个参数文件名一定要与后台完全一致,否则报500
     */
    // var file = req.files.image;//From the name
    console.log('文件类型：%s', inputFile.type);
    console.log('原始文件名：%s', inputFile.name);
    console.log('文件大小：%s', inputFile.size);
    console.log('文件保存路径：%s', inputFile.path);
    // res.send('上传文件成功')
    var des_file = __dirname + "/public/files/" + childFilePath + "/" + inputFile.originalname;//指定保存目录
    fs.readFile(inputFile.path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: inputFile.originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

/**
 * todo 查看某个公众号历史数据,学习访问其他的API
 */
app.get('/other', function (req, res) {
    request('https://wanandroid.com/wxarticle/list/408/1/json', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            body = JSON.parse(body);
            res.send(body);

        } else {
            res.send('error');
        }
    })
});

app.listen(80);

console.log('服务器启动成功');

//
//
//

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
