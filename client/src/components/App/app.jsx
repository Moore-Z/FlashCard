import React, { useState, useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App(props) {
  const [notes, setNotes] = useState([]);
  const [existCards, setCard] = useState([]);
  const { state } = useLocation();
  const [parentDeckId, setParentDeckId] = useState(state.seats_selected);
  const [parentUser, setparentUser] = useState(state.parentUser);
  // console.log("This is the parent deckID", parentDeckId);
  // console.log("This is the parent user", parentUser);
  const [CardQeustion, setCardQeustion] = useState('');
  const [CardAnswer, setCardAnswer] = useState('');
  const [CardQeustionNew, setCardQeustionNew] = useState('');
  const [CardAnswerNew, setCardAnswerNew] = useState('');


  const navigate = useNavigate();
  // Retrieve Exist data from datacase
  useEffect(() => {
    axios.get('http://localhost:5050/cards/' + parentUser + "/" + parentDeckId)
      .then(response => setCard(response.data))
      .catch(error => console.log(error));
  }, []);

  console.log("existCards: ", existCards, "   parentUser:", parentUser, "  parentDeckId:", parentDeckId);
  const handleAddCard = () => {
    axios.post('http://localhost:5050/cards/' + parentDeckId, { "user": parentUser, "question": CardQeustion, "answer": CardAnswer, "deckId": parentDeckId })
      .then(response => {
        console.log(response.data);
        // handle successful add
        navigate('/decks');
      })
      .catch(error => {
        console.log(error);
        // handle add error
      });
  }

  const handleUpdateCard = () => {
    console.log("username: ", parentUser, "oldQuestion: ", CardQeustion, "newDeckName: ", CardQeustionNew);
    axios.patch('http://localhost:5050/cards/update/' + parentUser,
      { "username": parentUser, "question": CardQeustion, "questionNew": CardQeustionNew, "answer": CardAnswer, "answerNew": CardAnswerNew })
      .then(response => {
        console.log(response.data);
        // handle successful update
      })
      .catch(error => {
        console.log(error);
        // handle update error
      });
  }

  const handleDelete = (card) => {
    console.log(card);
    axios.delete('http://localhost:5050/cards/' + parentUser + "/" + card._id)
      .then(alert("successfullly delete: " + card._id))
      .catch(error => console.log(error));
  }

  return (
    <div>
      <h2>This is the decks</h2>

      {existCards.map(card =>
        <div className="note" >
          <h2 key={card._id}>
            {card.question}:{card.answer}
          </h2>
          <button onClick={() => handleDelete(card)}>D</button>
        </div>
      )}


      <form>
        <h4>Add or update a FlashCard</h4>

        <label>
          Front Question:
          <input type="text" value={CardQeustion} onChange={e => setCardQeustion(e.target.value)} />
        </label>
        <br />
        <label>
          Front Question(New):
          <input type="text" value={CardQeustionNew} onChange={e => setCardQeustionNew(e.target.value)} />
        </label>
        <br />
        <label>
          Back Answer:
          <input type="text" value={CardAnswer} onChange={e => setCardAnswer(e.target.value)} />
        </label>
        <br />
        <label>
          Back Answer(New):
          <input type="text" value={CardAnswerNew} onChange={e => setCardAnswerNew(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleAddCard}>Add deck</button>
        <button type="button" onClick={handleUpdateCard}>Update deck</button>
      </form>



    </div >
  );
}

export default App;
