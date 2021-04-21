var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputText = document.querySelector('.text');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');
//Voice array for select option 
var voices = [];

/**
 * Function populates select element on home page
 * This will provide users the option to select different
 * voices for the synthesizer
 */
function populateVoiceList(){
    voices = synth.getVoices();
    for(var i = 0; i < voices.length; i++){
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ') ';
        
        if(voice[i].default){
            option.text += ' -- DEFAULT';
        }//End if

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }//End for
}