// src/components/DeleteContest.jsx

import React, { useState } from 'react';
import axios from 'axios';

const DeleteContest = () => {
  const [contestId, setContestId] = useState('');

  const handleChange = (e) => {
    setContestId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8000/contests/${contestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting contest:', error);
    }
  };

  return (
    <div>
      <h2>Delete Contest</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={contestId} onChange={handleChange} placeholder="Contest ID" />
        <button type="submit">Delete Contest</button>
      </form>
    </div>
  );
};

export default DeleteContest;
