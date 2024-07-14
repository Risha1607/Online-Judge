import Problem from '../models/Problems.js';
import User from '../models/Users.js';
import Submission from '../models/Submission.js';
import axios from 'axios';

const COMPILER_URL = process.env.COMPILER_URL || 'http://localhost:3001/run'; // Default to localhost

export const validateSolution = async (req, res) => {
  const { language, code } = req.body;
  const { problemId } = req.params;

  console.log(`Validating solution for problem ID: ${problemId}`);

  if (!req.user) {
    console.error('User is not authenticated');
    return res.status(401).json({ success: false, message: 'User is not authenticated' });
  }

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      console.error(`Problem not found with id: ${problemId}`);
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    let allTestsPassed = true;
    let testResults = [];

    for (const testCase of problem.hiddenTestCases) {
      try {
        const payload = {
          language,
          code,
          input: testCase.input
        };

        console.log(`Sending payload to compiler: ${JSON.stringify(payload)}`);
        const response = await axios.post(COMPILER_URL, payload, { timeout: 10000 }); // Use the environment variable
        const output = response.data.output.trim();
        const expectedOutput = testCase.expectedOutput.trim();

        console.log(`Received output: ${output}`);
        console.log(`Expected output: ${expectedOutput}`);

        if (output !== expectedOutput) {
          allTestsPassed = false;
        }

        testResults.push({
          input: testCase.input,
          output,
          expectedOutput
        });
      } catch (error) {
        let errorMessage = 'Unknown Error';
        if (error.response && error.response.data && error.response.data.message) {
          if (error.response.data.message.includes("TIME LIMIT EXCEEDED")) {
            errorMessage = "Time Limit Exceeded";
          } else if (error.response.data.message.includes("MEMORY LIMIT EXCEEDED")) {
            errorMessage = "Memory Limit Exceeded";
          } else {
            errorMessage = "Runtime Error";
          }
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = "Request Timeout";
        } else {
          errorMessage = error.message || 'Unknown Error';
        }
        console.error(`Error executing code: ${errorMessage}`, error);
        return res.status(500).json({ success: false, message: errorMessage });
      }
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      const existingSubmission = await Submission.findOne({ userId, problemId, contestId: null, result: 'Passed' });

      const submission = new Submission({
        userId,
        problemId,
        contestId: null,
        language,
        solution: code,
        result: allTestsPassed ? 'Passed' : 'Failed',
        score: allTestsPassed && !existingSubmission ? getPoints(problem.difficulty) : 0,
      });

      if (allTestsPassed && !existingSubmission) {
        user.practiceScore += getPoints(problem.difficulty);
      }

      await submission.save();
      await user.save();
    }

    return res.status(200).json({ success: allTestsPassed, message: allTestsPassed ? 'Accepted' : 'Rejected', testResults });
  } catch (error) {
    console.error(`Server error: ${error.message}`, error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getPoints = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 100;
    case 'medium':
      return 200;
    case 'hard':
      return 300;
    default:
      return 0;
  }
};
