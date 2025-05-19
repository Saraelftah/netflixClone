// get data from API
// ======================================
async function getMovie() {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';

    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

    await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data.results);
            let res = data.results;
            displayMovie(res);

        })
        .catch(error => { console.error('Error:', error); })
}

getMovie();
// ============================================================================================
// get the results
function displayMovie(results) {
 
    let movieArr = [];
    let movieObj = {};

    results.forEach(res => {
        movieObj = {
            id: res.id,
            title: res.title,
            overview: res.overview,
            posterPath: res.poster_path,
        }

        // console.log(movieObj)
        movieArr.push(movieObj);

    });

    console.log(movieArr);
    myMovieSlider(movieArr);
    // popUp (movieArr);
}

// ==========================================================================================
// make the movie slider

let Images = [];
let myObject = {};
function myMovieSlider(movies) {

 const wrapper = document.querySelector('.swiper-wrapper');
  wrapper.innerHTML = '';
 
  movies.forEach(movie => {

    // swiper slide
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    // title
    const title = document.createElement('h3');
    title.classList.add('title');

    // overview
    const p = document.createElement('p');
    p.classList.add('overview');

    // image
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img__container');

    const img =  document.createElement('img');
    img.classList.add('movieImage');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.posterPath}`);
    img.setAttribute('alt', movie.title);

    imgContainer.appendChild(img);

    title.innerHTML = movie.title;
    p.innerHTML = movie.overview;
// ==========================================
    // myObject = {
    //   title: title,
    //   image: img,
    //   overview: p,
    // }
    // Images.push(myObject);
// ===========================================
    slide.appendChild(imgContainer);
    slide.appendChild(title);
    slide.appendChild(p);
  
    wrapper.appendChild(slide);
  });


  let swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 5,
    spaceBetween: 20,

    effect: 'coverflow',
    coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

  swiper.update();

}
// ===============================================================================

// const popUpdiv = document.querySelector('.pop_up_div');
// const popUpimg = document.querySelector('.pop_up_img');
// const popUpContainer = document.querySelector('.pop_up_container');

// console.log(popUpdiv);
// console.log(popUpimg);

// function popUp(images) {
//   console.log(images);


// for(var i = 0; i < images.length; i++) {

//     images[i].addEventListener('click', function(e) {

//         console.log('hello');
//         var clickedItem = e.target.image.getAttribute('src');
//         addBackground();
//         popUpImage(clickedItem);
//  })
// }
 
// }

// function addBackground() {
//     console.log('hello from div');
//     popUpContainer.style.display = 'block';
//     popUpdiv.style.display = 'block';
    
// }

// function popUpImage(clickedItem) {

//     console.log('hello from image');
//     popUpimg.setAttribute("src",clickedItem);
//     popUpimg.style.display = 'block';

// }





