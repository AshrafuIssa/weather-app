const express = require ( 'express' );
const app = express();
const axios = require ('axios');
const cors = require ('cors');
const path = require ('path');
const fs = require ('fs');


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/home', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'home.html'), (err, data) => {
    if (err) throw err;
    res.end(data);
  });

})

app.post('/weather', async(req, res) => {
  try{
    const apiKey = '48273b823c11f951b9eb3c7225166428';
    console.log(req.body)
    const city = req.body.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    const weatherData = response.data;
    res.json(weatherData);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error : 'An error just occured'});
  }
});



app.listen(5001, () => {
  console.log("The server is running on port: 5001");
});