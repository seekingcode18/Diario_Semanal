const express = require('express');
const app = express();
const port = 8080;

app.use('/', express.static('public'));
app.use('/', express.static('views'));

app.get('/', (req, res) => {
  res.send('index')
});

app.get('/newPost', (req, res) => {
  res.sendFile(__dirname + '/views/newPost.html')
});

app.listen(port, () => console.log('Listening on 8080'));
