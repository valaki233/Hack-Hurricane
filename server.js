const express = require('express');
const db = require('db.js');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/getrec/:userid', (req, res) => {
    function recommend(userid) {
        userdata = db.User.findOne({where: {id: userid}});
        attractions = db.Attractions.findAll();
        rec = getRec(attractions, userdata);
        console.log(rec);
    }

    function getRec(attractions, data) {
        const puppeteer = require('puppeteer'); 
        const prompt = `Hi you are a professional theme park adviser and you need to decide where your client should go. The attractions are the following: '${attractions}'. And your client data pulled from a database is ${data} Only return a list from the best one to the worst ranked on a scale of 1 to 10. Nothing else. No text only the list.`
        (async () => { 
            const browser = await puppeteer.launch(); 
            const page = await browser.newPage(); 
            await page.goto('https://deepai.org/chat'); 
            const inputFieldSelector = '//*[@id="chatboxWrapperId_0"]/textarea';
            await page.waitForSelector(inputFieldSelector);
            await page.type(inputFieldSelector, prompt);
            await page.click('//*[@id="chatSubmitButton"]');
            const text = await page.evaluate(() => document.querySelector('/html/body/div[4]').innerText);
            console.log(text)
            await browser.close();
            return text;
        })();
   }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



