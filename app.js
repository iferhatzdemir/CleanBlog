const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
//**Template Engine */
app.set('view engine', 'ejs');
// ** MIDDLWARE **
app.use(express.static('public'));
const port = 3002;

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
