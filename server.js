// TODO:
// fooldal style
// form submit array baszas
// del button
// map

// FEATURE:
// send to phone route


const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 8);

//     try {
//         const user = await db.User.create({ username, password: hashedPassword });
//         res.status(200).send({ id: user.id });
//     } catch (err) {
//         console.error('Error registering user:', err);
//         res.status(500).send('There was a problem registering the user.');
//     }
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await db.User.findOne({ where: { username } });
//         if (!user) {
//             return res.status(404).send('No user found.');
//         }

//         const passwordIsValid = bcrypt.compareSync(password, user.password);
//         if (!passwordIsValid) {
//             return res.status(401).send({ auth: false, token: null });
//         }

//         res.status(200).send({ auth: true, token: 'random_token' }); // replace "random_token" with a real JWT
//     } catch (err) {
//         console.error('Error finding user:', err);
//         res.status(500).send('There was a problem finding the user.');
//     }
// });

app.get('/', (req, res) => {
  app.use(express.static('public'));
  res.redirect('/index.html');
});



app.post('/register', async (req, res) => {
  try {
    var childNumber = 0
    var { name, age, childNames, childGender, childAges } = req.body;
    console.log(req.body);
    if (childNames) {
      console.log("Converting started");
      childNumber = childNames.length;
      if (Array.isArray(childGender)) {
        childGender = JSON.stringify(childGender);
      }
      if (Array.isArray(childAges)) {
        childAges = JSON.stringify(childAges);
      }
      if (Array.isArray(childNames)) {
        childNames = JSON.stringify(childNames);
      }
    }
    const user = await db.User.create({ 
      name, 
      age, 
      childNumber,
      childNames, 
      childAges,
      childGender
    });

    res.status(200).redirect('/map.html');
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});




app.get('/getroute', (req, res) => {
    console.log(req.body);
    async function getRoute(ai_resp) {

        points 
        let route = '';
        for (let i = 0; i < points.length; i++) {
          route += `${points[i][0]},${points[i][1]};`;
        }
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${route}?steps=true&geometries=geojson&access_token=${process.env.MAPBOX_TOKEN}`,
          { method: 'GET' }
        );
        }
      })
      
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



