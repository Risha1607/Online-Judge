import express from 'express';
import { RegisterUser, LoginUser, getUserCode, saveUserCode, getUserData, getProfileData } from '../controller/Authentication.js';
const router = express.Router();
import { createProblem, deleteProblem, updateProblem, getProblems, getProblembyId, getProblemsByTopic, getLeaderboard } from '../controller/ProblemController.js';
import { validateSolution } from '../controller/validateSolutions.js';
import { validateSolution2 } from '../controller/validateSolutions2.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js'; 
import { getContests, createContest, getContestProblems, getProblemDetails, getContestRankings, deleteContest, updateContest, ContestsaveUserCode,ContestgetUserCode,} from '../controller/contestController.js';

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.get('/auth/user', authMiddleware, getUserData);
router.get('/leaderboard', getLeaderboard);

router.post("/problems", authMiddleware, isAdmin, createProblem);
router.put("/problems/:problemId", authMiddleware, isAdmin, updateProblem);
router.get("/problems/:problemId", getProblembyId);
router.get('/problems', getProblems);
router.delete("/problems/:problemId", authMiddleware, isAdmin, deleteProblem);
router.get('/problems/topic/:topicKey', getProblemsByTopic);
router.post('/problems/:problemId/validate', authMiddleware, validateSolution);

router.post('/api/save-code', authMiddleware, saveUserCode);
router.get('/api/get-code/:problemId', authMiddleware, getUserCode);


router.post('/contests', authMiddleware, isAdmin, createContest);
router.get('/contests', getContests);
router.get('/contests/:id/problems', getContestProblems);
router.get('/contests/:contestId/rankings', authMiddleware, getContestRankings);
router.delete('/contests/:contestId', authMiddleware, isAdmin, deleteContest);
router.put('/contests/:contestId', authMiddleware, isAdmin, updateContest);

router.post('/contests/:contestId/problem/:problemTitle/submit', authMiddleware, validateSolution2);
router.get('/contests/:contestId/problem/:problemTitle', authMiddleware, getProblemDetails);


router.get('/profile', authMiddleware, getProfileData);
router.post("/api/save-contest-code", authMiddleware,ContestsaveUserCode);
router.get("/api/get-contest-code/:contestId/:problemTitle", authMiddleware,ContestgetUserCode);


export default router;
