const runButton = document.getElementById('run');

runButton.addEventListener('click', runCode);

function runCode(){
    const script = document.getElementById('script').value;
    const stdin = document.getElementById('stdin').value;
    const stdOut = document.getElementById('stdout');
    const languageStr = document.getElementById('lang').value;
    const language = languageStr.slice(0, -2);
    const versionIndex = parseInt(languageStr.slice(-1, languageStr.length));
    stdOut.textContent = 'Running...';
    const testcases = [
        {
            "i": "",
            "o": ""
        },
        {
            "i": "",
            "o": ""
        },
        {
            "i": "",
            "o": ""
        }
    ]


    var lmao = {script, stdin, language, versionIndex, testcases};
    // console.log(lmao);
    var options = {
        method: 'POST',
        body: JSON.stringify(lmao),
        headers: {'Content-Type': 'application/json'}
    }

    fetch("https://lamtellbackend.herokuapp.com/runcode",options)
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