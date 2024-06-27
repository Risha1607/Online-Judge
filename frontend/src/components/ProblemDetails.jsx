import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css';

const ProblemDetailsPage = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    setOutput('');

    // Simulating a delay as if we're calling a backend service
    setTimeout(() => {
      try {
        // Mock output - in real scenario, replace this with actual API call
        const mockOutput = `Simulated output for the ${language} code:\n\n${code}`;
        setOutput(mockOutput);
      } catch (err) {
        setError('An error occurred while executing the code.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">AlgoU Online Code Compiler</h1>
      <select
        className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500"
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
      </select>
      <br />
      <div
        className="bg-gray-100 shadow-md w-full max-w-lg mb-4"
        style={{ height: '300px', overflowY: 'auto' }}
      >
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages[language], language)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: 'none',
            border: 'none',
            backgroundColor: '#f7fafc',
            height: '100%',
            overflowY: 'auto',
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 me-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
        Run
      </button>

      {loading && <div>Loading...</div>}

      {error && (
        <div className="error mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {output && (
        <div className="outputbox mt-4 bg-gray-100 rounded-md shadow-md p-4">
          <p
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          >
            {output}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProblemDetailsPage;
