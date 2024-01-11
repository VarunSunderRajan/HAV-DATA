const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.get('/api/news', (req, res) => {
  const pythonProcess = spawn('python', ['newsapi.py']);

  pythonProcess.stdout.on('data', (data) => {
    res.json({ result: data.toString() });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});