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

app.get('/blogPost/:title', (req, res) => {
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if(error) throw error;
    const title = req.params.title;
    const object = JSON.parse(contents);
    const currentPost = object.blogData.find(post => post.blogTitle === title);
    res.send(currentPost);
  });
})

app.get('/newPost', (req, res) => {
  res.sendFile(__dirname + '/views/newPost.html')
});

app.post('/publishPost', (req, res)=>{
  const blogAuthor = req.body.blogAuthor;
  const blogTitle = req.body.blogTitle;
  const blogContent = req.body.blogContent;
  const blogDate = new Date(Date.now());
  const data = {
    blogAuthor,
    blogTitle,
    blogContent,
    blogDate
  } 
  newBlogPost = data;
  res.redirect('/blogData')
});

let newBlogPost;

app.get('/blogData', (req, res) => {
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if(error) throw error;
    const object = JSON.parse(contents);
    object.blogData.push(newBlogPost);
    const json = JSON.stringify(object);
    fs.writeFile('blogPost.json', json, 'utf8', (error)=>{
      if(error){
        console.log(error);
      } 
    });
  });
  res.redirect('/fetchData');
});

app.get('/fetchData', (req, res) => {
    
    res.sendFile(__dirname +  '/views/blogPost.html')

  })

app.listen(port, () => console.log('Listening on 8080'));
