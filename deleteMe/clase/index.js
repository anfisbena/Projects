const fetch=require('node-fetch')
var response=fetch("https://api.github.com/users/amontealegrer")
    .then(response=>response.json())
    .then(response=>console.log(response))