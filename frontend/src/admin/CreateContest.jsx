// src/components/CreateContest.jsx

import React, { useState } from 'react';
import axios from 'axios';

const CreateContest = () => {
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
        hiddenTestCases: [],
    });

    const [testCase, setTestCase] = useState({
        input: '',
        expectedOutput: '',
    });

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

    const addProblem = () => {
        const problems = [...contestData.problems, {
            ...problemData,
            points: parseInt(problemData.points),
            constraints: problemData.constraints.split('\n'),
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
            hiddenTestCases: [],
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
            const response = await axios.post('http://localhost:8000/contests', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating contest:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Contest</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="datetime-local"
                    name="startDate"
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="datetime-local"
                    name="endDate"
                    onChange={handleChange}
                    className="form-input"
                />
                <h3>Add Problems</h3>
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
                    type="number"
                    name="points"
                    placeholder="Points"
                    value={problemData.points}
                    onChange={handleProblemChange}
                    className="form-input"
                />
                <textarea
                    name="constraints"
                    placeholder="Constraints (each constraint on a new line)"
                    value={problemData.constraints}
                    onChange={handleProblemChange}
                    className="form-textarea"
                ></textarea>
                <input
                    type="text"
                    name="input"
                    placeholder="Input Format"
                    value={problemData.input}
                    onChange={handleProblemChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="output"
                    placeholder="Output Format"
                    value={problemData.output}
                    onChange={handleProblemChange}
                    className="form-input"
                />
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
                    {problemData.hiddenTestCases.map((tc, index) => (
                        <li key={index}>
                            <strong>Input:</strong> {tc.input} <br />
                            <strong>Expected Output:</strong> {tc.expectedOutput}
                            <button type="button" onClick={() => deleteTestCase(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={addProblem} className="form-button">Add Problem</button>
                <button type="submit" className="form-button">Create Contest</button>
            </form>
        </div>
    );
};

export default CreateContest;

