import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ShowDecks(props) {

  const [decks, setDecks] = useState([]);
  //const auth = props.isAuthenticated;

  //const [deck_Id, setID] = useState(props.username);
  const [username, setUsername] = useState('');
  const [deckName, setDeckName] = useState('');
  const [deckNameNew, setDeckNameNew] = useState('');
  const [deckID, setdeckID] = useState('');


  const navigate = useNavigate();

  // Get all the deck info
  useEffect(() => {
    let deckURL = 'http://localhost:5050/decks/' + props.username;
    console.log(deckURL);
    axios.get(deckURL)
      .then(response => setDecks(response.data))
      .catch(error => console.log(error));
  }, []);

  function handleDelete(deck) {
    console.log(deck);
    axios.delete('http://localhost:5050/decks/' + deck.username + "/" + deck._id)
      .then(alert("successfullly delete: " + deck._id))
      .catch(error => console.log(error));
  }



  const handleUpdateDeck = () => {
    console.log("username: ", username, "oldDeckName: ", deckName, "newDeckName: ", deckNameNew);
    axios.patch('http://localhost:5050/decks/update/' + username,
      { "username": username, "oldDeckName": deckName, "newDeckName": deckNameNew })
      .then(response => {
        console.log(response.data);
        // handle successful update
      })
      .catch(error => {
        console.log(error);
        // handle update error
      });
  }

  const handleAddDeck = () => {
    axios.post('http://localhost:5050/decks/', { "user": username, "deck": deckName })
      .then(response => {
        console.log(response.data);
        // handle successful add
      })
      .catch(error => {
        console.log(error);
        // handle add error
      });
  }

  function handleCards(deck) {

    console.log(deck._id);

    navigate('/card', { state: { seats_selected: deck._id, parentUser: deck.user } })

  }


  return (
    <div>
      <div>
        <h2>This is the decks</h2>
        {decks.map(deck =>
          <div className="note" >
            <h2 key={deck._id}>
              {deck.user}:{deck.deck}
            </h2>
            <button onClick={() => handleDelete(deck)}>D</button>
            <button onClick={() => handleCards(deck)}>C</button>
          </div>
        )}
      </div>
      <div>

        <form>
          <h4>Add or update a deck</h4>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Deck name:
            <input type="text" value={deckName} onChange={e => setDeckName(e.target.value)} />
          </label>
          <br />
          <label>
            New deck name (for updating):
            <input type="text" value={deckNameNew} onChange={e => setDeckNameNew(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleAddDeck}>Add deck</button>
          <button type="button" onClick={handleUpdateDeck}>Update deck</button>
        </form>
      </div>

    </div>

  );
}

export default ShowDecks;






