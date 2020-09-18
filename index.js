const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Express - Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});