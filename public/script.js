const route = '/blogData'; 
fetch(route)
    .then(response =>  {
return response.text();
    }) 
    .then(response => {
        console.log(response);
    })