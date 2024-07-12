// models/User.js
import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    problemTitle: {
        type: String
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

// Add custom validation to ensure either problemId or problemTitle is provided
codeSchema.pre('validate', function (next) {
    if (!this.problemId && !this.problemTitle) {
        next(new Error('Either problemId or problemTitle is required'));
    } else {
        next();
    }
});

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    practiceScore: {
        type: Number,
        default: 0
    },
    contestScores: [
        {
            contestId: mongoose.Schema.Types.ObjectId,
            score: Number,
            submittedAt: Date
        }
    ],
    codes: [codeSchema]
});

const User = mongoose.model('User', userSchema);

export default User;



