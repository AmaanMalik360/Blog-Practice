const express = require('express');
const { deletePost, updatePost, getAllPosts, createPost, getPostById } = require('../controllers/post');
const { requireSignin } = require('../middlewares/auth');
const router = express.Router()

router.post('/posts', requireSignin(['admin']), createPost ); 
router.put('/posts/:id', requireSignin(['admin']), updatePost ); // id is postId
router.delete('/posts/:id', requireSignin(['admin']), deletePost ); // id is postId
router.get('/posts', requireSignin(['admin','user']), getAllPosts)
router.get('/posts/:id', requireSignin(['admin','user']), getPostById)

module.exports = router