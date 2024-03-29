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
            var usersInGroup = roomdata.rooms[roomId].users.length;
            if(usersInGroup < maxUsersInGroup){
                roomdata.joinRoom(socket, roomId);
                socket.emit("initGame", roomdata.get(socket, "chat"),listaUserow());
                //wyslij uzupelnienie listy uzytkownikow do wszystkich oprocz aktualnego
                socket.broadcast.to(roomdata.get(socket, "room")).emit("dopiszUsera", socket.nickname);
                //grupa pelna
                if(usersInGroup === (maxUsersInGroup-1)){
                    io.to(roomdata.get(socket, "room")).emit("startGame");
                }
                listaUserow();
                return 0;
            }
         }
        
        //dodaj nowy pokoj
        roomdata.joinRoom(socket, socket.nickname);      
        roomdata.set(socket, "chat", []);
        roomdata.set(socket, "questions", []);
        roomdata.set(socket, "count", "");
        roomdata.set(socket, "poprawnaOdp", "");
        roomdata.set(socket, "opis", "");
        roomdata.set(socket, "najszybszyCzas", "-1");
        roomdata.set(socket, "gotowyNaPytanie", 0); //2 oznacza gotowosc na pytanie
        ustawIloscPytan();
        
        //zmien widok gry
        socket.emit("initGame", roomdata.get(socket, "chat"),listaUserow());
    }); 
    
    //pobierz nickname uzytkownikow danego pokoju
    var listaUserow = function(){
        var users = [];          
        io.sockets.sockets.map(function(e){
            if(e.roomdata_room===roomdata.get(socket, "room"))
                users.push(e.nickname);
        });
        return users;
    };
     
    //-------------zarzadzanie czatem------------------------- 
    //odbiera wiadomosc i rozsyla ja do uzytkownikow danego pokoju
    socket.on("czatWiadomosc", function (w) {
        //console.log(Array.isArray(roomdata.get(socket, "chat")));        
        roomdata.set(socket, "chat", roomdata.get(socket, "chat").concat(w));       
        //polaczone sily socket.io i roomdata        
        io.to(roomdata.get(socket, "room")).emit('czatDopiszWiadomosc', w);     
    });
    //------------------zarządzanie pytaniami----------------
    var ustawIloscPytan = function(){ 
        quiz.count(function (err, count) {
            roomdata.set(socket, "count", count); 
        });   
    }; 
    
     //max - wielkosc tablicy wyboru, exec - tablica wykluczania
    var random = function(max, exc){
        //sprawdzenie czy istnieje wolny element      
        if(exc && max === exc.length){
            return -1;
        }
        //wylosuj liczbe z przedzialu <min, store.length> 
        var min = 0;   
        var index = Math.floor(Math.random() * (max-min)) + min;
        //var tab = store.slice(min,index).concat(store.slice(index+1,store.length+1));

        if(exc){
            //sprawdz czy dany indeks zostal juz wylosowany
              while(exc.indexOf(index)!==-1){
                  //jesli ostatni element - wroc do poczatku
                  if(index === max-1){
                      index=-1;
                  }
                  index++;
              }
        }
        console.log(index);
        return index;
    };

    var mix = function(tab) {
    for (var i = 0; i < tab.length; i++) {
        var j = Math.floor(Math.random() * tab.length);
        var temp = tab[i];
        tab[i] = tab[j];
        tab[j] = temp;
        }
    return tab;
    };
    
    socket.on("gotowyNaPytanie", function(){
        if(roomdata.get(socket, "gotowyNaPytanie") === 2){
            pobierzPytanie();
        }else{
           roomdata.set(socket, "gotowyNaPytanie",roomdata.get(socket, "gotowyNaPytanie")+1);
        }
    });
    
    var pobierzPytanie = function(){
        //po 10 pytaniu zakończ gre
        if(roomdata.get(socket, "questions")===10){
            io.to(roomdata.get(socket, "room")).emit('koniecGry'); 
            return 0;
        }
        
        //zeruj 
        roomdata.set(socket, "gotowyNaPytanie", 0);
        roomdata.set(socket, "najszybszyCzas", -1);
        
        //pobierz dane
        var questions = roomdata.get(socket, "questions");
        var count = roomdata.get(socket, "count");
        //wylosuj nr nowego pytania
        var nrPyt = random(count, (questions.length!==0)?questions:undefined);
        
        //dodaj nrPyt roomdata.questions //[] czy bez ???
        roomdata.set(socket, "questions", roomdata.get(socket, "questions").concat(nrPyt)); 
        //pobierz pytanie o numerze nrPyt;
        var pytanie = quiz.find({'nrPytania' : nrPyt}).stream(); 
        pytanie.on('data', function(doc){
            //do poprawnej odpowiedzi dodajemy dwie losowe niepoprawne
            var odpowiedzi = [doc.poprawnaOdp];
            
            var ileOdpowiedzi = doc.odpowiedzi.length;
            var nrOdp = random(ileOdpowiedzi);
            odpowiedzi.push(doc.odpowiedzi[nrOdp]);
            nrOdp = random(ileOdpowiedzi, [nrOdp]);
            odpowiedzi.push(doc.odpowiedzi[nrOdp]);
            //mieszamy odpowiedzi
            odpowiedzi = mix(odpowiedzi);

            //tworzymy strukture pytania
            var pytanie = {
                pkt : doc.punkty,
                kat : doc.kategoria,
                pyt : doc.pytanie,
                odp : odpowiedzi
            }; 

            //zapisujemy odpowiedz
            roomdata.set(socket, "poprawnaOdp", odpowiedzi.indexOf(doc.poprawnaOdp));
            roomdata.set(socket, "opis", doc.opis);

            //wysylamy pytanie do wszystkich w pokoju
            io.to(roomdata.get(socket, "room")).emit("wyswietlPytanie", pytanie);                
        });    
    };
    
     socket.on("sprawdzOdpowiedz", function(wynik){
         //przyznaj punktu za prawidlowa odpowiedz i czas
         var zdobytePunkty = 0;
         if(wynik.odp == roomdata.get(socket, "poprawnaOdp")){
            zdobytePunkty=zdobytePunkty+1;  
            if(roomdata.get(socket, "najszybszyCzas")<wynik.czas){
                roomdata.set(socket, "najszybszyCzas", wynik.czas);
                zdobytePunkty=zdobytePunkty+1;    
            }
             
             //aktualizacja wynikow
             if(!socket.score){
                 socket.score=zdobytePunkty;
             }else{
                 socket.score=socket.score+zdobytePunkty;
             }
         }
         
             var punktacja = {
                 user:socket.nickname,
                 razemPkt:socket.score,
                 zdobytePkt:zdobytePunkty
             };
    
             io.to(roomdata.get(socket, "room")).emit('aktualizujWyniki', punktacja); 
             
             var odpowiedz = {
                 poprawnaOdp:roomdata.get(socket, "poprawnaOdp"),
                 opis:roomdata.get(socket, "opis")
             };
         
         socket.emit("wyswietlOdpowiedz", odpowiedz);             
    }); 
    
    socket.on("breakGame", function(nick){
        socket.broadcast.to(roomdata.get(socket, "room")).emit("koniecGry", nick);
        //roomdata.leaveRoom(socket);
    });
    
});

httpServer.listen(port, function () {
    console.log('Serwer HTTP działa na porcie ' + port);
});