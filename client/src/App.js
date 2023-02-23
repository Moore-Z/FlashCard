import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from
  "react-router-dom";

import PrivateRoute from './common/PrivateRoute'

import {
  Navigation,
  Footer,
  Home,
  SignIn,
  SignUp,
  Decks,
  Main,
  App1,
} from "./components";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  // Check Whether login
  useEffect(() => {
    const storedIsChecked = localStorage.getItem("Auth");
    if (storedIsChecked) {
      setIsAuthenticated(JSON.parse(storedIsChecked));
    }
  }, []);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route exact path='/card' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route exact path='/card' element={<App1 username={username} />} />
        </Route>
        <Route exact path='/decks' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route exact path='/decks' element={<Decks username={username} />} />
        </Route>


        <Route path="/card" element={<App1 />} />

        <Route path="/login" element={<SignIn setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route exact path='/study' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route exact path='/study' element={<Main />} />
        </Route>

      </Routes>

      <Footer />
    </Router >
  );

}

export default App;
