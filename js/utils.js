function behaviour() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET","https://reqres.in/api/movies/1",true);
  xhr.onload = function() {
    console.log(xhr.responseText);
  };
  xhr.send();
}