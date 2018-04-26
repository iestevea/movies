function behaviour() {
    var movies = moviesBehaviour();
    imageCarrouselBehaviour();
    movieSearcherBehaviour(movies);
    modalBehaviour(movies);
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
          position = changeBackground(position);
          break;
        case 1:
          position = changeBackground(position);
          break;
        case 2:
          position = changeBackground(position);
          break;
        case 3:
          position = changeBackground(position);
          break;
        case 4:
          position = changeBackground(position);
          break;
        case 5:
          contentHeader.classList.remove(`bg${position}`);
          position = 0;
          contentHeader.classList.add(`bg${position}`);
          break;
      }
      function changeBackground(position) {
        contentHeader.classList.remove(`bg${position}`);
        position++;
        contentHeader.classList.add(`bg${position}`);
        return position;
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

function modalBehaviour(movies) {
  var filterBtn = document.getElementsByClassName("header-filter-button")[0].getElementsByTagName("a")[0];
  
  var filters;

  filterBtn.addEventListener("click", showFilterModal);
  
  function showFilterModal() {
    var modalFilter = document.getElementsByClassName("modal-filter")[0];
    modalFilter.classList.remove("hidden");

    var filterBtnModal = document.getElementsByClassName("modal-filter-btn")[0];
    filterBtnModal.addEventListener("click", hideFilterModal);

  }

  function hideFilterModal() {
    
    var moviesFiltered = filterModalBehaviour();

    var modalFilter = document.getElementsByClassName("modal-filter")[0];
    modalFilter.classList.add("hidden");
    
    if(moviesFiltered.length !=0){
      removeMovies();
      showMovies(moviesFiltered);
    }

    function filterModalBehaviour() {

      var genderFilters = document.getElementsByClassName("filter-gender-options")[0].getElementsByTagName("input");
      var yearFilters = document.getElementsByClassName("filter-year-options")[0].getElementsByTagName("input");

      var genderFiltersChecked = Array.from(genderFilters).filter((filter) => filter.checked);
      genderFiltersChecked = genderFiltersChecked.map((filter) => filter.name);
      Array.from(genderFilters).forEach((filter) => filter.checked = false);

      var yearFiltersChecked = Array.from(yearFilters).filter((filter) => filter.checked);
      yearFiltersChecked = yearFiltersChecked.map((filter) => filter.name);
      Array.from(yearFilters).forEach((filter) => filter.checked = false);

      var moviesFilteredByGender = filterMoviesByGender(genderFiltersChecked,movies);
      var moviesFilteredByYear = filterMoviesByYear(yearFiltersChecked,movies);

      var moviesFilteredByGenderisEmpty = moviesFilteredByGender.length == 0;
      var moviesFilteredByYearisEmpty = moviesFilteredByYear.length == 0;
      
      if(!moviesFilteredByGenderisEmpty && !moviesFilteredByYearisEmpty) {
        filteredMovies = moviesFilteredByGender.filter((movie) => 
          moviesFilteredByYear.includes(movie) );
      } else if(moviesFilteredByGenderisEmpty) {
        filteredMovies = moviesFilteredByYear;
      } else {
        filteredMovies = moviesFilteredByGender;
      }

      return filteredMovies;
    }
  }
}

function filterMoviesByGender(filters,movies) {
  return movies.filter((movie) => filters.includes(movie.gender) );
}

function filterMoviesByYear(filters,movies) {
  var moviesFiltered = [];
  filters.forEach((filter) => {
    switch(filter){
      case "menor2000":
        moviesFiltered.push.apply(moviesFiltered,menor2000(movies));
        break;
      case "entre2000y2010":
        moviesFiltered.push.apply(moviesFiltered,entre2000y2010(movies));
        break;
      case "mayor2010":
        moviesFiltered.push.apply(moviesFiltered,mayor2010(movies));
        break;
    }

  });

  function menor2000(movies) {
    return movies.filter((movie) => movie.year < 2000);
  }
  function entre2000y2010(movies) {
    return movies.filter((movie) => movie.year < 2010 && movie.year > 2000);
  }
  function mayor2010(movies) {
    return movies.filter((movie) => movie.year > 2010);
  }

  return moviesFiltered;
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

