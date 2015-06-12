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
var progressBarHtml = '<div id="progrBar"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="46" style="width:0%"></div></div>';

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
            '<input id="a" value="" type="button"/>'+
            '<input id="b" value="" type="button"/>'+
            '<input id="c" value="" type="button"/>'+
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

//---------------------------progres bar----------------------------------
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