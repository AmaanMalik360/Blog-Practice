const Post = require("../models/post");

// Get all posts (public access)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts.", error });
  }
};

// Get a single post by ID (public access)
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post.", error });
  }
};

// Create a new post (restricted to 'admin' role)
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).send({post});
  } catch (error) {
    res.status(500).json({ message: "Error creating post.", error });
  }
};

// Update a post by ID (restricted to 'admin' role)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post.", error });
  }
};

// Delete a post by ID (restricted to 'admin' role)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post.", error });
  }
};
