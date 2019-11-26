$(document).ready(() => {
  /* Implementing a character count system for text area in index.html*/
  $("textarea").on('input', (event) => {
      const textareaLength = $("textarea").val().length;
      $('.characterCount').html(`Remaining characters: ${200 - textareaLength}`)
  });
})