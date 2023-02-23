import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'

const router = express.Router();

// // Get a list of 50 posts
// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   password: String,
//   email: String
// });

// const User = mongoose.model('User', userSchema);

// Register endpoint
router.post('/register', async (req, res) => {


  let collection = await db.collection("users");

  let user = req.body;

  const existingUser = await collection.findOne({ username: user.username });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const result = await collection.insertOne(user);




  res.status(201).json({ message: 'User registered successfully', user: result });







});
// Add a new document to the collection
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let collection = await db.collection("users");
  // Find user in database
  collection.findOne({ username: username, password: password }, (error, user) => {
    if (error) {
      console.error('Error finding user:', error);
      res.status(500).send('Error finding user');
    } else if (!user) {
      console.log('User not found');
      res.status(401).send('Incorrect username or password');
    } else {
      console.log('User found:', user);

      // Create JWT token and send it back to client
      const token = jwt.sign({ username: user.username }, 'secret');
      res.status(200).send({ token, "username": username });
    }
  });
});


export default router;