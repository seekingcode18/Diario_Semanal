
# Diario Semanal

## Overview
This was a project we completed for the Futureproof bootcamp. We had 4 days to create an anonymous blogging website that included reactions, posting


## User Stories
* As a user, so I can read and write blog posts, I would like a website for this.  
* As a user, so I can write a blog, I want to be directed to a page where I can do so.  
* As a user, so I can decorate my blog, I want to be able to insert a GIF into my posts.  
* As a user, so I can read other people’s blogs as well as my own, I want to find them easily altogether on one page.  
* As a user, so I can express my thoughts on other people’s posts, I want to be able to comment on them.  
* As a user, so I can simply express my feelings on other people’s posts, I want to be able to select reaction emojis from a few choices.  
* As a user, so I can have a consistent user experience, I want to see the same content if I exit and reload the page.  
* As a user, I can visit the website and post a blog within a given word limit.  
* As a user, when I encounter an error I want to see an error page consistent in formatting as the rest of the website, as not to ruin my user experience.   
  

# Screenshots: 
###### homepage
![homepage](/homePage.jpg) 

###### new post
![nepost](/newPost.jpg) 

###### blog post
![blopost](/blogPost.jpg) 


## Functionality:  
* When they click on a new post, take them to a new page to write a post.  
* Implementing a word count on the inputs (newPost and newComment).   
* Save data and send to JSON file.   
* API calls to Giphy and loading GIF into a post.  
* Write and view comments.  
* Emoji reacts, similar to FB format.     
* Responsive webpage --> Breakpoints (Phone, Tablet, PC, XL screen).  


## Technologies
* Handlebars templates
* Node / Express + JSON
* GitHub for version control (commit messages in present tense)
* VS Code


## Team routine
* Stand-ups at 9:15
* We commit in the present tense
* We review and resolve issues as they come up
* Retros at 5
* We have chocolate and sweets to motivate us
* Driver - Navigator, 30 min code rotation, 10 min break per change in between
* BEM for naming CSS classes
* Refactoring and commenting code at the end of the day


## Challenges
* We didn't refactor as frequently as we should, so ended up with large files that we couldn't split because of dependencies
* Working with async with ```fs.writeFile``` and ```fs.readFile```
* Inserting data into templates (solved using Handlebars)
* Updating both the frontend and the database when a user reacts to a post


## Reflections
This was an enjoyable project to work on because we were able to refine our skills. We found that planning was very important so we knew which user stories to work on. In order to ensure that all of the team had a good understanding of the whole codebase, we spent the last 30 minutes of each day, reviewing that day's code, explaining it to each other, and writing comments for future reference.

If we had more time, we would like to implement the following:
* sort blog entries by author or title
* search for blog posts by keywords in their content
* add user authentication so posts can be identified
* edit my existing blog posts
