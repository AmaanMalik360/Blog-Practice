const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/user'); 


exports.signup = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } 
    catch (error) {
        res.status(400).json({ message: 'Error registering user.', error });
    }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({ message: "User signed in successfully", user: existingUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};