import mongoose from "mongoose";

const problemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
    },
      difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
      },
      topic: {
        type: String,
        
        required: true,
      }
});

const Problem=mongoose.model('problem',problemSchema)

export default Problem;