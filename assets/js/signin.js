// validate sign in
function validateSignin() {

    const signinform = document.getElementById('signin-form');

    signinform.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById("signin-email").value.trim();
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

        } catch (error) {
            console.error('Signin error', error);
        }

    });
}

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
    if (document.getElementById('signin-form')) {
        validateSignin();
    }
});