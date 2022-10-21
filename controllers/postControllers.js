const Posts = require('../models/Posts');

exports.getAllPosts = async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'views/index.html'));
  const page = req.query.page || 1;
  const postsPerPage = 2;
  const totalposts = await Posts.find().countDocuments();
  const posts = await Posts.find({})
    .sort({ dateCreated: 'asc' })
    .skip((page - 1) * postsPerPage)
    .limit(postsPerPage);
  res.render('index', {
    posts: posts,
    current: page,
    pages: Math.ceil(totalposts / postsPerPage),
  });
  // const posts = await Posts.find({});
  // console.log(posts);
  // res.render('index', { posts });
};

exports.createPost = async (req, res) => {
  await Posts.create(req.body);
  res.redirect('/');
};

exports.getPost = async (req, res) => {
  // burada post idsini yakalayarak
  const post = await Posts.findById(req.params.post_id); // id ye sahip post çekildi
  res.render('post', { post: post });
};

exports.editPost = async (req, res) => {
  const f_post = await Posts.findById({
    _id: req.params.post_id,
  });
  f_post.title = req.body.title;
  f_post.description = req.body.description;

  f_post.save();

  res.redirect(`/post/${f_post.id}`);
};

exports.deletePost = async (req, res) => {
  await Posts.findByIdAndDelete(req.params.post_id);
  res.redirect('/');
};
