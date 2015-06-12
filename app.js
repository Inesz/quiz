/* jshint node: true */
var app = require("express")();
var httpServer = require("http").Server(app);
var io = require("socket.io")(httpServer);

var static = require('serve-static');
var port = process.env.PORT || 3000;

var oneDay = 86400000;

var roomdata = require('roomdata');
var maxUsersInGroup = 3;
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
        //console.log(io.nsps['/'].adapter.rooms);
        //sprawdzenie z wykorzystaniem biblioteki roomdata
         for(var roomId in roomdata.rooms) {
            var usersInGroup = roomdata.rooms[roomId]['users'].length;
            if(usersInGroup < maxUsersInGroup){
                roomdata.joinRoom(socket, roomId);
                if(usersInGroup === (maxUsersInGroup-1)){
                    roomdata.set(socket, "gameStatus", "ready");
                    //wystartuj gre!
                    socket.emit("initGame"); 
                    socket.emit("startGame");
                }
                return 0;
            }
         }
        
        //dodaj nowy pokoj
        roomdata.joinRoom(socket, socket.nickname);      
        roomdata.set(socket, "gameStatus", "waiting");
        
        //zmien widok gry
        socket.emit("initGame"); 
    });   
});

httpServer.listen(port, function () {
    console.log('Serwer HTTP działa na porcie ' + port);
});
