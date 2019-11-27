$(document).ready(() => {
  // search for a gif and on submit fetch from a gif API 
  $('#gifSubmit').click(event => {
    event.preventDefault();
    const gifSearch = $('#gifSearch').val();
    const giphyUrl = 'https://api.giphy.com/v1/gifs/search';
    const apiKey = 'VFHmiyXHL7mnADRp3qP3sF0Psi3LexUD';
    let apiCall = `${giphyUrl}?q=${gifSearch}&api_key=${apiKey}&limit=8`;
    //keeps seraches from piling up on screen.Cleans search after every round.
    if (gifSearch) {
      $('.gifs__display').empty(); 
      fetch(apiCall)
        .then(res => res.text())
        .then(res => {
          console.log('before', JSON.parse(res).data);
          let gifList = JSON.parse(res).data.map(gif => {
            return gifData = {
              title: gif.title,
              url: gif.images.fixed_height_downsampled.url
            };
          });
          console.log('after', gifList);
          gifList.forEach(gifURL => {
            $('.gifs__display').append(`<div class="gif__wrapper"><img src=${gifURL.url} alt=${gifURL.title}></div>`);
          });
        })
        //loops through all of the images after they've been dislayed and appended, and listens for a click 
        //to capture the url of each image
        .then(res => {
          document.querySelectorAll('.gif__wrapper').forEach(div => {
            div.addEventListener('click', event => {
              // insert one gif into the json using the post request
              $('#gifBuffer').val(event.currentTarget.firstChild.src);
            })
          });
        })
    }
  })
});