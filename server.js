// TODO:
// map

// FEATURE:
// send to phone route

const express = require('express');
const db = require('./db.js');
const openai = require('openai');
const mapbox = require('mapbox');
const { json } = require('body-parser');
const app = express();
const port = 3000;
var rec_list = json();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  app.use(express.static('public'));
  res.redirect('/index.html');
});

app.get('/about', (req, res) => {
  app.use(express.static('public'));
  res.redirect('/about.html');
})



app.post('/register', async (req, res) => {
  const getRec = async (attractions, data) => {
    const dataString = JSON.stringify(data);
    const attractionsString = JSON.stringify(attractions);
    const prompt = `You are a professional theme park adviser and you need to decide where your client should go. The attractions are the following: '${attractionsString}'. And your client data pulled from a database is ${dataString}. Only return a json with the attractions in order of logic, for example dont put restaurant before a rollercoster. It should fill out the whole day, max 10 attractions, pay attention to put eating in the correct times`;
    console.log(prompt);
    const sysprompt = `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely and shortly as possible. Only return the stops in json format nothing else no text no comments no additional information, VERY IMPORTANT IS THAT YOU SHOULD NOT PUT OTHER TEXT IN IT the json's list name must be 'attractions'! , Knowledge cutoff: 2021-September`
    const ai = new openai.OpenAI({apiKey: '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'});
  
    const completion = await ai.chat.completions.create({
      messages: [{ role: "user", content: prompt }, { role: "system", content: sysprompt }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  }

  try {
    var formdata = req.body;
    var attractions = await db.Attractions.findAll();
    await getRec(attractions, formdata)
      .then(res => rec_list = JSON.parse(res))
      .catch(error => console.error(error));

    console.log(typeof(rec_list));
    res.status(200).redirect('/map.html');
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while registering' });
  }
});



app.get('/attractions', async (req, res) => { 
  try {
    res.status(200).json(rec_list);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while getting attractions' });
  }

});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(process.env.ENV_TEST);
});



