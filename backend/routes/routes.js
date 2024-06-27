import express from 'express';
import { RegisterUser,LoginUser } from '../controller/Authentication.js';
const router = express.Router();
import { createProblem,deleteProblem,updateProblem,getProblems, getProblembyId, getProblemsByTopic} from '../controller/ProblemController.js'


router.post("/register",RegisterUser);
router.post("/login",LoginUser);



router.post("/problems",createProblem);
router.put("/problems/:problemId",updateProblem);
router.get("/problems/:problemId",getProblembyId);
router.get('/problems', getProblems);
router.delete("/problems/:problemId",deleteProblem);
router.get('/problems/topic/:topicKey', getProblemsByTopic);




export default router;