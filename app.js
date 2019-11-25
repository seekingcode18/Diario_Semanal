const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');

app.use('/', express.static('public'));
app.use('/', express.static('views'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('index')
});

app.get('/newPost', (req, res) => {
  res.sendFile(__dirname + '/views/newPost.html')
});

app.post('/publishPost', (req, res)=>{
  const blogAuthor = req.body.blogAuthor;
  const blogTitle = req.body.blogTitle;
  const blogContent = req.body.blogContent;
  const blogDate = new Date(Date.now());
  console.log(blogDate);
  const data = {
    blogAuthor,
    blogTitle,
    blogContent,
    blogDate
  }
  // fs.writeFile('blogPost.json', JSON.stringify(data), (error)=>{
  //   if(error) throw error;
  //   console.log("Data written to file.");
  // });
});

app.listen(port, () => console.log('Listening on 8080'));
