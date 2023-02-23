import React, { useState } from 'react';
import axios from 'axios';
import './Regist.css';
import { useNavigate } from 'react-router-dom';
function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  localStorage.setItem("Auth", JSON.stringify(false));

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password
    };
    axios.post('http://localhost:5050/api/register', userData)
      .then(response => {
        console.log(response.data);
        // Redirect to home page or display success message
        alert("You have successfully Sign Up! Please, log in");
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
        // Display error message to user
      });
  }


  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Registration</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;