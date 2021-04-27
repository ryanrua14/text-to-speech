var inputText = document.querySelector('.text');

document.getElementById('file-selector').addEventListener('change', (event)=>{
    var file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.addEventListener('load',(event)=>{
        inputText.value = event.target.result;
        console.log(inputText);
    });
    //Get result from text file and have synthesizer read the text file
    reader.readAsText(file);
    console.log(reader);
    inputText.value = reader.result;
    inputText.innerHTML = inputText.value;
    console.log(inputText);
});
