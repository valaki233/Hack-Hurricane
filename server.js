const express = require('express');
const app = express();
const port = 3000;



app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/getrec/:userid', (req, res) => {
    function recomed(userid) {
        userdata = //SQL data pull
        rec = getRec(userdata);
        return rec
    }

    function getRec(data) {
        const puppeteer = require('puppeteer'); 
        const prompt = `Hi you are a professional theme park adviser and you need to decide where your client should go. The attractions are the following: '${attrations}'. And your client data pulled from a database is ${clientdata} Only return a list from the best one to the worst ranked on a scale of 1 to 10. Nothing else. No text only the list.`
        (async () => { 
            const browser = await puppeteer.launch(); 
            const page = await browser.newPage(); 
            await page.goto('https://deepai.org/chat'); 
            const inputFieldSelector = '//*[@id="chatboxWrapperId_0"]/textarea';
            await page.waitForSelector(inputFieldSelector);
            await page.type(inputFieldSelector, prompt);
            await page.click('//*[@id="chatSubmitButton"]');
            await 10
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



