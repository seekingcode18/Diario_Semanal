$(document).ready(() => {
  $('#gifSubmit').click(event => {
    event.preventDefault();
    const gifSearch = $('#gifSearch').val();
    const giphyUrl = 'https://api.giphy.com/v1/gifs/search';
    const apiKey = 'VFHmiyXHL7mnADRp3qP3sF0Psi3LexUD';
    let apiCall = `${giphyUrl}?q=${gifSearch}&api_key=${apiKey}&limit=8`;
    if (gifSearch) {
      $('.gifs__display').empty();

      fetch(apiCall)
        .then(res => res.text())
        .then(res => {
          let gifList = JSON.parse(res).data.map(gif => gif.images.fixed_height_downsampled.url);
          gifList.forEach(gifURL => {
            $('.gifs__display').append(`<div class="gif__wrapper"><img src=${gifURL}></div>`);
          });
        })
        .then(res => {
          document.querySelectorAll('.gif__wrapper').forEach(div => {
              div.addEventListener('click', event => {
              console.log(event.currentTarget);
              $('#gifBuffer').value = event.currentTarget.src;
              console.log($('#gifBuffer').val());
            })
          });

        })
    }
  })
    
});