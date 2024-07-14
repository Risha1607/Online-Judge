const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePy = (filePath, inputfilePath) => {
    return new Promise((resolve, reject) => {
        const command = `python "${filePath}" < "${inputfilePath}"`;

        exec(command, { timeout: 3000, maxBuffer: 1024*1024*50 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Exec Error:', error); 
                if (error.killed) {
                    if (error.signal === 'SIGTERM') {
                        return reject("TIME LIMIT EXCEEDED");
                    }
                    if (error.signal === 'SIGKILL') {
                        return reject("MEMORY LIMIT EXCEEDED");
                    }
                }
                return reject(`RUNTIME_ERROR: ${error.message}`);
            }
            if (stderr) {
                return reject(`RUNTIME_ERROR: ${stderr}`);
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    executePy
};

