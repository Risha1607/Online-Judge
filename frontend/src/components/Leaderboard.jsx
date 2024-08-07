import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';  // Import the CSS file for styling

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leaderboard`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();

    const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const updatedRankings = JSON.parse(event.data);
      setUsers(updatedRankings);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => user.firstname && user.lastname && user.totalScore !== undefined).map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstname} {user.lastname}</td>
              <td>{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;






