var express=require('express');
//var routes=require('routes');
var http=require('http');
var path=require('path');

var app=express();
var port=3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.methodOverride());		// 구식 브라우저 메소드 지원
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.get('/list', todo.list);
app.post('/add', todo.add);
app.post('/complete', todo.complete);
app.post('/del', todo.del);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
/*app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});*/