const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const input = document.getElementById("input");

getMovies(apiUrl);

async function getMovies(url) {
  const res = await fetch(url);
  const resData = await res.json();

  addMovie(resData.results)
}


function addMovie(movies) {

    main.innerHTML = ""; 

  movies.forEach((movie) => {
      const {poster_path, title, vote_average, overview} = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie")

    movieEl.innerHTML = `
        <img src="${imgPath + poster_path}"
        alt="">
             <div class="movie-title">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}" >${vote_average}</span>
            </div>
        
        <div class = "overview"><h3>overview:</h3>${overview}</div>
            `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote){
    if(vote >= 8 ){
        return "green"
    }else if(vote >= 5 ){
        return "orange"
    }else{
        return "red"
    }
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const searchTerm = input.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm)
    }

    input.value = "";

})

