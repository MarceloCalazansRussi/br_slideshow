/*

MIT License

Copyright (c) 2019 BR Fast Slideshow
https://designerdaweb.com.br

 */

/* Mounts slide vector */
var slides = $('.slide'); 

var total_slide   = slides.length;
var atual_slide   = 0;
var entrou;
var tempo_tran    = 7000;
var anterior      = null;
var wid_original  = 1920;
var navIE         = !!window.MSInputMethodContext && !!document.documentMode;

/* Disable for IE - not supported */
if (navIE) {
   $("#IE_fora").css('display', 'block');
   $("#IE_fora").css('top', '0px');   
}

/* Disables loader when slide is loaded */
$('.slide').ready(function(){
    $("#carregando").fadeOut(); 
});

$(".arrow_left_svg").delay(3000).fadeIn();
$(".arrow_right_svg").delay(3000).fadeIn();

/* Set z-index initial default */
for (i = 0; i < slides.length; i++) { $(slides[i]).css('z-index', total_slide-i); }

/* Start main container only after reading slides */
$(document).ready(function(){    
    $("#container-slide").css('opacity', 1);
    $("#container-slide").css('visibility', 'visible');
    $(".slide").css('display', 'block');
});

/* Load the bullets */
for (i = 0; i < total_slide; i++) {       
    var bola_texto = '<svg viewbox="0 0 16000 16000" class="bolinha scalavel-center"> <circle class="s_bola" stroke-width="900" style="fill: rgba(255,255,255,1); stroke: rgba(0,0,0,1);" cx="8000" cy="8000" r="5800"></circle> </svg>';    
    $("#container_bolas").append(bola_texto);
}  
var array_bolas = $(".s_bola");
var total_bolas = array_bolas.length;

/* Set initial default of elements (CSS) */
padrao();

function para_frente() {
     /* forward arrow */
     clearInterval(evento_tempo);
     evento_tempo = window.setInterval(avanca_slide, tempo_tran);
     avanca_slide();
}
 
function para_traz() {
     /* arrow back */
     clearInterval(evento_tempo);
     evento_tempo = window.setInterval(avanca_slide, tempo_tran);
     volta_slide();
}

function padrao() {     
     /* return slides to original default (CSS) */
     
     /* remove transition */
     $(".slide").css({transition: 'none'});
     
     /* Only resets general with <for> when previous is still null */
     if (anterior !== null)
     {
         $(slides[anterior]).css('opacity', 1);          
         $(slides[anterior]).css({ 'transform' : 'rotateY(0deg)' }); 
     } 
     else     
     {
         for (i = 0; i < slides.length; i++) { $(slides[i]).css('opacity', 1); }
         for (i = 0; i < slides.length; i++) { $(slides[i]).css('top', '0px'); }
         for (i = 0; i < slides.length; i++) { $(slides[i]).css('left', '0px'); }
         for (i = 0; i < slides.length; i++) { $(slides[i]).css('right', '0px'); }
         for (i = 0; i < slides.length; i++) { $(slides[i]).css('bottom', '0px'); }         
     }
     
     /* change bullet */
     //     
     /* Previous */
     $(array_bolas[anterior]).css("fill", "rgba(255,255,255,0.6)"); 
     $(array_bolas[anterior]).css("stroke", "rgba(0,0,0,1)");
     //
     /* Current */ 
     $(array_bolas[atual_slide]).css("fill", "rgba(0,0,0,0.6)");
     $(array_bolas[atual_slide]).css("stroke", "rgba(255,255,255,0.6)");     
}

function avanca_slide() {
/* slide forward function */

var wid_container  = $("#container-slide").width();
var hei_container  = $("#container-slide").height();

/* record previous slide */
anterior = atual_slide;

/* Rotate 3D */
$(".slide").css({transition: 'all 2.0s cubic-bezier(0.52, 0.06, 0.05, 0.95)'});
$(slides[atual_slide]).css('opacity', 0);
$(slides[atual_slide]).css({ 'transform' : 'rotateY(80deg)' });

/* did not enter end transition (zero) */
entrou = 0;

/* Position next slide after transition animation */
$("#container-slide").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() { 
    
    /* only enter end transition once */
    if (entrou  == 0) {
    
        /* joined the end transition (one) */
        entrou = 1;

        /* Put z-index zero on everything */
        for (i = 0; i < slides.length; i++) { $(slides[i]).css('z-index', 0); }

        /* Calculate Current */
        atual_slide++;
        if (atual_slide == total_slide) { atual_slide = 0; }
        $(slides[atual_slide]).css('z-index', total_slide);

        /* Calculate Next */
        proximo = atual_slide+1;
        if (proximo == total_slide) { proximo = 0; }
        $(slides[proximo]).css('z-index', total_slide-1);

        /* Returns the default CSS */        
        padrao();        
        
    }

});

}

function volta_slide() {
/* function that returns the slide without transition */

/* record previous slide */
anterior = atual_slide;

/* Put z-index zero on everything */
for (i = 0; i < slides.length; i++) { $(slides[i]).css('z-index', 0); }

/* Calculate Current */
atual_slide--;
if (atual_slide == -1) { atual_slide = slides.length-1; }
$(slides[atual_slide]).css('z-index', total_slide);

/* Calculate Next */
proximo = atual_slide+1;
if (proximo == total_slide) { proximo = 0; }
$(slides[proximo]).css('z-index', total_slide-1);

/* Returns the default CSS */
padrao();

}

/* Sets the time between one slide and another */
evento_tempo = window.setInterval(avanca_slide, tempo_tran);

/* Frame Escalation Routine */
//
$(window).on("load scroll resize",function(){
    //
    var wid_site  = $(window).width();
    
    /* scale up to mobil */
    if (wid_site > 800)  {  wid_tam_ini = wid_original; }
    if (wid_site <= 800) {  wid_tam_ini = wid_original-150; }
    if (wid_site <= 600) {  wid_tam_ini = wid_original-250; }
    if (wid_site <= 480) {  wid_tam_ini = wid_original-700; }
    if (wid_site <= 375) {  wid_tam_ini = wid_original-900; }    
    
    var escala = wid_site / wid_tam_ini;
    //    
    $('.scalavel-center').css({ 'transform' : 'scale(' + escala + ')' });
    $('.scalavel_arrow_left').css({ 'transform' : 'scale(' + escala + ')' });
    $('.scalavel_arrow_right').css({ 'transform' : 'scale(' + escala + ')' });
    //
});