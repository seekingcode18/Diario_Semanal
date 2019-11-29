const express = require('express');
const app = express();
const port = process.env.PORT || 8080; //let heroku choose port; if it can't, default to 8080

// Import built-in node module to read and write files
const fs = require('fs');

//Import readWrite functionality for JSON from separate JS
const readWrite = require('./lib/readWriteJSON');

// const template = Handlebars.compile()
const Handlebars = require("express-handlebars");

//setting main.handlebars as our default layout
app.engine('handlebars', Handlebars({defaultLayout: 'main'}));

//handlebars view engine which tells the computer which way do we need to render the files
app.set('view engine', 'handlebars');
app.use('/', express.static('views'));
app.use('/', express.static('public'));

// let heroku know everything relates to the root folder
app.use(express.static(__dirname));

//lets us read the body of the url query (that's how we get req.body)
app.use(express.urlencoded({extended: false}));

// load favicon
app.use('/favicon.ico', express.static(__dirname + '/public/images/favicon.ico'));

//Made global variable so multiple routes have access to data stored
let newBlogPost;

// render index.handlebars on home root route with all posts, res is sent into displayAllPosts funciton so that we can render the index page
app.get('/', (req, res) => readWrite.displayAllPosts(res));

//Route to show newPost.handlebars
app.get('/newPost', (req, res) => res.render('newPost', {js: 'newPost.js', css: 'newPost.css'}));

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
    // replace all line breaks in the contents of the blog with br tags using regex (either r or n or both)
    blogContent: req.body.blogContent.replace(/\r?\n/g,'<br>'),
    //receiving gif url and title and passing it as an object ready to save into the global variable
    blogGif: JSON.parse(req.body.gifBuffer),
    //turn date into better formated date
    blogDate: new Date().toLocaleString(),
    comments: [],
    blogEmoji: {
      like: 0,
      laugh: 0,
      shocked: 0
    }
  }
  readWrite.handlePostData(req, newBlogPost);
  res.redirect('/showPost');
});

// Render / show new blog pages and insert blog post data from the global variable via handlebars. Since we only have the /showPost 
//route for every time we show a post, we need a global variable that we can access every time. We also send the respective js and css files. 

app.get('/showPost', (req, res) => {
  res.render('blogPost', {
    title: newBlogPost.blogTitle,
    author: newBlogPost.blogAuthor,
    content: newBlogPost.blogContent,
    date: newBlogPost.blogDate,
    gif: newBlogPost.blogGif,
    js: 'blogPost.js',
    css: 'blogPost.css',
    comment: newBlogPost.comments,
    emoji: newBlogPost.blogEmoji
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
  readWrite.newComment(req, newBlogPost);
  res.redirect('showPost');
});

app.post('/emoji', (req, res) =>{
  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if (error) throw error;
    const object = JSON.parse(contents);
    const currentBlogPost = object.blogData.findIndex(post => post.blogTitle === newBlogPost.blogTitle)
    if (req.body.emoji === 'like') {
      object.blogData[currentBlogPost].blogEmoji.like++;
    } else if (req.body.emoji === 'laugh'){
      object.blogData[currentBlogPost].blogEmoji.laugh++;
    } else {
      object.blogData[currentBlogPost].blogEmoji.shocked++;
    }
    readWrite.write(object);
  });
  //  204 - request has succeeded but the client doesn't need to leave the current page, but data is still sent.
  res.status(204).send();
})

app.get('*', (req,res, next) => {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
})
app.use( (err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).render('errorPage');
} )


app.listen(port, () => console.log('Listening on 8080'));