const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
app.use(cors());
app.use(express.json());

// To get environment variable
dotenv.config({ path: './.env' });

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri)
.then(() => {
  console.log("DB connection established");
})
.catch((err) => {
  console.error("DB connection failed", err);
});

// Setting up router
const authRoutes = require('./src/routes/auth');
const postRoutes = require('./src/routes/post')

// All the routes are used here.
app.use(authRoutes);
app.use(postRoutes);
app.get('/', (req, res) => {
    res.json({message: "This is server"})
});

const port = process.env.PORT;
app.listen(port, () => { // Use server.listen instead of app.listen
  console.log(`server listening on port:${port}`);
})