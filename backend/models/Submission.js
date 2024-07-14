import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
    required: false, 
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'problem', 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    enum: ['Passed', 'Failed'],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
