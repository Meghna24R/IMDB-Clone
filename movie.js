//function to extract and return the details of the movie 
async function getMovieDetailsById(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=f12e0b8b`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

//function to create the elements to dispaly the movie details on screen
function displayMovieDetails(movie) {
    console.log(movie);
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = `
        <h2 class="movie-title">${movie.Title}</h2>
        <div class="card">
<<<<<<< HEAD
            <img src="${movie.Poster}" class="movie-img" onerror="this.src='alt.jpg';">
=======
            <img src="${movie.Poster}" class="movie-img" onerror="this.src='/alt.jpg';">
>>>>>>> 5009b165177f5ebbc52ef2f58dff31a897bb70a1
            <div class="movieCard">
                <p>${movie.Plot}</p>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Writer:</strong> ${movie.Writer}</p>
                <p><strong>Type:</strong> ${movie.Type}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Country:</strong> ${movie.Country}</p>
                <p><strong>Language:</strong> ${movie.Language}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                <p><strong>Production:</strong> ${movie.Production}</p>
            </div>
        </div>
    `;
}

//adding event listener to the DOM when the page is loaded to get the IMDB id from the url and call the functions to extract details and display the movie details
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('id');
    if (imdbID) {
        getMovieDetailsById(imdbID)
            .then(movie => {
                //code for when the movie details are extracted
                if (movie) {
                    displayMovieDetails(movie);
                } 
                //code for when the movie details are not found
                else {
                    const movieDetailsContainer = document.getElementById('movieDetails');
                    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                const movieDetailsContainer = document.getElementById('movieDetails');
                movieDetailsContainer.innerHTML = '<p>Error fetching movie details.</p>';
            });
    }
});
