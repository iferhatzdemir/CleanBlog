const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs'); //view engine
const Posts = require('./models/Posts');

const app = express();
const port = 3000;

//VİEW ENGİNE
mongoose.connect('mongodb://localhost/cb-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set('view engine', 'ejs');

//MİDDLEWARE
app.use(express.static('public')); // Static dosyaları koyacağımız klasörü seçtik
app.use(express.urlencoded({ extended: true })); // Body parser
app.use(express.json()); // Body parser

//ROUTES
app.get('/', async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'views/index.html'));
  const posts = await Posts.find({});
  console.log(posts);
  res.render('index', { posts });
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  console.log(req.body);
  await Posts.create(req.body);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server ${port} portunda dinleniyor`);
});

app.get("/post/:post_id _method=DELETE", async (res, req) => {
  console.log(`Silinen Data: ${Posts.findById(req.params.post_id)}`)
  await Posts.findByIdAndDelete(req.params.post_id)


})

app.get('/post/:post_id', async (req, res) => { // burada post idsini yakalayarak
  const post = await Posts.findById(req.params.post_id) // id ye sahip post çekildi 
  res.render('post', { post: post })
})