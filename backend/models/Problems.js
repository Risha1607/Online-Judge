import mongoose from "mongoose";
const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
    },
    expectedOutput: {
        type: String,
        required: true,
    }
});

const problemSchema=new mongoose.Schema({

      title: {
          type: String,
          required: true
      },
      description: {
          type: String,
          required: true
      },
      difficulty: {
          type: String,
          required: true
      },
      topic: {
          type: String,
          required: true
      },
      constraints: {
          type: [String],
          required: true
      },
      input: {
          type: String,
          required: true
      },
      output: {
          type: String,
          required: true
      },
      example: {
          type: String,
          required: true
      },
      hiddenTestCases: [testCaseSchema],
  });
  
 
  

const Problem=mongoose.model('problem',problemSchema)

export default Problem;