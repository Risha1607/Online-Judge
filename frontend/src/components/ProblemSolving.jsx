import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css';
import './ProblemSolving.css';
import { AuthContext } from '../context/AuthContext';
import { debounce } from '../utils/debounce';
import CountdownTimer from './CountdownTimer';
import { BiAlarm } from "react-icons/bi";

const defaultBoilerplate = {
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}',
  py: 'def main():\n    # your code here\n\nif __name__ == "__main__":\n    main()',
  java: 'public class Main {\n    public static void main(String[] args) {\n        // your code here\n    }\n}',
};

const ProblemSolving = () => {
  const { contestId, problemTitle } = useParams();
  const { user } = useContext(AuthContext);
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState(defaultBoilerplate['cpp']); 
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contests/${contestId}/problem/${problemTitle}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.problem && response.data.contest) {
          setProblem(response.data.problem);
          setEndTime(response.data.contest.endDate);
        } else {
          setError('Problem or contest data is missing in the response');
        }
      } catch (error) {
        console.error('Error fetching problem:', error);
        setError('Error fetching problem or contest');
      }
    };
    fetchProblem();
  }, [contestId, problemTitle]);

  useEffect(() => {
    const fetchUserCode = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-contest-code/${contestId}/${problemTitle}?language=${language}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCode(response.data.code || defaultBoilerplate[language]);
      } catch (error) {
        console.error('Error fetching user code:', error);
        setError('Error fetching user code');
      }
    };
    fetchUserCode();
  }, [contestId, problemTitle, language]);

  useEffect(() => {
    const debouncedSave = debounce(async (code) => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }
      try {
        const payload = {
          contestId,
          problemTitle,
          language,
          code,
        };
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/save-contest-code`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage('');
      } catch (error) {
        console.error('Error saving user code:', error);
        setMessage('');
      }
    }, 1000);
    if (code) {
      debouncedSave(code);
    }
  }, [code, contestId, problemTitle, language]);

  const handleRun = async () => {
    setMessage('');
    const payload = {
      language,
      code,
      input
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_COMPILER_URL}/run`, payload);
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error running code:', error);
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes('TIME LIMIT EXCEEDED')) {
        setOutput('Time Limit Exceeded');
      } else if (errorMessage.includes('MEMORY LIMIT EXCEEDED')) {
        setOutput('Memory Limit Exceeded');
      } else {
        setOutput(` ${errorMessage}`);
      }
    }
  };

  const handleSubmit = async () => {
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contests/${contestId}/problem/${problemTitle}/submit`,
        {
          language,
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage('Accepted');
      } else {
        const detailedMessage = response.data.message || 'Some test cases failed';
        setMessage(`Rejected: ${detailedMessage}`);
      }
    } catch (err) {
      console.error('Error submitting solution:', err);
      const errorMessage = err.response?.data?.message || 'Runtime Error';
      setMessage(errorMessage);
    }
    setOutput(''); // Clear output after submission
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(defaultBoilerplate[selectedLanguage]);
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  const renderWithNewlines = (text) => {
    return { __html: text.replace(/\n/g, '<br>') };
  };

  const handleContestEnd = () => {
    alert('Contest has ended. No more submissions are accepted.');
  };

  return (
    <div className="problem-details-page">
      {endTime && 
        <div className="timer-container">
          <BiAlarm size={24} />
          <CountdownTimer endTime={endTime} onEnd={handleContestEnd} />
        </div>
      }
      <div className="problem-description box">
        <h2>{problem.title}</h2>
        <p dangerouslySetInnerHTML={renderWithNewlines(problem.description)} />
        <h3>Constraints:</h3>
        <ul>
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
        <h3>Input:</h3>
        <p>{problem.input}</p>
        <h3>Output:</h3>
        <p>{problem.output}</p>
        <h3>Example:</h3>
        <div className="example-box">
          <pre>{problem.example}</pre>
        </div>
      </div>
      <div className="code-editor box">
        <select value={language} onChange={handleLanguageChange}>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages[language] || languages.clike)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '5px',
            minHeight: '300px',
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '10px',
          }}
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here"
          style={{
            width: '100%',
            height: '100px',
            marginTop: '10px',
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '5px',
            padding: '10px',
            boxSizing: 'border-box',
            marginBottom: '10px',
          }}
        />
        <button onClick={handleRun} style={{ marginRight: '10px' }}>Run</button>
        <button onClick={handleSubmit}>Submit</button>
        <div className="output">
          <h3>{message ? 'Verdict' : 'Output'}</h3>
          <pre>{message || output}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolving;
