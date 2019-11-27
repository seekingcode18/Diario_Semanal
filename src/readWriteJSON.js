const fs = require("fs");
module.exports = {
    read: function(){
        return fs.readFile('blogPost.json', 'utf8', (error, contents) => {
            if(error) throw error;
            return object = JSON.parse(contents);
        })
    },
    prepHomePosts: function(object){
        newBlogPost = {
            blogAuthor: object.blogAuthor,
            blogTitle: object.blogTitle,
            blogContent: object.blogContent,
            blogDate: object.date
        }
    },
    insertNewBlog: function(req){
        const parsedJSON = this.read();
    },
    write: function(object){
        fs.writeFile('blogPost.json', JSON.stringify(object), 'utf8', (error) => {
          if (error) console.log(error);
        });
    }
}
