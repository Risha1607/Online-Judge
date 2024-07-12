// src/components/UpdateProblem.jsx

import React, { useState } from 'react';
import axios from 'axios';

const UpdateProblem = () => {
  const [problemId, setProblemId] = useState('');
  const [problemData, setProblemData] = useState({
    title: '',
    description: '',
    difficulty: '',
    topic: '',
    constraints: '',
    input: '',
    output: '',
    example: '',
    hiddenTestCases: '',
  });

  const handleIdChange = (e) => {
    setProblemId(e.target.value);
  };

  const handleChange = (e) => {
    setProblemData({
      ...problemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:8000/problems/${problemId}`, problemData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating problem:', error);
    }
  };

  return (
    <div>
      <h2>Update Problem</h2>
      <input type="text" value={problemId} onChange={handleIdChange} placeholder="Problem ID" />
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="text" name="difficulty" placeholder="Difficulty" onChange={handleChange} />
        <input type="text" name="topic" placeholder="Topic" onChange={handleChange} />
        <input type="text" name="constraints" placeholder="Constraints" onChange={handleChange} />
        <input type="text" name="input" placeholder="Input" onChange={handleChange} />
        <input type="text" name="output" placeholder="Output" onChange={handleChange} />
        <input type="text" name="example" placeholder="Example" onChange={handleChange} />
        <button type="submit">Update Problem</button>
      </form>
    </div>
  );
};

export default UpdateProblem;
