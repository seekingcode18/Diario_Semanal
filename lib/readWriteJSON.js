const fs = require("fs");
const write = (object) => {
    fs.writeFile('blogPost.json', JSON.stringify(object), 'utf8', (error) => {
        if (error) console.log(error);
    });
}
/*read json and assign it to the global variable, so we can use it sort it in reverse cronological order

 */
const displayAllPosts = (res) => {
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
        object.blogData.sort((a, b) => new Date(b.blogDate) - new Date(a.blogDate));
        //rendering handlebar templates for the homepage and sending a reference to the javascript file
        res.render('index', {
            js: 'index.js',
            post: object.blogData
        })
        //post is an array that the forEach is looping through in index.handlebars
    })
};
const handlePostData = (req, newBlogPost) => {
   fs.readFile('blogPost.json', 'utf8', (error, contents) => {
        if (error) throw error;
        const object = JSON.parse(contents);
        object.blogData.push(newBlogPost);
        write(object);
    })
};
const newComment = (req, newBlogPost) => {  fs.readFile('blogPost.json', 'utf8', (error, contents) => {
    if (error) throw error;
    const object = JSON.parse(contents);
    const newComment = {
        commentName: req.body.commentName,
        commentContent: req.body.commentContent
    };
    newBlogPost.comments.push(newComment); // write new comment to global var so it can be rendered immeditately
    let currentBlogPost = object.blogData.findIndex(post => post.blogTitle === req.body.blogTitle);
    object.blogData[currentBlogPost].comments.push(newComment);
    write(object);
})};
module.exports = {
    displayAllPosts,
    write,
    handlePostData,
    newComment
};