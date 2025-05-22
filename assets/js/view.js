let urlString = window.location.href;
let url = new URL(urlString);
let paramValue = url.searchParams.get("id");
console.log(paramValue);


async function displayMovieInfo(paramValue) {

    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';

    let Url = `https://api.themoviedb.org/3/movie/${paramValue}?append_to_response=videos`

    await fetch(Url , {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then(response => response.json())                            
        .then(data => {
            console.log(data);

            appendResponse(data);

        })
        .catch(error => { console.error('Error:', error); })
}

/*data = {  id: "",
            title: "",
            overview: "",
            poster_path:""
            videos: {
                results: [{
                    key:""
                    site:""
                    type:""}
                ]
            }
}
  */

function appendResponse(results) {
    var cartona = ``;

       let videos = results.videos?.results;
    let trailer = videos?.find(video =>
        video.site === "YouTube" && video.type === "Trailer");


    if(trailer) {
        cartona += `<div class="trailer">
                        <iframe src="https://www.youtube.com/embed/${trailer.key}" title="${trailer.name} frameborder="0" allow="accelerometer" allowfullscreen>
                        </iframe>
                    </div>`
    }else {
        console.log("trailer not found");
    }

    cartona += `
        <div class="view__content">

            <div class="content__info">
                 <h1>${results.title}</h1>
                <p class="info_overview">${results.overview}</p>
                <p>Rate: ${results.vote_average} <i class="fa-regular fa-thumbs-up"></i></p>
                <p>Release Date: ${results.release_date} <i class="fa-regular fa-calendar-days"></i></p>
            </div>
           
            <div class = "movieimg_container">
                <img src = "https://image.tmdb.org/t/p/w500${results.poster_path}"  alt="${results.title}">
            </div>

        </div>`
       

 
    const viewContainer = document.querySelector('.view-container');
    viewContainer.innerHTML = cartona;
}


displayMovieInfo(paramValue);


