const chatWindow = document.getElementById('abbasChatWindow');
const closeChat = document.getElementById('abbasCloseChat');
const expandChat = document.getElementById('abbasExpandChat');

const pillChatBtn = document.querySelector('.chat-btn');

if (pillChatBtn) {
    pillChatBtn.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
            e.preventDefault(); 
            chatWindow.classList.toggle('open');
        }
    });
}

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('open');
});
expandChat.addEventListener('click', () => {
    window.open('/connect/index.html', '_blank');
    chatWindow.classList.remove('open');
});