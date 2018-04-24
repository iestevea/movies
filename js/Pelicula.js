class Pelicula {
  constructor(id,cover,title,author,gender,year) {
    this.id = id;
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.gender = gender;
    this.year = year;
  }
   get title() {
     return this.title;
   }
   get author() {
     return this.author;
   }
   get gender() {
     return this.gender;
   }
   get year() {
     return this.year;
   }
}