import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

// var whitelist = ['']

app.use(cors({
    origin: "http://localhost:5500"
}))
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

app.post('/run',(req, res) =>{
    const lol = req;
    console.log(lol);
    var options = {
        method: 'POST',
        url: 'https://api.jdoodle.com/v1/execute',
        headers : {
            'content-type': 'application/json'
        },
        data: {
            clientId: 'bcb3738a7344dfa42377f58f2aa6ff37',
            clientSecret: '42415ee0e907ff690a4035471a05040795b477e4becad1280d5ddd23f5681368',
            script: req.body['textArea'],
            stdin : req.body['stdIn'],
            language : req.body['language'],
            versionIndex : req.body['languageIndex']
        }
    };
    axios.request(options).then(function (response){
        console.log(response.data);
        res.send(response.data);
    });
});

app.listen(PORT, ()=>{console.log(`Running as http://localhost:${PORT}`)});