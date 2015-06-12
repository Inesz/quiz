/* jshint node: true */
var app = require("express")();
var httpServer = require("http").Server(app);
var io = require("socket.io")(httpServer);

var static = require('serve-static');
var port = process.env.PORT || 3000;

var oneDay = 86400000;

var roomdata = require('roomdata');
var roomsList = [];

app.use('/js/jquery.min.js', static(__dirname + '/bower_components/jquery/dist/jquery.min.js'));
app.use('/js/jquery.min.map', static(__dirname + '/bower_components/jquery/dist/jquery.min.map'));
app.use(static(__dirname + '/public'));

io.sockets.on("connection", function (socket) {
    
    socket.on("czyNicknameDostepny", function (n) { 
        console.log("czyNicknameDostepny" + n);
        
        //sprawdz czy istnieje uzytkownik o podanym nicku
        for(var socketId in io.sockets.sockets) {
            console.log("nickname:"+io.sockets.sockets[socketId].nickname);
            if(io.sockets.sockets[socketId].nickname===n){ 
                socket.emit("nicknameZajety", n); 
                return 0;
            }
        }     
        
        //jesli nick jest wolny, nazwij socket
        socket.nickname=n;
        socket.emit("nicknameWolny", n); 
    });
    
    socket.on("szukajPokoju", function (n) {
        console.log('szukajPokoju');
        
        //sprawdz czy istnieje wolny pokoj
        for(var roomId in roomsList) {
            console.log(roomsList[roomId]);
        }
        
        //dodaj nowy pokoj
        roomdata.joinRoom(socket, socket.nickname);      
        roomsList.push(socket.nickname);
        roomdata.set(socket, "gameStatus", "waiting");
        
        //zmien widok gry
        socket.emit("initGame"); 
    });   
});

httpServer.listen(port, function () {
    console.log('Serwer HTTP działa na porcie ' + port);
});
