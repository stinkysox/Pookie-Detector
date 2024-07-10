import React, { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";
import { GiBowTieRibbon } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Home.css";

const Home = () => {
  const [name, setName] = useState("");
  const [pookieName, setPookieName] = useState([]);

  // State to hold the detected Pookie name
  const [paraValue, setParaValue] = useState("");
  const [isPookieFound, setPookieFound] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const [newPookieName, setNewPookieName] = useState(""); // State for new name input

  useEffect(() => {
    // Initialize pookieName from localStorage on component mount
    const storedPookieNames = localStorage.getItem("pookieNames");
    if (storedPookieNames) {
      setPookieName(JSON.parse(storedPookieNames));
    } else {
      // Initial list of pookie names if local storage is empty
      setPookieName([
        "Anna de armas",
        "Anne Hathway",
        "Dua Lipa",
        "Lana del ray",
        "Krithy",
        "Sidney Sweeney",
        "Krith",
        "Irish",
        "Ryan Gosling",
        "Hitler",
      ]);
    }
  }, []);

  const onInputChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const onCheck = (event) => {
    event.preventDefault();
    const trimmedName = name.trim().toLowerCase();

    const found = pookieName.some(
      (pookie) => pookie.toLowerCase() === trimmedName
    );

    setPookieFound(found);
    setConfettiActive(found);

    if (found) {
      setParaValue(trimmedName); // Store the detected Pookie name
    } else {
      setParaValue(""); // Reset if not found
    }

    setName("");

    setTimeout(() => {
      setConfettiActive(false);
    }, 3000);
  };

  const handleAddPookie = () => {
    const newName = newPookieName.trim();
    if (newName && !pookieName.includes(newName)) {
      const updatedPookieNames = [...pookieName, newName];
      setPookieName(updatedPookieNames);
      setNewPookieName(""); // Clear input after adding
      setPookieFound(null); // Reset to allow refreshing view

      // Update local storage
      localStorage.setItem("pookieNames", JSON.stringify(updatedPookieNames));

      toast.success(`New Pookie Name Added`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 10000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div className="home">
      <div className="navbar">
        <div className="nav-image-container">
          <h1>Pookie Detector</h1>
          <img
            src="https://i.pinimg.com/564x/9a/e9/18/9ae9188780a05a690e384ee2062c89d2.jpg"
            alt=""
            className="nav-pookie-image"
          />
        </div>
      </div>
      <div className="input-container">
        {isPookieFound !== false && (
          <form onSubmit={onCheck}>
            <input
              onChange={onInputChange}
              type="text"
              placeholder="Enter your Name"
              className="input-element"
              value={name}
              required
            />
            <button type="submit">Check</button>
          </form>
        )}
      </div>
      <div className="pookie-container">
        <Confetti active={confettiActive} config={confettiConfig} />
        {isPookieFound && (
          <div className="pookie-text">
            <h1>
              Hello {paraValue}, You are a <br />
              Certified Pookie
            </h1>
            <GiBowTieRibbon color="pink" fontSize={40} />
            <br />
            <a
              href="https://open.spotify.com/playlist/1FoNuBQqc7LyUVp7TQ4zb1?si=p11qzUbSRrC5mDz3pUO4Nw&pi=rxXdOcWjSa-Ap"
              target="_blank"
              rel="noopener noreferrer"
              className="playlist-link"
            >
              Link to my Playlist
            </a>
          </div>
        )}
        {isPookieFound === false && (
          <div className="no-pookie">
            <h1>
              Sorry you are not pookie, but don't worry you can add your name to
              the pookie list.
            </h1>
            <br />
            <input
              type="text"
              placeholder="Add your name"
              value={newPookieName}
              onChange={(e) => setNewPookieName(e.target.value)}
              className="add-pookie-input"
            />
            <button onClick={handleAddPookie}>Add Name</button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
