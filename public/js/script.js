// Chat Box Functionality
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);
        chatInput.value = '';
    }
});
