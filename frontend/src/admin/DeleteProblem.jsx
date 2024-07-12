// src/components/DeleteProblem.jsx

import React, { useState } from 'react';
import axios from 'axios';

const DeleteProblem = () => {
  const [problemId, setProblemId] = useState('');

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8000/problems/${problemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  return (
    <div>
      <h2>Delete Problem</h2>
      <input type="text" value={problemId} onChange={(e) => setProblemId(e.target.value)} placeholder="Problem ID" />
      <button onClick={handleDelete}>Delete Problem</button>
    </div>
  );
};

export default DeleteProblem;
