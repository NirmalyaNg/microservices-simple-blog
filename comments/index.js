const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');

const commentsByPostId = {};

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

app
  .route('/posts/:id/comments')
  .get((req, res) => {
    res.status(200).json(commentsByPostId[req.params.id] || []);
  })
  .post((req, res) => {
    const commentId = crypto.randomBytes(4).toString('hex');
    const newComment = {
      id: commentId,
      content: req.body.content,
    };
    if (commentsByPostId[req.params.id]) {
      commentsByPostId[req.params.id].push(newComment);
    } else {
      commentsByPostId[req.params.id] = [newComment];
    }

    res.status(201).json(newComment);
  });

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
