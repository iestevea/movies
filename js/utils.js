function behaviour() {
    var movies = moviesBehaviour();
    imageCarrouselBehaviour();
    movieSearcherBehaviour(movies);
}

function moviesBehaviour() {
  var movies = [];
  getMovies().then((arrayMovies) => {
    showMovies(arrayMovies);
    arrayMovies.forEach((movie) => {
      movies.push(movie);
    });
  });
  return movies;

  function getMovies() {
    var promise = new Promise( (resolve,reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET","http://localhost:3000/peliculas/",true);
      xhr.onreadystatechange = (() => {
        if(xhr.status == 200 && xhr.readyState == 4) {
          resolve(JSON.parse(xhr.responseText));
        } 
      });
      xhr.send();
    });
    return promise;
  }

}

function imageCarrouselBehaviour() {
  
  var position = 0;
  window.setInterval(setImageBackGround,5000);

  function setImageBackGround() {
    var contentHeader = document.getElementsByClassName("content-header")[0];
      switch(position) {
        case 0:
          contentHeader.classList.remove(`bg${position}`);
          position++;
          contentHeader.classList.add(`bg${position}`);
          break;
        case 1:
          contentHeader.classList.remove(`bg${position}`);
          position++;
          contentHeader.classList.add(`bg${position}`);
          break;
        case 2:
          contentHeader.classList.remove(`bg${position}`);
          position++;
          contentHeader.classList.add(`bg${position}`);
          break;
        case 3:
          contentHeader.classList.remove(`bg${position}`);
          position = 0;
          contentHeader.classList.add(`bg${position}`);
          break;
      }
  }
}

function movieSearcherBehaviour(movies) {

  var searcher = document.getElementsByClassName("content-header-searcher")[0].getElementsByTagName("input")[0];

  searcher.addEventListener("keyup", filterFilms);

  function filterFilms(e) {
    var textSearch = e.target.value;
    var filteredFilms = [];
    if(!!textSearch.trim()) {
      filteredFilms = movies.filter((movie) => movie.title.includes(textSearch) || movie.author.includes(textSearch) );
      removeMovies();
      showMovies(filteredFilms);
    } else {
      removeMovies();
      showMovies(movies);
    }
  }

}

function showMovies (movies) {
  var contentMovies = document.getElementsByClassName("content-cards")[0];
  movies.forEach(movie => {
    var cardMovie = document.createElement("div");
    cardMovie.setAttribute("class","film-card");
    cardMovie.innerHTML = getHTMLContentMovie(movie);
    contentMovies.appendChild(cardMovie);
  });

  function getHTMLContentMovie(movie) {
    return `<img src="${movie.cover}" alt="">
    <p class="film-title">${movie.title}</p>
    <p class="film-author">${movie.author}</p>`;
  }
}

function removeMovies() {
  var contentMovies = document.getElementsByClassName("content-cards")[0];
  while(contentMovies.firstChild) {
    contentMovies.removeChild(contentMovies.firstChild);
  }
}