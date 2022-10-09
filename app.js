const express = require('express');
const app = express();

const port = 3002;

app.get('/', (req, res) => {
  const blogPost = {
    title: 'My first blog post',
    content: 'This is my first blog post',
    photo: 'https://picsum.photos/200/300',
    AudioDestinationNode: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
  };
  res.send(blogPost);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
