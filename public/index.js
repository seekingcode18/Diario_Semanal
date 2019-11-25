$(document).ready(() => {
  $("textarea").on('input', (event) => {
    const textareaLength = $("textarea").val().length;
    $('.characterCount').html(`Remaining characters: ${2500 - textareaLength}`)
  });
  $('.preview__container').click(event => {
    console.log(event);
    const blogTitle = event.currentTarget.getAttribute('data-blog-title');
    fetch(`/blogPost/${blogTitle}`)
      .then(response => response.text())
       .then(response => console.log(response));
  })
});
