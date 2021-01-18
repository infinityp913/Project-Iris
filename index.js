const express = require('express'); 
const app = express();
const {Translate} = require('@google-cloud/translate').v2;
const { parseURL, basicURLParse } = require('whatwg-url');
const path = require('path');
const translate = new Translate();


const PORT = process.env.PORT || 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.text());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    // res.sendFile('index.html',{root:__dirname});
    res.sendFile(path.resolve('index.html'));
})



app.post('/translate', async (req, res) => {
    parsed_json = JSON.parse(req.body);
    const text = parsed_json['text'];
    const lang = parsed_json['lang'];
    // res.writeHead(200,{'ContentType':'text/plain'});
    // console.log('text: '+text);
    // console.log('lang: '+lang);
    try{
        let [translations] = await translate.translate(text, lang);
        translations = Array.isArray(translations) ? translations : [translations];
        res.send(translations);
    }
    catch(err){
        console.log("Oops an error ocurred with getting a response from Google translate");
        console.log(err);
        res.send("error");
    }
    // try{
    //     translate_resp = await translate(text, {from: 'en', to: lang})
    //     res.write(translate_resp.text);
    // }
    // catch(err){
    //     console.log("Oops an error ocurred with getting a response from Google translate");
    //     console.log(err);
    //     res.write("error");
    // }
    // res.end();
})

app.listen(PORT, ()=>{
    console.log("Iris listening at "+PORT);
});
