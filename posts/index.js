const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');

const posts = {};

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app
  .route('/posts')
  .get((req, res) => {
    res.status(200).json(posts);
  })
  .post((req, res) => {
    const postId = crypto.randomBytes(4).toString('hex');
    posts[postId] = {
      id: postId,
      title: req.body.title,
    };

    res.status(201).json(posts[postId]);
  });

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
