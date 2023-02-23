import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/:uername", async (req, res) => {
  let name = req.params.uername;
  console.log(name);

  let collection = await db.collection("decks");
  let results = await collection.find({ "user": name })
    .limit(20)
    .toArray();
  console.log(results);

  // This part I tested to how to implement
  // Please do not delete it so far
  let deckID = await db.collection("decks").find({ "user": "RJ", "deck": "CS" }).toArray();
  deckID = deckID[0];
  deckID = deckID._id;
  console.log("This is ID ?????", deckID);
  res.send(results).status(200);

});
// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("decks");

  let newDocument = req.body;

  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update the post with a new comment
router.patch("/update/:username", async (req, res) => {


  let collection = await db.collection("decks");

  const username = req.params.username;
  const deckNameNew = req.body.newDeckName;
  const deckName = req.body.oldDeckName;

  let deckID = await db.collection("decks").find({ "user": username, "deck": deckName }).toArray();
  deckID = deckID[0];
  deckID = deckID._id;
  deckID = deckID.toString();
  //console.log("This is ID ?????", deckID);



  const update = {
    "user": username,
    "deck": deckNameNew
  };


  console.log(update);
  // Update the resource with the specified ID
  collection.updateOne({ _id: new ObjectId(deckID) }, { $set: update }, function (err, result) {
    if (err) {
      console.log('Error updating resource:', err);
      res.status(500).send('Error updating resource');
      return;
    }

    if (result.modifiedCount === 0) {
      res.status(404).send('Resource not found');
      return;
    }

    res.send('Resource updated successfully');
  });








});
// Delete an entry
router.delete("/:username/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("decks");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;