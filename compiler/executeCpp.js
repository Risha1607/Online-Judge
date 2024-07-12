const fs = require('fs');
const path = require('path');
const { exec, execFile } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inputfilePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const filename = `${jobId}.exe`;
    const outPath = path.join(outputPath, filename);

    return new Promise((resolve, reject) => {
        const compileCommand = `g++ "${filePath}" -o "${outPath}"`;
        const executeCommand = `.\\${filename} < "${inputfilePath}"`;

        exec(compileCommand, (error, stdout, stderr) => {
            if (error) {
                return reject({ type: 'compilation', error: error.message });
            }
            if (stderr) {
                return reject({ type: 'compilation', error: stderr });
            }

            exec(`cd "${outputPath}" && ${executeCommand}`, { timeout: 5000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
                if (error) {
                    if (error.signal === 'SIGTERM' || error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') {
                        return reject({ type: 'memory', error: 'Memory Limit Exceeded' });
                    }
                    if (error.signal === 'SIGKILL') {
                        return reject({ type: 'time', error: 'Time Limit Exceeded' });
                    }
                    return reject({ type: 'execution', error: error.message });
                }
                if (stderr) {
                    return reject({ type: 'execution', error: stderr });
                }
                resolve(stdout);
            });
        });
    });
};

module.exports = {
    executeCpp
};

