const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filePath, inputfilePath) => {
    return new Promise((resolve, reject) => {
        const jobId = path.basename(filePath).split(".")[0];
        const className = `MainClass_${jobId.replace(/-/g, '')}`;
        const newFilePath = path.join(path.dirname(filePath), `${className}.java`);

        // Read the file content and replace the class name
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const updatedFileContent = fileContent.replace(/class\s+\w+/, `class ${className}`);
        fs.writeFileSync(newFilePath, updatedFileContent);

        const compileCommand = `javac "${newFilePath}" -d "${outputPath}"`;
        const executeCommand = `java -cp "${outputPath}" ${className} < "${inputfilePath}"`;

        exec(compileCommand, { timeout: 5000, maxBuffer: 1024 * 1024 * 50 }, (error, stdout, stderr) => {
            if (error) {
                return reject(`Compilation Error: ${error.message}`);
            }
            if (stderr) {
                return reject(`Compilation Error: ${stderr}`);
            }

            exec(executeCommand, { timeout: 5000, maxBuffer: 1024 * 1024 * 50 }, (error, stdout, stderr) => {
                if (error) {
                    if (error.signal === 'SIGTERM') {
                        return reject("TIME LIMIT EXCEEDED");
                    }
                    if (error.signal === 'SIGKILL') {
                        return reject("MEMORY LIMIT EXCEEDED");
                    }
                    return reject(`Execution Error: ${error.message}`);
                }
                if (stderr) {
                    return reject(`Execution Error: ${stderr}`);
                }
                resolve(stdout);
            });
        });
    });
};

module.exports = {
    executeJava
};
