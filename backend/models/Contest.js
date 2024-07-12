import mongoose from 'mongoose';

const hiddenTestCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
});

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number,
  constraints: [String],
  input: String,
  output: String,
  example: String,
  hiddenTestCases: [hiddenTestCaseSchema],
});

const contestSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  problems: [problemSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Contest', contestSchema);
