function checkInput(){
    const input = document.getElementById("searchInput");
    if(input.value === ""){
        alert("please search a movie");
    }
    else{
        getMovieInfo(input.value);
        input.value = "";
        

    }
}
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", checkInput);



async function getMovieInfo(movieName) {
    const apiKey = '393d50ae';
    const url = `https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;
    
    document.getElementById("loading").style.display = "flex";
    document.getElementById('no-result').style.display = "none"
    document.getElementById("movie-container").innerHTML = "";

    try{
       const response = await fetch(url);

       if(!response.ok){
         alert('Network response was not ok')
       }

       const data = await response.json();

       document.getElementById("loading").style.display = "none";

       const movieContainer = document.getElementById("movie-container");
       
       
       data.Search.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";
        movieItem.innerHTML = `
        <div class="movie-poster">
              <a href="https://ww25.soap2day.day/?s=${movie.Title}" target="blank"><img src="${movie.Poster}" alt="movie-poster"></a>
        </div>
        <div class="movie-detail">
               <h2 class="movie-title">${movie.Title}(${movie.Year})</h2> 
               <p><strong>Type:</strong> ${movie.Type}</p>
               <p><strong>Released:</strong> ${movie.Year}</p>
          </div>
     
     `
        movieContainer.appendChild(movieItem);
       });
       
    } catch(error){
        document.getElementById('no-result').style.display = "flex"
        console.error(error);
        
    }


}
window.addEventListener("keydown", (Event) => {
    if(Event.key === "Enter"){
        checkInput();
    }

})
