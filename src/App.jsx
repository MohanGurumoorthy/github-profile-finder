import { useEffect, useState } from 'react'
import User from "./user"
import './App.css'


function App() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUser, setShowUser] = useState(false); // Controls visibility

  async function fetchGithubUserData() {
    if (!userName.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setShowUser(false); // Hide previous data before loading new data

    try {
      const res = await fetch(`https://api.github.com/users/${userName}`);
      const data = await res.json();

      if (res.status === 404) {
        setError("User not found. Try another username.");
        setUserData(null);
      } else {
        setUserData(data);
        setShowUser(true); // Show user data after fetching
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  }

  function handleSubmit() {
    fetchGithubUserData();
  }

  return (
    <div className="github-profile-container">
      <h2>Find a GitHub Profile</h2>
      <div className="input-wrapper">
        <input
          name="search-by-username"
          type="text"
          placeholder="Enter GitHub Username..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>

      {loading && <h3>Loading... Please wait.</h3>}
      {error && <h3 className="error">{error}</h3>}

      {showUser && userData && <User user={userData} />}
    </div>
  );
}

export default App;
