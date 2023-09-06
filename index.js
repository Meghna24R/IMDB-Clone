const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieListContainer');

//function to search and retrieve the list of movie from the query passed as argument
async function searchMovies (query) {
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=f12e0b8b&s=${query}`);
    const data = await response.json();
    return data.Search || [];
}

//function to go through the movie list and call the function to render it on screen
function renderMovie (movies) {
    movieList.innerHTML = '';
    if (movies.length === 0){
        addMovieToDOM('emp');
    }else{
        for(let i=0; i<movies.length;i++){
            addMovieToDOM(movies[i]);
        }
    }   
}

//function to create an element to display the movie list based on the search results
function addMovieToDOM (movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-container');

    if (movie === 'emp') {
        movieCard.innerHTML = `
            <div id="noRes">
                <p>No results found!!!</p>
            </div>
        `;
    } else {
        if(movie.Title.length > 29){
            movieCard.innerHTML = `
                <div class="movie-card">
                    <img src="${movie.Poster}" class="card-img" onerror="this.src='alt.jpg';">
                    <div class="card-body">
                        <p class="card-title">${movie.Title.substring(0, 25) + '...'}</p>
                        <button class="favbtn btn" id="${movie.imdbID}">Add to Favourites</button>
                        <a href="movie.html?id=${movie.imdbID}" class="morebtn">More</a>
                    </div>
                </div>
                `;
        }else{
            movieCard.innerHTML = `
                <div class="movie-card">
                    <img src="${movie.Poster}" class="card-img" onerror="this.src='alt.jpg';">
                    <div class="card-body">
                        <p class="card-title">${movie.Title}</p>
                        <button class="favbtn btn" id="${movie.imdbID}">Add to Favourites</button>
                        <a href="movie.html?id=${movie.imdbID}" class="morebtn">More</a>
                    </div>
                </div>
                `;
        }
    }

    movieList.append(movieCard);
}

//function to check the favourite list and add the movie it not present in the list already 
function addToFavourites(imdbId) {
    const movieDetails = getMovieDetails(imdbId);
    movieDetails.then(movieDetail => {
        const favourites = checkFavourites();
        if (!favourites.some(m => m.imdbID === movieDetail.imdbID)) {
            favourites.push(movieDetail);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert(`${movieDetail.Title} has been added to your favourites!`);
        } else {
            alert(`${movieDetail.Title} is already in your favourites!`);
        }
    })
}

//function to retrieve and return the inforamtion about the movie based on the imdb id passed to it
async function getMovieDetails(imdb) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=f12e0b8b&i=${imdb}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

//function to check the favourite list in local storage and return the list if found or an empty list if not found
function checkFavourites(){
    return JSON.parse(localStorage.getItem('favourites')) || [];
}

//function to handle the click event in the document
function handleClickEvent(e) {
    const target = e.target;

    if(target.id === 'searchbtn') {
        const query = searchInput.value.trim();
        removeElements();
        if (query.length > 0) {
            searchMovies(query)
                .then(movies => {
                    renderMovie(movies);
                })
                .catch(error => console.error('Error searching movies:', error));
        } else {
            alert('Search input cannot be empty. Please enter something!!!')
        }
    } else if (target.className === "favbtn btn") {
        console.log('clicked fav');
        const imdbId = target.id;
        addToFavourites(imdbId);
    }
}

// function to initialize
function initialize () {
    document.addEventListener('click', handleClickEvent);
}

initialize(); 