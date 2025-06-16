// validateSignup ();
function validateSignup() {

    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const passwordMatch = document.querySelector('.password-match');
        const emailMatch = document.querySelector('.email-match');

        if (password !== confirmPassword) {
            console.log('password does not match');
            passwordMatch.style.display = 'block';
            return
        }
        try {
            const res = await fetch('http://localhost:3000/users');
            const data = await res.json();
            for (const user of data) {
                if (user.email === email) {
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
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                window.location.href = "signin.html";

            } else {
                console.log('Registration failed!')
            }
        } catch (error) {
            console.error('Signup Error:', error);
        }

    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('signup-form')) {
        validateSignup();
    }
});