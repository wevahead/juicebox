const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); 
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    console.log('hello');
    console.log(req.params.tagName);
  try {
    const posts = await getPostsByTagName(req.params.tagName);
    res.send({posts});
  } catch ({ name, message }) {
    next({
      name: 'Error',
      messgage: 'ERROR'
    })
  }
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

  res.send({
    tags
  });
});

module.exports = tagsRouter;