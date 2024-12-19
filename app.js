// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdGqW9cUWdkIPMKyTpkS58WEcp0tsZcHw",
    authDomain: "chatwebapp-9a019.firebaseapp.com",
    databaseURL: "https://chatwebapp-9a019-default-rtdb.firebaseio.com",
    projectId: "chatwebapp-9a019",
    storageBucket: "chatwebapp-9a019.firebasestorage.app",
    messagingSenderId: "420201836143",
    appId: "1:420201836143:web:3955529dac5108efcfa79a",
    measurementId: "G-1M1K334EJ3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const chatContainer = document.getElementById('chat-container');

function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim();

    if (messageText) {
        const messageData = {
            text: messageText,
            timestamp: Date.now(),
            user: "User" // Replace with dynamic user data if needed
        };

        database.ref('messages').push(messageData);
        messageInput.value = '';
    }
}

database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span>${message.user}:</span> ${message.text}`;
    
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
