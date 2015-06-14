/* jshint browser: true, globalstrict: true, devel: true */
/* global io: false */
"use strict";

var start = $('#start');
var nickname = $('#nickname');
var naglowek = $('#naglowek');
var statusNickname = $('#statusNickname');
var rozmowa = $('#rozmowa');
var body = $('body');
var socket;
var nick;
var time = 0;
var nrPyt = 0;  //numer pytania
//var odp = $('#odp'); 
var czekanie = $('#czekanie');
var gra = $('#gra');
var opisOdp = $('#opisOdp');
var nastPyt = $('#nastPyt');
            
// Inicjalizacja
$(document).ready(function(){   
     
     if (!socket || !socket.connected) {
            socket = io({forceNew: true});
        }
    
     nickname.blur(function(){      
        console.log("czyNicknameDostepny");
        socket.emit('czyNicknameDostepny', nickname.val());   
     });
    
     socket.on('nicknameZajety', function(n){
          console.log("nicknameZajety");
        //nie podoba mi się preppend
       // statusNickname.append("uzytkownik o nazwie "+n+" już istnieje. Proszę wybierz inny nick");
         statusNickname.text("uzytkownik o nazwie "+n+" już istnieje. Proszę wybierz inny nick");
        start.prop('disabled', true);
     }); 
    
     socket.on('nicknameWolny', function(n){
        console.log("nicknameWolny");
         nickname.prop('disabled', true);
         nick=n;
         naglowek.text("Witaj "+nick+"! ;)");    
         //jQuery 1.6 +               
         start.prop('disabled', false);
         /*jQuery 1.5-
         $("input").attr('disabled','disabled');
         $("input").removeAttr('disabled');
         */
     }); 

    start.on('click',function(){        
        console.log("start");
        socket.emit('szukajPokoju');      
    }); 

    //----------------obsluga czartu------------------------- 
    //popraw date 
    //sformatuj wyswietlenie
     var nowaWiadomosc = function (w){
        rozmowa.append('<p>'+w.user + " " + w.text+" " + w.date+'</p>');
    };
    
    $('#wyslij').on('click',function(){
        var wiadomosc = $('#wiadomosc').val();
        console.log(wiadomosc);
        if(wiadomosc){
            var w = {};
            w.user = nick;
            w.date = Date.now();
            w.text = wiadomosc;
    
           socket.emit("czatWiadomosc", w);
        }      
    });
    
    socket.on("czatDopiszWiadomosc", function(w){
        nowaWiadomosc(w);
    }); 
    
    
    //------------------obsługa gry-------------------------  
     socket.on('initGame', function(chat, users){
        //usun niepotrzebne elementy
        //start.css('visibility', 'hidden');
        $('#zasady').remove();
        $('#zaloguj').remove();  
        
        //inicjuj czat
         if(chat){
            $(chat).each(function(index, value){
                nowaWiadomosc(value);
            });
         }
         
         //inicjuj tablice wynikow
         if(users){
             console.log(users);
            $(users).each(function(index, value){
                dopiszUsera(value);
            });
         }    
    });
    
    socket.on("dopiszUsera", function(value){
        console.log("dopiszUsera");
        dopiszUsera(value);
    });  
    var dopiszUsera = function(name){
        $('#pktOdp td[name=nickname]:empty:first').text(name);
    };

    socket.on("startGame", function(pytanie){   
        socket.emit("gotowyNaPytanie");     
        czekanie.remove();
        gra.css('visibility', 'visible'); 
    });    
 /*   
    var pobierzPytanie = function(){
        socket.emit("pobierzPytanie");
    };
*/
    socket.on("wyswietlPytanie", function(pytanie){
        console.log(pytanie);
        time=0;
        
        $('#a0').val(pytanie.odp[0]);
        $('#b1').val(pytanie.odp[1]);
        $('#c2').val(pytanie.odp[2]);
        
        $('#pyt').text(pytanie.pyt);     
    });
    
    $('#odp').children().click(function(){  
        socket.emit("sprawdzOdpowiedz", {odp:$(this).attr('id').charAt(1), czas:time});
    });
    
     socket.on("aktualizujWyniki", function(punktacja){
         
     });
    
    socket.on("wyswietlOdpowiedz", function(odpowiedz){
         opisOdp.text(odpowiedz.opis);
     });
    
    nastPyt.click(function(){
        socket.emit("gotowyNaPytanie");
    });
    
    socket.on("koniecGry", function(){
         opisOdp.text("koniec gry!");
     });
});

//popraw - gdy odswiezam stronę, pole nickname jest disabled, button widoczny

//---------------------------progres bar----------------------------
//na tescie na prawo jazdy na odpowiedz na 32 pytania mamy 25 min(1500s) co daje 46s na jedno pytanie 
var showBar;
function progressBar(){
    var progressBar = $('.progress-bar');
    showBar = function(){
        if((time*(100/46)) < 101){
        progressBar.attr('aria-valuenow', time);
        progressBar.attr('style', 'width:'+time*(100/46)+'%');
        progressBar.text(time+'s');
        time=time+1;
        } 
    };
    
    setInterval(function(){ showBar(time); }, 1000); 
    
    /*
    var p = progressBar();
        p();
        
        $('#odp').children().click(function(){
           clearInterval(showBar); 
        });
        */
}
//--------------------pytania na nude------------
var initCiekawostki = function(){
var pytania = [];
pytania.push("Wystarczy zamknąć w pomieszczeniu 57 osób, by mieć 99 proc. pewności, że dwie z nich mają urodziny tego samego dnia.");

pytania.push("Przeciętnie w ciągu dnia na całym świecie 12 noworodków jest wydawanych ze szpitala nie tym rodzicom, co trzeba.");

pytania.push("Wystarczy zamknąć w pomieszczeniu 57 osób, by mieć 99 proc. pewności, że dwie z nich mają urodziny tego samego dnia.");

pytania.push("Sernik został wymyślony w starożytnej Grecji. Podawano go sportowcom podczas Igrzysk Olimpijskich.");

pytania.push("Mieszkańcy Wielkiej Brytanii jedzą więcej fasoli z puszki niż reszta świata razem wzięta.");

    return pytania;
};