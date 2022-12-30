// setting Speech Synthesis
let text_to_speech = new SpeechSynthesisUtterance();
let synth = window.speechSynthesis;
$(function() {
    let flag = false;
    // SpeechSynthesisUtterance Configuration
    text_to_speech.lang = 'pt-BR';
    text_to_speech.voice = synth.getVoices()[1];
    text_to_speech.rate = 0.8 // velocidade de fala

    // An Event that identifies the part of text has spoken
    text_to_speech.onboundary = function(e) {
        var message = $('#texto').text()
        var b_text = String(message).substring(0, e.charIndex + e.charLength)
        var marked = $('<mark>')
        marked.text(b_text)
        $('#texto').html('')
        $('#texto').append(marked)
        $('#texto').append(message.replace(b_text, ""))
    }

    synth.cancel()

    $('.playText').on("click", function(e) {
        e.preventDefault();
        
        text_to_speech.text = $('#texto').html();
        $('#texto').animate({ scrollTop: 0 }, 'fast')
        
        if((synth.speaking == true) && (flag == true)){
            synth.pause()
            flag = false;
            $('#btnText i').removeClass("fa-pause").addClass("fa-play"); 
        }else{
            synth.resume();
            synth.speak(text_to_speech)
            flag = true;
            $('#btnText i').removeClass("fa-play").addClass("fa-pause");
        }
    })  
})