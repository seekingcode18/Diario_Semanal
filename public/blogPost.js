$(document).ready(() => {
    /*
    Click event that will trigger when any of the posts are clicked which will 
    send title of the clicked on post to the route /blogpost which will search
    the JSON and send the user to the matching post/
    */
  
    //We are currently only receiving the data and yet to send to another page
    $.get( '/blogPost/First%20post');
    //function () {
    // //   console.log(event);
    //   const blogTitle = window.location.pathname;
    //   fetch(`/blogPost/${blogTitle}`)
    //     .then(response => response.text())
    //      .then(response => console.log(response));
    // })


  });