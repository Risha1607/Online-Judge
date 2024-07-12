// src/components/UpdateContest.jsx

import React, { useState } from 'react';
import axios from 'axios';

const UpdateContest = () => {
  const [contestId, setContestId] = useState('');
  const [contestData, setContestData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    problems: [],
  });

  const [problemData, setProblemData] = useState({
    title: '',
    description: '',
    points: 0,
    constraints: '',
    input: '',
    output: '',
    example: '',
    hiddenTestCases: '',
  });

  const handleIdChange = (e) => {
    setContestId(e.target.value);
  };

  const handleChange = (e) => {
    setContestData({
      ...contestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProblemChange = (e) => {
    setProblemData({
      ...problemData,
      [e.target.name]: e.target.value,
    });
  };

  const addProblem = () => {
    const problems = [...contestData.problems, {
      ...problemData,
      points: parseInt(problemData.points),
      constraints: problemData.constraints.split('\n'),
      hiddenTestCases: problemData.hiddenTestCases.split('\n').map(tc => {
        const [input, expectedOutput] = tc.split(';');
        return { input, expectedOutput };
      }),
    }];
    setContestData({
      ...contestData,
      problems
    });
    // Clear the problem input fields
    setProblemData({
      title: '',
      description: '',
      points: 0,
      constraints: '',
      input: '',
      output: '',
      example: '',
      hiddenTestCases: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formattedStartDate = new Date(contestData.startDate).toISOString();
    const formattedEndDate = new Date(contestData.endDate).toISOString();
    const dataToSend = {
      ...contestData,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };
    try {
      const response = await axios.put(`http://localhost:8000/contests/${contestId}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating contest:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Contest</h2>
      <input type="text" value={contestId} onChange={handleIdChange} placeholder="Contest ID" />
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="form-input" />
        <input type="datetime-local" name="startDate" onChange={handleChange} className="form-input" />
        <input type="datetime-local" name="endDate" onChange={handleChange} className="form-input" />
        <h3>Add Problems</h3>
        <input type="text" name="title" placeholder="Title" value={problemData.title} onChange={handleProblemChange} className="form-input" />
        <textarea name="description" placeholder="Description" value={problemData.description} onChange={handleProblemChange} className="form-textarea"></textarea>
        <input type="number" name="points" placeholder="Points" value={problemData.points} onChange={handleProblemChange} className="form-input" />
        <textarea name="constraints" placeholder="Constraints (each constraint on a new line)" value={problemData.constraints} onChange={handleProblemChange} className="form-textarea"></textarea>
        <input type="text" name="input" placeholder="Input Format" value={problemData.input} onChange={handleProblemChange} className="form-input" />
        <input type="text" name="output" placeholder="Output Format" value={problemData.output} onChange={handleProblemChange} className="form-input" />
        <input type="text" name="example" placeholder="Example" value={problemData.example} onChange={handleProblemChange} className="form-input" />
        <textarea name="hiddenTestCases" placeholder="Hidden Test Cases (each test case as input;expectedOutput on a new line)" value={problemData.hiddenTestCases} onChange={handleProblemChange} className="form-textarea"></textarea>
        <button type="button" onClick={addProblem} className="form-button">Add Problem</button>
        <button type="submit" className="form-button">Update Contest</button>
      </form>
    </div>
  );
};

export default UpdateContest;
