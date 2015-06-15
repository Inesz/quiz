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
var maxTime = 46;
var nrPyt = 0;  //numer pytania
//var odp = $('#odp'); 
var czekanie = $('#czekanie');
var gra = $('#gra');
var opisOdp = $('#opisOdp');
var nastPyt = $('#nastPyt');
var wynikCzat = $('#nastPyt');
//----------------odpiety html---------------------
var o_gra;
var o_wynik;
var o_wynikCzat;
var o_czekanie;
var o_zaloguj;
var o_zasady;
var o_nastPyt;
var o_opisOdp;
            
// Inicjalizacja
$(document).ready(function(){   

    
     if (!socket || !socket.connected) {
            socket = io({forceNew: true});
        }
    
     nickname.blur(function(){      
         if(nickname.val()){
         socket.emit('czyNicknameDostepny', nickname.val());
         }else{
            statusNickname.text("Zamin zaczniesz grę podaj swoję imię :-D");
         }
     });
    //***********************888888
     socket.on('nicknameZajety', function(n){
         statusNickname.text("uzytkownik o nazwie "+n+" już istnieje. Proszę wybierz inny nick");
     }); 
    
     socket.on('nicknameWolny', function(n){
         console.log("nicknameWolny");
         nickname.prop('disabled', true);
         nick=n;
         naglowek.text("Witaj "+nick+"! ;)");    
          statusNickname.text("gotowy do drogi?");
         /*
         //jQuery 1.6 +               
         start.prop('disabled', false);
         jQuery 1.5-
         $("input").attr('disabled','disabled');
         $("input").removeAttr('disabled');
         */
     }); 
 //***********************888888
    start.on('click',function(){
        if(nick){
        socket.emit('szukajPokoju');
        }else{
        statusNickname.text("Zamin zaczniesz grę podaj swoję imię :-D"); 
        }
    }); 

    //----------------obsluga czartu------------------------- 
    //popraw date 
    //sformatuj wyswietlenie
     var nowaWiadomosc = function (w){
        //w moze zawierac w.date
        rozmowa.append('<p>'+w.user + ": " + w.text+'</p>');
    };
    
    $('#wyslij').on('click',function(){
        console.log("wysylam wiadomosc");
        var wiadomosc = $('#wiadomosc').val();
        console.log(wiadomosc);
        if(wiadomosc){
            var w = {};
            w.user = nick;
            //w.date = Date.now();
            w.text = wiadomosc;
    
           socket.emit("czatWiadomosc", w);
        }      
    });
    
    socket.on("czatDopiszWiadomosc", function(w){
        nowaWiadomosc(w);
    }); 
    
    //------------------obsługa gry-------------------------  
     socket.on('initGame', function(chat, users){
         //odepnij/przypnij html
        o_zaloguj =$('#zaloguj').contents().detach();
        o_zasady  =$('#zasady').contents().detach();
        $('#wynikCzat').append(o_wynikCzat);
        $('#czekanie').append(o_czekanie);
        
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
    
    socket.on("startGame", function(pytanie){
        console.log("start game");
        o_czekanie=$('#czekanie').contents().detach();
        $('#gra').append(o_gra);
        $('#wynik').append(o_wynik);
        o_nastPyt  = $('#nastPyt').detach();
        
        socket.emit("gotowyNaPytanie");     
    });
    
    socket.on("dopiszUsera", function(value){
        console.log("dopiszUsera");
        dopiszUsera(value);
    });  
    var dopiszUsera = function(name){
        $('#pktOdp td[name=nickname]:empty:first').text(name);
    };    

    socket.on("wyswietlPytanie", function(pytanie){
        
        time=0;
        nrPyt++;
        o_opisOdp=$('#opisOdp').contents().detach();
        $('#odp').children().removeClass("btnTrue").removeClass("btnCheck");
        
        $('#nrPyt').text(nrPyt + "/10");
        
        $('#a0').val(pytanie.odp[0]);
        $('#b1').val(pytanie.odp[1]);
        $('#c2').val(pytanie.odp[2]);
        
        $('#pyt').text(pytanie.pyt);
        interval=setInterval(function(){ showBar(time); }, 1000); 
    });
    
    $('#odp').children().click(function(){
        clearInterval(interval);
        socket.emit("sprawdzOdpowiedz", {odp:$(this).attr('id').charAt(1), czas:time});
        //$('#i'+odpowiedz.poprawnaOdp)
        $(this).addClass("btnCheck");
    });
    
     socket.on("aktualizujWyniki", function(punktacja){ 
         console.log(punktacja);
         if(punktacja.razemPkt){         $('tr').has('td[name="nickname"]:contains("'+punktacja.user+'")').find('[name="score"]').text(punktacja.razemPkt);           
         }
     });
    
    socket.on("wyswietlOdpowiedz", function(odpowiedz){
        opisOdp.text(odpowiedz.opis);
        $('#opisOdp').after(o_nastPyt);
       
        var odp = $('#odp').children();
        odp[odpowiedz.poprawnaOdp].addClass("btnTrue");
     });
    
    nastPyt.click(function(){
        socket.emit("gotowyNaPytanie");
        o_nastPyt  = $('#nastPyt').detach();
    });
    

    socket.on("koniecGry", function(user){
        var tekst;
        if(nrPyt===10){
        tekst="Niestety, użytkownik " + user + "opuścił pokój... Gra została przerwana";
        }else{
            tekst = "Brawo ukończyliście kurs ;) Gratulacje dla zwycięzcy!";
        }
        
         o_gra=$('#gra').contents().detach();
         o_nastPyt  = $('#nastPyt').detach();
         opisOdp.text("koniec gry!");    
     });
    
//-------przed zamknieciem strony-------------------    
var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; 
        myEvent(chkevent, function(e) {
            socket.emit("breakGame");      
        });

    //odepnij niepotrzebne elementy
    var odepnij = function(){
        o_gra=$('#gra').contents().detach();
        o_wynik=$('#wynik').contents().detach();
        o_wynikCzat=$('#wynikCzat').contents().detach();
        o_czekanie=$('#czekanie').contents().detach();
    }();
});

//popraw - gdy odswiezam stronę, pole nickname jest disabled, button widoczny
//---------------------------progres bar----------------------------
//na tescie na prawo jazdy na odpowiedz na 32 pytania mamy 25 min(1500s) co daje 46s na jedno pytanie 
var interval;
var showBar=function(){
        var progressBar = $('.progress-bar');
        if((time*(100/46)) < 101){
        progressBar.attr('aria-valuenow', time);
        progressBar.attr('style', 'width:'+time*(100/46)+'%');
        progressBar.text(time+'s');
        time=time+1;
        }else{
            socket.emit("sprawdzOdpowiedz", {odp:-1, czas:time+1});
        }
    };

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