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

    socket.on('initGame', function(){
        //usun niepotrzebne elementy
        //start.css('visibility', 'hidden');
        $('#zasady').remove();
        $('#zaloguj').remove();  
        
        //inicjuj czat
        socket.emit("initChat");
        //wyswietl ekran oczekiwania na graczy
    });

    //----------------obsluga czartu------------------------- 
     var nowaWiadomosc = function (w){
        rozmowa.append('<p>'+w.user + " " + w.text+" " + w.date+'</p>');
    };
     
     socket.on("historiaChatu", function(w){        
         $(w).each(function(index, value){
             nowaWiadomosc(value);
         });
     });
    
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