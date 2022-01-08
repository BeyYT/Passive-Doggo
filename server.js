// in a few words, we need these modules to make the "web server"
import express from 'express';
import scrape from 'website-scraper';
import fs from 'fs';

//declaring an app variable for the requests that we may get
var app = express()

app.get('/get', (req, res) => {
    // generating a random number for an directory path.
    let randomid = Math.floor(Math.random() * 999999);
    let r = req.query.web;
    let q = ['http://', 'https://']
    // Get the Request Parameters to "Scrape" the website
    if(r.includes("http://")) {
        var requet = r
    }
    
    else if(r.includes("https://"))  {
        var requet = r
    }
    else {
        var requet = "http://" + req.query.web;
    }
    
    let request = requet.replace(/"/g, '')
    const options = {
        urls: request,
        // this is where the randomid variable comes to use
        directory: './temp/' + randomid
    };
    // Scraping the website time!
    const result = scrape(options);
    // when finished or ready, console log it.
    console.log("proxy ready!");

    //function so that people can use website immediatly.
    function redirect() {
        res.send('ready to use! <a href="http://'+ req.get('host').replace(':3000', '') +':8030/temp/' + randomid +'/index.html">link, note: if it looks funky the first try, try reloading the page!</a>')
    }
    //function to delete the website to save space.
    function del() {
        fs.rmSync("./temp/" + randomid, { recursive: true, force: true });
        console.log("site deleted: " + randomid)
    }
    // like a timer but on steroids
    setTimeout(redirect, 5000, 'man');

    setTimeout(del, 30000, 'man');
});
// app start
app.listen(3000);