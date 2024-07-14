import Contest from '../models/Contest.js';
import User from '../models/Users.js';
import Submission from '../models/Submission.js';
import axios from 'axios';
import { broadcastRankings } from '../index.js';

const COMPILER_URL = process.env.COMPILER_URL || 'http://localhost:3001/run'; // Default to localhost

export const validateSolution2 = async (req, res) => {
  const { language, code } = req.body;
  const { contestId, problemTitle } = req.params;

  console.log(`Validating solution for problem: ${problemTitle} in contest ID: ${contestId}`);

  if (!req.user) {
    console.error('User is not authenticated');
    return res.status(401).json({ success: false, message: 'User is not authenticated' });
  }

  try {
    const contest = await Contest.findById(contestId);
    if (!contest) {
      console.error(`Contest not found with ID: ${contestId}`);
      return res.status(404).json({ success: false, message: 'Contest not found' });
    }

    const problem = contest.problems.find(p => p.title === problemTitle);
    if (!problem) {
      console.error(`Problem not found with title: ${problemTitle} in contest ID: ${contestId}`);
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
        const response = await axios.post(COMPILER_URL, payload); // Use the environment variable
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
        } else {
          errorMessage = error.message || 'Unknown Error';
        }
        console.error(`Error executing code: ${errorMessage}`);
        return res.status(500).json({ success: false, message: errorMessage });
      }
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      // Check for existing passed submission
      const existingSubmission = await Submission.findOne({ userId, contestId, problemId: problem._id, result: 'Passed' });

      // Save the submission
      const submission = new Submission({
        userId: req.user.id,
        contestId,
        problemId: problem._id,
        language,
        solution: code,
        result: allTestsPassed ? 'Passed' : 'Failed',
        score: allTestsPassed && !existingSubmission ? problem.points : 0,
        submittedAt: new Date()
      });

      if (allTestsPassed && !existingSubmission) {
        // Update user contest score only if this is the first successful submission
        let userContestScore = user.contestScores.find(cs => cs.contestId.toString() === contestId);
        if (!userContestScore) {
          userContestScore = { contestId, score: 0, submittedAt: new Date() };
          user.contestScores.push(userContestScore);
        }

        userContestScore.score += problem.points;
        userContestScore.submittedAt = new Date();
        await user.save();
      }

      await submission.save();

      const updatedLeaderboard = await User.aggregate([
        {
          $project: {
            firstname: 1,
            lastname: 1,
            totalScore: { $add: ["$practiceScore", { $sum: "$contestScores.score" }] },
            lastSubmissionTime: { $max: "$contestScores.submittedAt" }
          }
        },
        { $sort: { totalScore: -1, lastSubmissionTime: 1 } }
      ]);

      broadcastRankings(updatedLeaderboard);

      return res.status(200).json({ success: allTestsPassed, message: allTestsPassed ? 'Accepted' : 'Rejected', testResults, submission });
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};


