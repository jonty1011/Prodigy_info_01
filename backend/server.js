// all are the libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");

const SECRET_KEY = 'secretkey'

// connect to express app
const app = express();

const PORT = process.env.PORT || 3001;

// connect to Mongodb

const DBURI =
  "mongodb+srv://jontysuthar:tyC4rMwJNcK0tGZu@cluster30.npdumpc.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster30";

const connectDB = async () => {
  try {
    await mongoose.connect(DBURI);
    console.log("Connected to MongoDB");

    app.listen(3001, () => {
      console.log("Server is connected to port 3001 and connected to MongoDB");
    });
  } catch (error) {
    console.log("Unable to connect to Server:", error);
  }
};

connectDB();

// middleware
app.use(bodyParser.json());
app.use(cors());

// Schema

// Routes
// User Registration
// Post Register

app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password:hashedPassword });
    newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in  signing up" });
  }
});
 
app.get('/register',async(req,res)=>{
  try{
    const users = await User.find();
    res.status(201).json(users)
  }catch(error){
    res.status(500).json({error:"Unable to get users"})
  }
})

// update in this code

app.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, username, password } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});


// GET LOGIN
app.post('/login',async (req,res)=>{
  try{
    const {username , password } = req.body;
    const user = await User.findOne({username})
    if(!user){
      return res.status(401).json({error:'Invalid credentials'})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      return res.status(401).json({error:'Invalid credentials in'})
    }
    const token = jwt.sign({userId:user._id},SECRET_KEY , {expiresIn :'1hr'})
    res.json({message: 'Login successful'});
  }catch(error){
    res.status(500).json({error:"Error logging in"})
  }
})