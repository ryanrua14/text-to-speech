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
    voices = synth.getVoices().sort(function (a,b){
        //Sort the voices
        const aname = a.name.toLocaleUpperCase(), bname = b.name.toUpperCase();
        if(aname < bname) return -1;
        else if(aname == bname) return 0;
        else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for(var i = 0; i < voices.length; i++){
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ') ';
        
        if(voices[i].default){
            option.text += ' -- DEFAULT';
        }//End if

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }//End for
    voiceSelect.selectedIndex = selectedIndex;
}//End function

populateVoiceList();
if(speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

/**
 * Event handle to speak the entered text
 *  Uses onsubmit for when enter/return is pressed
 */
function speak(){
    if(synth.speaking){
        console.error('speechSynthesis.speaking');
        return;
    }if(inputText.value !== ''){
        var utterThis = new SpeechSynthesisUtterance(inputText.value);
        utterThis.onend = function(event){
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function(event){
            console.log('SpeechSynthesisUtterance.onerror');
        }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    //Search voice array for selected language from the select option
        for(i = 0; i < voices.length; i++){
            if(voices[i].name === selectedOption){
                utterThis.voice = voices[i];
            }
        }//End for
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
    }//end if
}//End function

/**
 * Trigger speak function onsubmit
 * @param {*} event 
 */
inputForm.onsubmit = function(event){
    event.preventDefault();
    speak();
}//End function

pitch.onchange = function(){
    pitchValue.textContent = pitch.value;
}//End function

rate.onchange = function(){
    rateValue.textContent = rate.value;
}//End function

voiceSelect.onchange = function(){
    speak();
}//End function
