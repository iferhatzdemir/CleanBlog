const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs'); //view engine
const Posts = require('./models/Posts');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;

//VİEW ENGİNE
mongoose
  .connect(
    'mongodb+srv://iferhatzdemir:F3rh4t32.@cluster0.cu6pjzc.mongodb.net/cleanblog-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });
app.set('view engine', 'ejs');

//MİDDLEWARE
app.use(express.static('public')); // Static dosyaları koyacağımız klasörü seçtik
app.use(express.urlencoded({ extended: true })); // Body parser
app.use(express.json()); // Body parser
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//ROUTES
app.get('/', postController.getAllPosts);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);

app.post('/posts', postController.createPost);

app.get('/post/edit/:post_id', pageController.getEditPostPage);
app.put('/post/:post_id', postController.editPost);

app.delete('/post/:post_id', postController.deletePost);
app.get('/post/:post_id', postController.getPost);

app.listen(port, () => {
  console.log(`Server ${port} portunda dinleniyor`);
});
