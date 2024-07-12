import Contest from '../models/Contest.js';

export const createContest = async (req, res) => {
    try {
      const { name, startDate, endDate, problems } = req.body;
      const contest = new Contest({
        name,
        startDate,
        endDate,
        problems,
        createdBy: req.user._id // Use the authenticated user's ID
      });
      await contest.save();
      res.status(201).json(contest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  };

 

  export const getContests = async (req, res) => {
    try {
      const now = new Date();
      const contests = await Contest.find().sort({ startDate: -1 });
  
      const categorizedContests = {
        upcoming: [],
        ongoing: [],
        ended: []
      };
  
      contests.forEach(contest => {
        if (now < contest.startDate) {
          categorizedContests.upcoming.push(contest);
        } else if (now >= contest.startDate && now <= contest.endDate) {
          categorizedContests.ongoing.push(contest);
        } else {
          categorizedContests.ended.push(contest);
        }
      });
  
      res.status(200).json(categorizedContests);
    } catch (error) {
      console.error('Error fetching contests:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  };
  
  

  export const getContestProblems = async (req, res) => {
    try {
      const contest = await Contest.findById(req.params.id);
      if (!contest) {
        return res.status(404).json({ error: 'Contest not found' });
      }
      const now = new Date();
      if (now < contest.startDate) {
        return res.status(403).json({ error: 'Contest has not started yet' });
      }
      // Remove the end time check to show ongoing contests
      res.json(contest.problems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
    
 
  export const getProblemDetails = async (req, res) => {
    try {
      const contest = await Contest.findById(req.params.contestId);
      if (!contest) {
        return res.status(404).json({ error: 'Contest not found' });
      }
      const problem = contest.problems.find(p => p.title === req.params.problemTitle);
      if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
      }
      res.json({ problem, contest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// controller/problemController.js

// controllers/contestController.js



import Submission from '../models/Submission.js';
import User from '../models/Users.js';

// Function to compute rankings based on submissions
export const getContestRankings = async (req, res) => {
  try {
    const { contestId } = req.params;

    // Fetch all submissions for the contest
    const submissions = await Submission.find({ contestId }).populate('userId').sort({ submittedAt: 1 });

    console.log('Fetched submissions:', submissions);

    // Compute the rankings based on total scores and submission times
    const rankings = submissions.reduce((acc, submission) => {
      const userId = submission.userId._id.toString();

      if (!acc[userId]) {
        acc[userId] = {
          user: submission.userId,
          totalScore: 0,
          submittedAt: submission.submittedAt
        };
      }

      acc[userId].totalScore += submission.score;
      acc[userId].submittedAt = Math.min(acc[userId].submittedAt, submission.submittedAt);
      return acc;
    }, {});

    const sortedRankings = Object.values(rankings).sort((a, b) => {
      if (b.totalScore === a.totalScore) {
        return a.submittedAt - b.submittedAt;
      }
      return b.totalScore - a.totalScore;
    });

    console.log('Computed rankings:', sortedRankings);

    res.json(sortedRankings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
export const updateContest = async (req, res) => {
  try {
    const { contestId } = req.params;
    const { name, startDate, endDate, problems } = req.body;

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ error: 'Contest not found' });
    }

    // Update the fields
    contest.name = name || contest.name;
    contest.startDate = startDate || contest.startDate;
    contest.endDate = endDate || contest.endDate;
    contest.problems = problems || contest.problems;

    await contest.save();

    res.status(200).json({
      message: "Contest updated successfully",
      contest
    });
  } catch (error) {
    console.error('Error updating contest:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
export const deleteContest = async (req, res) => {
  try {
      const { contestId } = req.params;

      const contest = await Contest.findById(contestId);
      if (!contest) {
          return res.status(404).json({ error: 'Contest not found' });
      }

      await Contest.deleteOne({ _id: contestId });

      res.status(200).json({ message: 'Contest deleted successfully!' });
  } catch (error) {
      console.error('Error deleting contest:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
  }
};
export const ContestsaveUserCode = async (req, res) => {
  const { contestId, problemTitle, language, code } = req.body;

  if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the code entry already exists
      let codeEntry = user.codes.find(c => 
          c.problemTitle === problemTitle && 
          c.language === language
      );

      if (codeEntry) {
          // Update the existing code entry
          codeEntry.code = code;
      } else {
          // Add a new code entry
          user.codes.push({ problemTitle, language, code });
      }

      await user.save();

      res.status(200).json({ message: 'Code saved successfully' });
  } catch (error) {
      console.error('Error saving user code:', error);
      res.status(500).json({ message: 'Server error', details: error.message });
  }
};

export const ContestgetUserCode = async (req, res) => {
  const { contestId, problemTitle } = req.params;
  const { language } = req.query;

  if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      const submission = user.codes.find(s => 
          s.problemTitle === problemTitle && 
          s.language === language
      );

      if (!submission) {
          return res.status(404).json({ message: 'No code found for this contest, problem, and language' });
      }

      res.status(200).json(submission);
  } catch (error) {
      console.error('Error fetching user code:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

  
