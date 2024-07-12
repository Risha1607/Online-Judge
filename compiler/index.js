const express = require('express');
const { generateFile } = require("./generateFile.js");
const { generateInputFile } = require("./generateInputFile.js");
const cors = require('cors');
const { executeCpp } = require("./executeCpp.js");
const { executePy } = require("./executePy.js");
const { executeJava } = require("./executeJava.js");
const rateLimit = require('express-rate-limit');

const app = express();

// Set up rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ online: "compiler" });
});

app.post("/run", async (req, res) => {
    const { language = 'cpp', code, input } = req.body;
    if (code === undefined) {
        return res.status(400).json({ success: false, message: "Empty code body" });
    }
    try {
        const filePath = await generateFile(language, code);
        const inputfilePath = await generateInputFile(input);
        let output;
        if (language === 'cpp') {
            output = await executeCpp(filePath, inputfilePath);
        } else if (language === 'py') {
            output = await executePy(filePath, inputfilePath);
        } else if (language === 'java') {
            output = await executeJava(filePath, inputfilePath);
        } else {
            return res.status(400).json({ success: false, message: "Unsupported language" });
        }
        res.send({ filePath, inputfilePath, output });
    } catch (error) {
        console.error('Error caught in Express route:', error);
        let userFriendlyMessage;
        if (error === "TIME LIMIT EXCEEDED") {
            userFriendlyMessage = "TIME LIMIT EXCEEDED.";
        } else if (error === "MEMORY LIMIT EXCEEDED") {
            userFriendlyMessage = "MEMORY LIMIT EXCEEDED.";
        } else if (error.startsWith("RUNTIME_ERROR")) {
            userFriendlyMessage = error;
        } else {
            userFriendlyMessage = "Runtime Error: An error occurred while executing your code.";
        }
        res.status(500).json({ success: false, message: userFriendlyMessage });
    }
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001!");
});
