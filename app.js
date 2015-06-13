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

//--------------------------------
var quiz = require('./models/quiz');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
     console.log('Połączono z MongoDB!');
});

//--------------------------------

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
                //grupa pelna
                socket.emit("initGame", roomdata.get(socket, "chat")); 
                if(usersInGroup === (maxUsersInGroup-1)){
                    roomdata.set(socket, "gameStatus", "ready");
                    //wystartuj gre!
                    socket.emit("startGame");
                }
                return 0;
            }
         }
        
        //dodaj nowy pokoj
        roomdata.joinRoom(socket, socket.nickname);      
        roomdata.set(socket, "gameStatus", "waiting");
        roomdata.set(socket, "chat", []);
        
        //zmien widok gry
        socket.emit("initGame", roomdata.get(socket, "chat")); 
    }); 
    
    //-------------zarzadzanie czatem------------------------- 
    //odbiera wiadomosc i rozsyla ja do uzytkownikow danego pokoju
    socket.on("czatWiadomosc", function (w) {
        //console.log(Array.isArray(roomdata.get(socket, "chat")));        
        roomdata.set(socket, "chat", roomdata.get(socket, "chat").concat(w));       
        //polaczone sily socket.io i roomdata        
        io.to(roomdata.get(socket, "room")).emit('czatDopiszWiadomosc', w);     
    }); 
    
    socket.on("initChat", function () {
        //console.log("initChat " +roomdata.get(socket, "chat"));
        var historiaChatu = roomdata.get(socket, "chat");
        socket.emit("historiaChatu", historiaChatu);
    });
    
    //------------------zarządzanie pytaniami----------------
    //store - tablica wyboru, exec - tablica wykluczania
    function random(store, exc){
        //sprawdzenie czy istnieje wolny element
        if(store.length === exc.length){
            return -1;
        }

        //wylosuj liczbe z przedzialu <min, store.length> 
        var min = 0;   
        var index = Math.ceil(Math.random() * (store.length-min)) + min;
        //var tab = store.slice(min,index).concat(store.slice(index+1,store.length+1));

        if(exc){
            //sprawdz czy dany indeks zostal juz wylosowany
              while(exc.indexOf(index)!==-1){
                  //jesli ostatni element - wroc do poczatku
                  if(index === store.length-1){
                      index=-1;
                  }
                  index++;
              }
        }    
        return index;
    }
    /*//proba bazy 
    socket.on("probaDB", function(){
        var cat = new quiz({ name: 'Puszek' });
        console.log(cat.name);
        
         console.log("save");
        
        cat.save(function (err) {
            if (err) return console.error(err);
        });
        
         console.log("unsave");
        
        quiz.find(function (err, guiz) {
            if (err) return console.error(err);
            console.log(guiz);
        });
        
    });
    */
    
    
});

httpServer.listen(port, function () {
    console.log('Serwer HTTP działa na porcie ' + port);
});
