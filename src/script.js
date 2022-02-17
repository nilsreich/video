
async function fetchMoviesJSON() {
  const response = await fetch('/src/movies.json');
  const movies = await response.json();
  return movies;
}
fetchMoviesJSON().then(movies => {

  let liste = document.getElementById('list')
  let title_btn = document.getElementById('title')
  title_btn.addEventListener('click', () => title_sort())
  
  let imdb_btn = document.getElementById('imdb')
  imdb_btn.addEventListener('click', () => imdb_sort())
  
  let last_parent_node
  let player = document.getElementById('player')
  
  function title_sort() {
    movies.sort(function (a, b) {
      a = a.title.toLowerCase();
      b = b.title.toLowerCase();
      return a > b ? -1 : a < b ? 1 : 0;
    });
    render()
  }
  
  function imdb_sort() {
    movies.sort(function (a, b) {
      a = a.imdb
      b = b.imdb
      return a > b ? -1 : a < b ? 1 : 0;
    });
    render()
  }
  
  function render() {
    liste.innerHTML = ''
    for (let i = 0; i < movies.length; i++) {
      let title = movies[i].title
      let imdb = movies[i].imdb
      let year = movies[i].year
      let genre = movies[i].imdb
      let source = movies[i].source
      addElement(title, imdb, year, genre, source)
    }
  }
  
  function addElement(title, imdb, year, genre, source) {
    let moviecontainer = document.createElement("div");
    moviecontainer.classList.add('flex', 'text-center', 'bg-slate-200', 'hover:bg-blue-100')
    moviecontainer.addEventListener('click', () => setsource(source))
  
    let titlecontainer = document.createElement("div");
    titlecontainer.classList.add('w-1/4', 'truncate')
    let titlecontent = document.createTextNode(title);
    titlecontainer.appendChild(titlecontent);
    moviecontainer.appendChild(titlecontainer)
  
    let imdbcontainer = document.createElement("div");
    imdbcontainer.classList.add('w-1/4', 'truncate')
    let imdbcontent = document.createTextNode(imdb);
    imdbcontainer.appendChild(imdbcontent);
    moviecontainer.appendChild(imdbcontainer)
  
    let yearcontainer = document.createElement("div");
    yearcontainer.classList.add('w-1/4', 'truncate')
    let yearcontent = document.createTextNode(year);
    yearcontainer.appendChild(yearcontent);
    moviecontainer.appendChild(yearcontainer)
  
    let genrecontainer = document.createElement("div");
    genrecontainer.classList.add('w-1/4', 'truncate')
    let genrecontent = document.createTextNode(genre);
    genrecontainer.appendChild(genrecontent);
    moviecontainer.appendChild(genrecontainer)
  
    liste.appendChild(moviecontainer)
  }
  
  render()
  
  function setsource(videosrc) {
    try { last_parent_node.classList.toggle('bg-blue-200') }
    catch {
      last_parent_node = event.target.parentNode
    }
    event.target.parentNode.classList.toggle('bg-blue-200')
    last_parent_node = event.target.parentNode
    player.src = videosrc
    player.play()
  }
  
});


