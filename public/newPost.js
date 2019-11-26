$(document).ready(()=>{
  const giphyUrl = 'https://api.giphy.com/v1/gifs/search';
  const apiKey = 'VFHmiyXHL7mnADRp3qP3sF0Psi3LexUD';
  let apiCall = `${giphyUrl}?q=cat&api_key=${apiKey}`;
  fetch(apiCall)
    .then(res => res.text())
    .then(res => console.log(res))

})
