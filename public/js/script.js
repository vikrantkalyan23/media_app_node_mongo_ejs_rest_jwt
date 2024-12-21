// Image Slider Functionality
const slides = document.querySelector('.slides');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 0;

prev.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : 2;
    updateSlider();
});

next.addEventListener('click', () => {
    index = (index < 2) ? index + 1 : 0;
    updateSlider();
});

function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

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
