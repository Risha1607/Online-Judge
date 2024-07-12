import React, { useState } from 'react';
import axios from 'axios';

const CreateProblem = () => {
  const [problemData, setProblemData] = useState({
    title: '',
    description: '',
    difficulty: '',
    topic: '',
    constraints: '',
    input: '',
    output: '',
    example: '',
    hiddenTestCases: [],
  });

  const [testCase, setTestCase] = useState({
    input: '',
    expectedOutput: '',
  });

  const handleProblemChange = (e) => {
    setProblemData({
      ...problemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTestCaseChange = (e) => {
    setTestCase({
      ...testCase,
      [e.target.name]: e.target.value,
    });
  };

  const addTestCase = () => {
    setProblemData({
      ...problemData,
      hiddenTestCases: [...problemData.hiddenTestCases, testCase],
    });
    setTestCase({
      input: '',
      expectedOutput: '',
    });
  };

  const deleteTestCase = (index) => {
    const updatedTestCases = problemData.hiddenTestCases.filter((_, i) => i !== index);
    setProblemData({
      ...problemData,
      hiddenTestCases: updatedTestCases,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8000/problems', problemData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating problem:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a Problem</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={problemData.title}
          onChange={handleProblemChange}
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={problemData.description}
          onChange={handleProblemChange}
          className="form-textarea"
        ></textarea>
        <input
          type="text"
          name="difficulty"
          placeholder="Select Difficulty"
          value={problemData.difficulty}
          onChange={handleProblemChange}
          className="form-input"
        />
        <input
          type="text"
          name="topic"
          placeholder="Select Topic"
          value={problemData.topic}
          onChange={handleProblemChange}
          className="form-input"
        />
        <textarea
          name="constraints"
          placeholder="Constraints"
          value={problemData.constraints}
          onChange={handleProblemChange}
          className="form-textarea"
        ></textarea>
        <textarea
          name="input"
          placeholder="Input Format"
          value={problemData.input}
          onChange={handleProblemChange}
          className="form-textarea"
        ></textarea>
        <textarea
          name="output"
          placeholder="Output Format"
          value={problemData.output}
          onChange={handleProblemChange}
          className="form-textarea"
        ></textarea>
        <textarea
          name="example"
          placeholder="Example"
          value={problemData.example}
          onChange={handleProblemChange}
          className="form-textarea"
        ></textarea>

        <h3>Hidden Test Cases</h3>
        <textarea
          name="input"
          placeholder="Input"
          value={testCase.input}
          onChange={handleTestCaseChange}
          className="form-textarea"
        ></textarea>
        <textarea
          name="expectedOutput"
          placeholder="Expected Output"
          value={testCase.expectedOutput}
          onChange={handleTestCaseChange}
          className="form-textarea"
        ></textarea>
        <button type="button" onClick={addTestCase} className="form-button">Add Test Case</button>

        <ul>
          {problemData.hiddenTestCases.map((testCase, index) => (
            <li key={index}>
              <strong>Input:</strong> <pre>{testCase.input}</pre> <br />
              <strong>Expected Output:</strong> <pre>{testCase.expectedOutput}</pre>
              <button type="button" onClick={() => deleteTestCase(index)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>

        <button type="submit" className="form-button">Create Problem</button>
      </form>
    </div>
  );
};

export default CreateProblem;


