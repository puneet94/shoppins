//Node Packages from node_modules
//updated
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var compression = require('compression')
var qs = require('querystring');
var moment = require('moment');
var io = require('socket.io');
var request = require('request');
var jwt = require('jwt-simple');

//Variables
var port = process.env.PORT || 3000;
var http = require('http');
var app = express();
var server = http.createServer(app);
io = io.listen(server);



//moment added to be used in jade

//app.locals.moment = require('moment');
//Imports from custom made js
var facebookAuth  = require('./services/facebookAuth.js');
var createJWT = require('./services/jwtService.js');


var storeRouter = require('./routes/store');
var searchRouter = require('./routes/searchRoute');
var productRouter = require('./routes/productRoute');
var authenticateRouter = require('./routes/authenticateRoute');
var reviewRouter = require('./routes/reviewRoute');
var visitRouter = require('./routes/visitRoute');
var adminRouter = require('./routes/adminRoute');
var chatRouter = require('./routes/chatRoute');
var urlStrings = require('./routes/url');
var uploadRouter = require('./routes/uploadRoute');
var upvoteRouter = require('./routes/upvoteRoute');
var userRouter = require('./routes/userRoute');
var activityRouter = require('./routes/activityRoute');

//Middleware from built-in methods
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(compression());
app.set('port', process.env.PORT || 3000);
app.set('views',__dirname+"/views");
app.set('view engine',"jade");

/*HTTPS for heroku
*/
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}



app.use('/store',storeRouter);
app.use('/search',searchRouter);
app.use('/product',productRouter);
app.use('/authenticate',authenticateRouter);
app.use('/review',reviewRouter);
app.use('/visit',visitRouter);
app.use('/admin',adminRouter);
app.use('/upvote',upvoteRouter);
app.use('/upload',uploadRouter);
app.use('/user',userRouter);
app.use('/activity',activityRouter);
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    req.io = io;
    next();
});
app.use('/chat', chatRouter);
app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

mongoose.connect(urlStrings.connectionString);//"mongodb://shop_dir:shop_dir@ds023912.mlab.com:23912/shoppins");
//mongoose.connect("mongodb://shopdb:shopdb1234@ds029476.mlab.com:29476/shopdb");

io.on('connection', function(socket) {
    // We're connected to someone now. Let's listen for events from them
    
    socket.on('addToRoom', function(room) {
      console.log("joined the room");
        console.log(room.roomId);
        socket.join(room.roomId);
    });
    socket.on('addToSingleRoom', function(singleRoom) {
      console.log("joined the single room");
        console.log(singleRoom.roomId);
        socket.join(singleRoom.roomId);
    });
    socket.on('removeFromRoom', function(room) {
        socket.leave(room.roomId);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
server.listen(app.get('port'), function() {
        console.log("Listening");
        console.log(__dirname);
    })
