function behaviour() {
  var movies;
  var xhr = new XMLHttpRequest();
  xhr.open("GET","http://localhost:3000/peliculas/",true);
  movies = xhr.onload = function() {
    //resolve promesa
    return JSON.parse(xhr.responseText);
  };
  xhr.send();
  console.log(movies);
  
}

// function getMovies() {
//   var movies;
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET","http://localhost:3000/peliculas/",true);
//   xhr.onload = function() {
//     movies = JSON.parse(xhr.responseText);
//   };
//   xhr.send();
//   return movies;
// }

function showMovies (movies) {
  var contentMovies = document.getElementsByClassName("content-cards")[0];
  arrayMovie.forEach(movie => {
    var cardMovie = document.createElement("div");
    cardMovie.setAttribute("class","film-card");
    cardMovie.innerHTML = getHTMLContentMovie();
    contentMovies.appendChild(cardMovie);
  });
}

function getHTMLContentMovie() {
  return ``;
}