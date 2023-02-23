import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
  question: String,
  answer: String,
  category: String
  // ,
  // author: String
});

const cardMessage = mongoose.model('Card', cardSchema);


// module.exports = PostMessage;
export default cardMessage;