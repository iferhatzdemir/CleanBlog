const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

const Photo = require('./models/Photos');

//db Conection
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//**Template Engine */
app.set('view engine', 'ejs');

// ** MIDDLWARE **
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //urldeki  datayı okumamızı sağlar
app.use(express.json()); //url deki datayı json formatında okumamızı sağlar

//** ROUTES **

const port = 3000;
app.listen(port, () => console.log(`Sunucu ${port} ile başlatıldı!`));
app.get('/', async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'views/index.html'));
  const photos = await Photo.find({});
  console.log(photos);
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});
