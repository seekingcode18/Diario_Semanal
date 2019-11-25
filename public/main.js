$(document).ready(() => {
  $("textarea").on('input', (event) => {
    const textareaLength = $("textarea").val().length;
    $('.characterCount').html(`Remaining characters: ${2500 - textareaLength}`)
  });
});
