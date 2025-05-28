
const movieSections = [
    {id: 'trendingstart', url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'},
    {id: 'trendinghome', url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'},
    {id: 'topRated', url: 'https://api.themoviedb.org/3/movie/top_rated'},
    {id: 'popular', url: 'https://api.themoviedb.org/3/movie/popular'},
    {id: 'upcoming', url: 'https://api.themoviedb.org/3/movie/upcoming'}
]

movieSections.forEach(section => {
    const sectionElement = document.getElementById(section.id);

    if(sectionElement) {
        getMovie(section.url, sectionElement);
    }else {
        console.log(`section ${section.id} isn't found`);
    }
})

// get data from API
// ======================================
async function getMovie(url, sectionID) {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';

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
            displayMovie(res, sectionID);

        })
        .catch(error => { console.error('Error:', error); })
}

// ============================================================================================
// get the results
function displayMovie(results, sectionID) {
 
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
    console.log(sectionID);

    myMovieSlider(movieArr, sectionID);
    searchMovies(movieArr, sectionID);
}

// ==========================================================================================
// make the movie slider

function myMovieSlider(movies, sectionID) {

    const wrapper = sectionID.querySelector('.swiper-wrapper');
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

        slide.appendChild(imgContainer);
        slide.appendChild(title);
        slide.appendChild(p);
    
        wrapper.appendChild(slide);

        // send id as a GET parameter to the url of the view.html
         slide.addEventListener('click',() => {
            window.location.href= `view.html?id=${movie.id}`
         });
         
  });

//   if (swiperInstance) {
//         swiperInstance.destroy(true, true);
//     }

  let swiper = new Swiper(sectionID.querySelector('.swiper'), {
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
        el: sectionID.querySelector('.swiper-pagination'),
    },

    // Navigation arrows
    navigation: {
        nextEl: sectionID.querySelector('.swiper-button-next'),
        prevEl: sectionID.querySelector('.swiper-button-prev'),
    },

    // And if we need scrollbar
    scrollbar: {
        el: sectionID.querySelector('.swiper-scrollbar'),
    },
});

}

const searchInput = document.getElementById('searchInput');
const searchMessage = document.querySelector('.search-message');

function searchMovies(movies, sectionID){
    searchInput.addEventListener('input', function() {
        const input = searchInput.value.toLowerCase();
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(input));

            searchMessage.style.display = 'none'

            if(filteredMovies.length === 0){
                sectionID.style.display = 'none';
                searchMessage.style.display = 'block'
                searchMessage.textContent = 'No results found';
            }
            else  {
                sectionID.style.display = 'block';
                myMovieSlider(filteredMovies, sectionID);
                searchMessage.style.display = 'none'
            }
    })
}

function validateSignup () {
  
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function(e){
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const passwordMatch = document.querySelector('.password-match');
        const emailMatch = document.querySelector('.email-match');

        if(password !== confirmPassword){
            console.log('password does not match');
            passwordMatch.style.display = 'block';
            return
        }
        try{
            const res = await fetch('http://localhost:3000/users');
            const data = await res.json();
            for(const user of data) {
                if(user.email === email) {
                    console.log('email already exists');
                    emailMatch.style.display = 'block';
                    return;
                }
             }
            const response = await fetch("http://localhost:3000/users", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            });

            if (response.ok) {
                window.location.href = "signin.html";

            }else{
                console.log('Registration failed!')
            }
        } catch(error)
         { console.error('Signup Error:', error);
         }
   
    });  
    
}
// validateSignup ();

function validateSignin(){

    const signinform = document.getElementById('signin-form');

    signinform.addEventListener('submit', async function(e){
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("signin-password").value.trim();

        const loginMatch = document.querySelector('.login-match')

        try {

             const res = await fetch('http://localhost:3000/users');
            const data = await res.json();

            const matchedUser = data.find(user => user.email === email && user.password === password);

            if (matchedUser) {
                alert('Welcome');
                setToLocalStorage(matchedUser);
                window.location.href = "home.html";
            } else {
                console.log('Invalid email or password');
                loginMatch.style.display = 'block';
            }

        }catch(error){
            console.log('Signin error', error);
        }

      }); 
}
// validateSignin();

function setToLocalStorage(user) {
    localStorage.setItem('loggedInUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
    }
    ))
}


document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('signup-form')) {
    validateSignup();
  }

  if (document.getElementById('signin-form')) {
    validateSignin();
  }
});






