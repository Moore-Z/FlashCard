import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/:username/:deckID", async (req, res) => {
  console.log("Get in");
  let deckID = req.params.deckID;
  console.log("this is the ID: ", deckID);
  let collection = await db.collection("cards");
  console.log(deckID);
  let results = await collection.find({ "deckId": deckID })
    .limit(20)
    .toArray();
  console.log(results);
  res.send(results).status(200);
});



// Get a single post
router.get("/:username/:id", async (req, res) => {
  let collection = await db.collection("cards");
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/:parentDeckID", async (req, res) => {
  let collection = await db.collection("cards");
  let newDocument = req.body;
  console.log("This is the body: ", newDocument);



  // let deckID = await db.collection("decks").find({ "user": name, "deck": deckName }).toArray();
  // deckID = deckID[0];
  // deckID = deckID._id;

  // console.log("This is ID ?????", deckID);


  console.log(typeof newDocument.date);
  let result = await collection.insertOne(newDocument);
  console.log(result);

  res.send(result).status(204);

});

// Update the post with a new comment
router.patch("/update/:username", async (req, res) => {
  console.log("inside Patch");




  const username = req.params.username;
  const question = req.body.question;
  const questionNew = req.body.questionNew;
  const answer = req.body.answer;
  const answerNew = req.body.answerNew;
  console.log("user: ", username, " question:", question, " answer: ", answer);
  let CardID = await db.collection("cards").find({ "user": username, "question": question, "answer": answer }).toArray();
  CardID = CardID[0];
  let deckId = CardID.deckId;
  CardID = CardID._id;
  CardID = CardID.toString();
  console.log("This is ID ?????", CardID);



  const update = {
    "user": username,
    "question": questionNew,
    "answer": answerNew,
    "deckId": deckId
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

  // let collection = await db.collection("cards");
  // const id = req.params.id;
  // const updatedData = req.body;

  // // Construct the update object based on the fields provided in the request body
  // const update = {};
  // for (const [key, value] of Object.entries(updatedData)) {
  //   update[key] = value;
  // }

  // console.log(update);
  // // Update the resource with the specified ID
  // collection.updateOne({ _id: new ObjectId(id) }, { $set: update }, function (err, result) {
  //   if (err) {
  //     console.log('Error updating resource:', err);
  //     res.status(500).send('Error updating resource');
  //     return;
  //   }

  //   if (result.modifiedCount === 0) {
  //     res.status(404).send('Resource not found');
  //     return;
  //   }

  //   res.send('Resource updated successfully');
  // });

});


// Delete an entry
router.delete("/:username/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("cards");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
