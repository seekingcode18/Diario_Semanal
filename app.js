const express = require('express');
const app = express();
const port = 8080;
const readWrite = require('./public/readWriteJSON');
const Handlebars = require ("express-handlebars");
// const template = Handlebars.compile()
// Import built-in node module to read and write files
const fs = require('fs'); 
app.engine('handlebars', Handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/', express.static('public'));
app.use('/', express.static('views'));
app.use(express.urlencoded({extended: false}));

// render index.handlebars on home root route
app.get('/', (req, res) => {
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if(error) throw error;
    const object = JSON.parse(contents);
    newBlogPost = {
      blogAuthor : object.blogAuthor,
      blogTitle: object.blogTitle,
      blogContent: object.blogContent,
      blogDate: object.date
    }
    });
  res.render('index', {js: 'index.js'})
});

//Route to show newPost.html
app.get('/newPost', (req, res) => res.sendFile(__dirname + '/views/html/newPost.html'));

//Made global variable so multiple routes have access to data stored
let newBlogPost;

// global variable to handle JS files
let js;

/*
When the new blog is submitted, the data is stored in a global variable
After the data from the form is assigned to the global variable
Turns JSON file into object, push new data into the array inside the object and
then turn it back into a string and overwrite the JSON file. Then we redirect
to /showPost
*/
app.post('/publishPost', (req, res)=>{
  newBlogPost = {
    blogAuthor : req.body.blogAuthor,
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
    blogDate: new Date()
  }
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
  res.redirect('/showPost');
});



// Render / show new blog pages and insert blog post data via handlebars
app.get('/showPost', (req, res) => {
  res.render('blogPost', {
    title: newBlogPost.blogTitle,
    author: newBlogPost.blogAuthor,
    content: newBlogPost.blogContent,
    date: newBlogPost.blogDate
  })
});

/*
How we are tracking posts that we want to access and how the user after submitting
a post will see their post posted. Matching title is found in JSON file and sent
to write onto index.html through index.js
*/
app.get('/blogPost/:title', (req, res) => {
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if(error) throw error;
    const title = req.params.title;
    const object = JSON.parse(contents);
    newBlogPost = object.blogData.find(post => post.blogTitle === title);
    res.redirect('/showPost');
  });
})

app.listen(port, () => console.log('Listening on 8080'));
