/* jshint browser: true, globalstrict: true, devel: true */
/* global io: false */
"use strict";

var start = $('#start');
var nickname = $('#nickname');
var naglowek = $('#naglowek');
var body = $('body');
var socket;
var nick;
var time = 0;
var statusNickname = $('#statusNickname');
//----------------------------------------------
var progressBarHtml = '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:40%">'+ time + '</div>';
var czatHtml ='<div id="czat">'+
                '<div id="rozmowa"></div>'+
                '<input id="wiadomosc" type="text"></input>'+
                '<input id="wyslij" type="button" value="wyślij"/>'+
              '</div>';
var graHtml = '<div id="gra">'+
        '<div id="nrPyt"></div>'+
        '<div id="czas">'+progressBarHtml+'</div>'+
        '<div id="pyt"></div>'+
        '<div id="odp">'+
            '<div id="a"></div>'+
            '<div id="b"></div>'+
            '<div id="c"></div>'+
        '</div>'+        
    '</div>';


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
        
        body.append(graHtml);
        body.append(czatHtml);    
    });
    
});

//popraw - gdy odswiezam stronę, pole nickname jest disabled, button widoczny
