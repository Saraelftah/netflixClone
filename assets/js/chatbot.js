document.addEventListener('DOMContentLoaded', function () {

    const chatbotContainer = document.getElementById('chatbot-container');
    const closeBtn = document.getElementById('close-btn');
    const sendBtn = document.getElementById('send-btn');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessage = document.getElementById('chatbot-message');
    const chatbotIcon = document.getElementById('chatbot-icon');

    chatbotIcon.addEventListener('click', function () {
        chatbotContainer.classList.remove('hidden');
        chatbotIcon.classList.add('hidden');
    });

    closeBtn.addEventListener('click', function () {
        chatbotContainer.classList.add('hidden');
        chatbotIcon.classList.remove('hidden');
    });

    sendBtn.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {

        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            appendMessage('user', userMessage);
            chatbotInput.value = '';
            getbotResponse(userMessage);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatbotMessage.appendChild(messageElement);
        chatbotMessage.scrollTop = chatbotMessage.scrollHeight;
    }


    const chatHistory = [];

    async function getbotResponse(userMessage) {

        const APIkey = 'AIzaSyAhzBn39FPwRNtcJSBpU7Nj6gIhc_hRZPE';
        const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIkey}`;

        chatHistory.push({
            role: "user",
            parts: [{ text: userMessage }]
        });


        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: chatHistory
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log(data);

            let botMessage = "An error occurred or no valid response."; // Default error message

            if (data.candidates && data.candidates.length > 0 &&
                data.candidates[0].content && data.candidates[0].content.parts &&
                data.candidates[0].content.parts.length > 0 && data.candidates[0].content.parts[0].text) {
                botMessage = data.candidates[0].content.parts[0].text;
                appendMessage('bot', botMessage);
            } else {
                console.warn("Could not find bot message in the expected format:", data);
                if (data.promptFeedback && data.promptFeedback.blockReason) {
                    botMessage = `Your message was blocked due to: ${data.promptFeedback.blockReason}`;
                }
            }
            chatHistory.push({
                role: "model",
                parts: [{ text: botMessage }]
            });

        } catch (error) {
            console.error('this is chatbot error', error);
            if (typeof appendMessage === 'function') {
                appendMessage('bot', 'Error: Could not get a response. Please try again.');
            }

        }
    }

});

