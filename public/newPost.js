$(document).ready(()=>{
  $('#gifSubmit').click(event =>{
    event.preventDefault();
    const gifSearch = $('#gifSearch').val();
    const giphyUrl = 'https://api.giphy.com/v1/gifs/search';
    const apiKey = 'VFHmiyXHL7mnADRp3qP3sF0Psi3LexUD';
    let apiCall = `${giphyUrl}?q=${gifSearch}&api_key=${apiKey}&limit=8`;
    fetch(apiCall)
      .then(res => res.text())
      .then(res =>{
        let gifList = JSON.parse(res).data.map(gif => gif.images.fixed_height_downsampled.url);
        gifList.forEach(gifURL => {
          $('.gifs__display').append(`<img src=${gifURL}>`);
        });
    })
  })
});
