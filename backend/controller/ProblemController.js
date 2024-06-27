import Problem from '../models/Problems.js';


export const createProblem=async(req,res)=>{
    try{
        const{title,description,difficulty,topic}=req.body;
        if (!(title && description && difficulty && topic)){
            return res.status(400).send("Please fill all required details");
        }
        const existingProblem = await Problem.findOne({ title });

        if (existingProblem){
            return res.status(400).send("Problem already exists!");
        }
        const problem = await Problem.create({
           title,
           description,
           difficulty,
           topic
        });

        res.status(201).json({
            message: "Problem Successfully created!",
            problem,
            
        });
    }
    catch(error){
        console.log("error while creating Problem",error.message);


    }
}
export const deleteProblem=async(req,res)=>{
    try{
        const { problemId } = req.params;

        
        const problem = await Problem.findById(problemId);
       
        if(!problem){
            return res.status(401).send("Problem does not exist!")
        }
        await Problem.findByIdAndDelete(problemId);


        res.status(200).json({
            message: "Problem deleted successfully!"
        });
    }
    catch(error){
        console.log("Error while deleting Problem",error.message);
        res.status(500).send("Server error");
    }
}

export const updateProblem= async(req,res)=>{
    try{
        const {problemId}= req.params;
        const {title,description,difficulty}=req.body;
        const problem=await Problem.findById(problemId);
        if(!problem){
            return res.status(401).send("Problem does not exist")
        }
        problem.title=title || problem.title;
        problem.description = description || problem.description;
        problem.difficulty = difficulty || problem.difficulty;

        await problem.save();

        res.status(200).json({
            message:"Problem has been updated successfully",
            problem

        });



    }
    catch(error){
        console.log("Error while updating Problem",error.message)

    }
}

export const getProblems=async (req,res) =>{
    try {
        const problems = await Problem.find({});
        res.status(200).json(problems);
    } catch (error) {
        console.log("Error while getting problems", error.message);
}}


export const getProblembyId=async(req,res)=>{
    try{
        const {problemId}=req.params;
        const problem=await Problem.findById(problemId);
        if(!problem){
            return res.status(401).send("Problem does not exist")
        }
        res.status(200).json(problem);

    }
    catch(error){
        console.log("Error while getting the problem",error.message)

    }
}
export const getProblemsByTopic = async (req, res) => {
    try {
        const { topicKey } = req.params;
        console.log(`Fetching problems for topic: ${topicKey}`);
        const problems = await Problem.find({ topic: topicKey });
        console.log(`Problems found: ${problems}`);
        res.status(200).json(problems);
    } catch (error) {
        console.log("Error while getting problems by topic", error.message);
        res.status(500).send("Server error");
    }
};
