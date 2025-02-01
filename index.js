const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/bd2', (req, res) => {
  res.send('this is bd2');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
