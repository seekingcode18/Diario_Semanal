const express = require('express');
const app = express();
const port = 8080;
const readWrite = require('./public/readWriteJSON');

// const template = Handlebars.compile()
const Handlebars = require("express-handlebars");

// Import built-in node module to read and write files
const fs = require('fs');

app.engine('handlebars', Handlebars({
  defaultLayout: 'main'
}));

//handlebars view engine which tells the computer which way do we need to render the files 
app.set('view engine', 'handlebars');
app.use('/', express.static('public'));
app.use('/', express.static('views'));
app.use(express.urlencoded({
  extended: false
}));

// render index.handlebars on home root route
/*read json and assign it to the global variable, so we can use it sort it in reverse cronological order

 */
app.get('/', (req, res) => {
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if (error) throw error;
    const object = JSON.parse(contents);
    newBlogPost = {
      blogAuthor: object.blogAuthor,
      blogTitle: object.blogTitle,
      blogContent: object.blogContent,
      blogDate: object.date
    }
    //putting date in reverse chronological order
    object.blogData.sort((a, b) => {
      return new Date(b.blogDate) - new Date(a.blogDate);
    });
    //rendering handlebar templates for the homepage and sending a reference to the javascript file
    res.render('index', {
      js: 'index.js',
      //post is an array that the forEach is looping through in index.handlebars
      post: object.blogData
    })
  });
});

//Route to show newPost.handlebars
app.get('/newPost', (req, res) => res.render('newPost', {js: 'newPost.js'}));

//Made global variable so multiple routes have access to data stored
let newBlogPost;



/*
When the new blog is submitted, the data is stored in a global variable
After the data from the form is assigned to the global variable
Turns JSON file into object, push new data into the array inside the object and
then turn it back into a string and overwrite the JSON file. Then we redirect
to /showPost
*/
app.post('/publishPost', (req, res) => {
  newBlogPost = {
    blogAuthor: req.body.blogAuthor,
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
    blogGif: req.body.gifBuffer,
    blogDate: new Date(),
    comments: []
  }
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if (error) throw error;
    const object = JSON.parse(contents);
    object.blogData.push(newBlogPost);
    const json = JSON.stringify(object);
    fs.writeFile('blogPost.json', json, 'utf8', (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
  res.redirect('/showPost');
});

// Render / show new blog pages and insert blog post data from the global variable via handlebars
app.get('/showPost', (req, res) => {
  res.render('blogPost', {
    title: newBlogPost.blogTitle,
    author: newBlogPost.blogAuthor,
    content: newBlogPost.blogContent,
    date: newBlogPost.blogDate,
    gif: newBlogPost.blogGif,
    js: 'blogPost.js',
    comment: newBlogPost.comments
  })
});

/*
Tracking submitted posts by title. Matching title is found in JSON file and sent
to write onto index.handlebars through index.js. If user types in this path into the url it will redirect 
them to the corresponding post page without errors. 
Have yet to implement defensive programming when user looks for a title that doesn't exist.
*/
app.get('/blogPost/:title', (req, res) => {
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if (error) throw error;
    const title = req.params.title;
    const object = JSON.parse(contents);
    newBlogPost = object.blogData.find(post => post.blogTitle === title);
    res.redirect('/showPost');
  });
});
/* read the json and turn contents into object, then get the comment from the form data and assign it to new comment object. 
We then push the new comment object into the global variable comments array inside it. 
  */ 
app.post('/writeComment', (req, res) => {
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if (error) throw error;
    const object = JSON.parse(contents);
    const newComment = {
      commentName: req.body.commentName,
      commentContent: req.body.commentContent
    };
    newBlogPost.comments.push(newComment); // write new comment to global var so it can be rendered immeditately
    let currentBlogPost = object.blogData.findIndex(post => post.blogTitle === req.body.blogTitle);
    object.blogData[currentBlogPost].comments.push(newComment);
    const json = JSON.stringify(object);
    fs.writeFile('blogPost.json', json, 'utf8', (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
  res.redirect('showPost');
});

app.listen(port, () => console.log('Listening on 8080'));