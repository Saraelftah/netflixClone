const questions = document.querySelectorAll('.question');

questions.forEach(question => (
    question.addEventListener('click', () => {

        const answer = question.nextElementSibling;
        const icon = question.querySelector('.question-icon');

        const isopen = answer.style.display === 'block';

        questions.forEach(q => {
            q.nextElementSibling.style.display = 'none';
            q.querySelector('.question-icon').classList.remove('rotate');
        });

        if (!isopen) {
            answer.style.display = 'block';
            icon.classList.add('rotate');
        }
    })
));