$(document).ready(() => {
  //copied and pasted for a different length
  /* Implementing a character count system for text area in index.html*/
  $("textarea").on('input', (event) => {
      const textareaLength = $("textarea").val().length;
      $('.characterCount').html(`Remaining characters: ${200 - textareaLength}`) 
  });

  // $('.emoji__pic').click(event =>{
  //   event.preventDefault();
  //   console.log(event.currentTarget.parentElement.id);
  // })
})