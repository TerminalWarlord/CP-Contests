const runButton = document.getElementById('run');

runButton.addEventListener('click', runCode);

function runCode(){
    const textArea = document.getElementById('script').value;
    const stdIn = document.getElementById('stdin').value;
    const stdOut = document.getElementById('stdout');
    const languageStr = document.getElementById('lang').value;
    const language = languageStr.slice(0, -2);
    const languageIndex = parseInt(languageStr.slice(-1, languageStr.length));
    

    var lmao = {textArea, stdIn, language, languageIndex};
    // console.log(lmao);
    var options = {
        method: 'POST',
        body: JSON.stringify(lmao),
        headers: {'Content-Type': 'application/json'}
    }

    fetch("http://localhost:5000/run",options)
    .then(response=>response.json())
    .then(data=>{
        const output = data['output'];
        const memory = data['memory'];
        const runtime = data['cpuTime'];
        // if(output===null){
        //     output = 'Error!';
        // }
        stdOut.textContent = `${output}\nMemory Used: ${memory}\nRuntime: ${runtime}`
        // console.log(data);
    })
    
}