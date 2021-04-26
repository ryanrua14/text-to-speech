document.getElementById('file-selector').addEventListener('change', (event)=>{
    const file = event.target.files;
    console.log(file);
   const reader = new FileReader();
    reader.addEventListener('load',(event)=>{
        inputText.src = event.target.result;
    });
    reader.readAsText(file);
    console.log(reader);
});
