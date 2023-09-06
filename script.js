movies = [];
var name = "";
let input = document.getElementById("searchInput");

//function to retrieve movie based on input
async function searchMovies (query) {
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&s=${query}`);
    const data = await response.json();
    return data.Search || [];
}

//event listener for serach input based on each letter typed
input.addEventListener("keyup", (e) => {
    removeElements();
    if(e.key === 'Backspace'){
        name = name.slice(0, name.length - 1);   
    }
    else if(e.key != 'Shift'){
        name = name + e.key;
    }
    if(name.length > 2){
        recieveList(name);
    }
});

//function to call the function that display the sutosuggestion on screen
function recieveList(name){
    searchMovies(name)
        .then(movies => {
            autosuggest(movies);
        })
        .catch(error => console.error('Error searching movies:', error));
}

//function to add the element to be displayed on the screen for autosuggestion
function autosuggest(movies){
    for(let i=0; i<movies.length; i++){
        if(movies[i].Title.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "") {
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onClick", "displayMovies('" + movies[i].Title + "')");
            let word = "<b>" + movies[i].Title.substr(0, input.value.length) + "</b>";
            word += movies[i].Title.substr(input.value.length);
            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }
    }
}

//function to display the name of the movie on search bar when it is clicked from the suggestions
function displayMovies(value){
    console.log(value);
    input.value = value;
    removeElements();
}

//function to rmeove the elements from the list of suggestion
function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}
