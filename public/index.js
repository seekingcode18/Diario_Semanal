$(document).ready(() => {
//   /*
//   Click event that will trigger when any of the posts are clicked which will 
//   send title of the clicked on post to the route /blogpost which will search
//   the JSON and send the user to the matching post/ redirects you to the clicked post
//   */
$('.preview__container').click(event => {
  console.log(event);
    const blogTitle = event.currentTarget.getAttribute('data-blog-title');
    window.location.href = `/blogPost/${blogTitle}`
  })
});
