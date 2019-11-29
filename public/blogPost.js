$(document).ready(() => {
  //copied and pasted for a different length
  /* Implementing a character count system for text area in index.html*/
  $("textarea").on('input', (event) => {
      const textareaLength = $("textarea").val().length;
      $('.characterCount').html(`Remaining characters: ${200 - textareaLength}`)
  });

  // after the form POST is sent, this listens to the click on the button and increments the on page counter through DOM manipulation
  $('.emoji__pic').on("click", event => event.currentTarget.parentElement.lastElementChild.innerHTML++);
})