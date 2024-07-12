.problem-details-page {
    display: flex;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
}

.problem-description,
.code-editor {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    color: black; /* Ensure text is visible */
}

.problem-description.box,
.code-editor.box {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100%;
    overflow-y: auto;
}

textarea {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    font-family: 'Fira code', 'Fira Mono', monospace;
    font-size: 12px;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
}
