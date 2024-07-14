const express = require('express');
const { generateFile } = require("./generateFile.js");
const { generateInputFile } = require("./generateInputFile.js");
const cors = require('cors');
const { executeCpp } = require("./executeCpp.js");
const { executePy } = require("./executePy.js");
const { executeJava } = require("./executeJava.js");
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'http://backend1:8000'], // Add the backend service's Docker container name
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ online: "compiler" });
});

app.post("/run", async (req, res) => {
    const { language = 'cpp', code, input } = req.body;
    if (!code) {
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

        // Cleanup temporary files
        fs.unlinkSync(filePath);
        fs.unlinkSync(inputfilePath);
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
