import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  localStorage.setItem("Auth", JSON.stringify(false));

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:5050/api/login', {
      username: username,
      password: password
    })
      .then(response => {
        console.log('Login successful');
        // TODO: Save authentication token and redirect user to protected page
        props.setIsAuthenticated(true);
        console.log("this is the token username: ", response.data.username)

        props.setUsername(response.data.username);
        alert("You have successfully Log In! Please, Study");
        navigate(`/decks`);
      })
      .catch(error => {
        console.log('Login failed:', error);
        // TODO: Display error message to user
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;