import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
    required: false, // Make it optional for practice problems
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'problem', // Use the Problem model directly for practice problems
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
