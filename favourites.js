// Function to display favourites list stored in the loacal storage
function displayFavourites() {
    const favouritesListContainer = document.getElementById('favouritesList');
    favouritesListContainer.innerHTML = '';

    //checking and retrieving favourites list from local storage
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    console.log(favouritesList);

    //creating element when favourites list is empty
    if (favouritesList.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your favourites list is empty.';
        favouritesListContainer.appendChild(emptyMessage);
    } 
    //creating element for the movies in favourites list
    else {
        favouritesList.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.Poster}" class="card-img" onerror="this.src='alt.jpg';">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <button class="btn removefav" data-imdbid="${movie.imdbID}">Remove from Favourites</button>
                    <a href="movie.html?id=${movie.imdbID}" class="morebtn">More</a>
                </div>
            `;
            favouritesListContainer.appendChild(movieCard);
        });
    }

    //adding click event listener to remove button 
    const removeButtons = document.querySelectorAll('.removefav');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromFavourites);
    });
}

// Function to remove a movie from the favorites list
function removeFromFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    const movieToRemove = favouritesList.find(movie => movie.imdbID === imdbID);
    if (movieToRemove) {
        const updatedFavouritesList = favouritesList.filter(movie => movie.imdbID !== imdbID);
        localStorage.setItem('favourites', JSON.stringify(updatedFavouritesList));
        alert(`${movieToRemove.Title} has been removed from your favorites!`);
        displayFavourites(); // Refresh the favorites list
    } else {
        alert('Movie not found in favorites!');
    }
}

// Automatically display favorites when the favourites.html page is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayFavourites();
})

// Event listener for the "Favorites" link in the header on the index.html page
const favouritesLink = document.querySelector('a[href="favourites.html"]');
favouritesLink.addEventListener('click', displayFavourites);
