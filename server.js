
const express = require('express'),
    app = express(),
    fs = require('fs'),
    hbs = require("hbs"),
    requestify = require('requestify');

const host = '127.0.0.1';
const port =  8000;

app.set("view engine", "hbs"); 
app.set("views", "client"); 
hbs.registerPartials(__dirname + "/client/partials")

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/server', (req, res) => {
    res.render("lab1");
});
app.get('/api', (req, res) => {
    let keyword = req.query.keyword;
    requestify.get(`https://ll.thespacedevs.com/2.2.0/launch/?mode=list&search=${keyword}`)
    .then(function(response) {
        response.getBody();
        let result = JSON.parse(response.body);
        res.render("response_page",
            {
                count: result["count"]
            });
    }
);
});


app.get('/script-js', (req, res) => {
    res.set('Content-Type', 'text/plain');
    fs.readFile('client/script.js', 'utf8', (err, data) => {
        if (err) throw err;

        res.send(data);
    });
});

app.get('/style-css', (req, res) => {
    res.set('Content-Type', 'text/plain');
    fs.readFile('client/style.css', 'utf8', (err, data) => {
        if (err) throw err;

        res.send(data);
    });
});


app.use((req, res, next) => {
    res.send('Not found');
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});