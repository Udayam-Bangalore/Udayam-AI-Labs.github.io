document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    
    const botAvatarUrl = 'assets/images/favicon/favicon-96x96.png';

    const toggleChatVisibility = () => {
        chatWidget.classList.toggle('show');
        chatToggle.classList.toggle('active');
        
        if (chatWidget.classList.contains('show')) {
            setTimeout(() => chatInput.focus(), 100); 
        }
    };

    chatToggle.addEventListener('click', toggleChatVisibility);

    chatCloseBtn.addEventListener('click', toggleChatVisibility);

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.classList.add('message', 'bot-message');
        indicator.innerHTML = `
            <img src="${botAvatarUrl}" class="chat-avatar" alt="Bot Avatar">
            <div class="message-content">
                <div class="dots"><span></span><span></span><span></span></div>
            </div>`;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const hideTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    };

    const addTextMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        let contentHTML = `<div class="message-content"><p>${text}</p></div>`;
        
        if (sender === 'bot') {
            messageElement.innerHTML = `<img src="${botAvatarUrl}" class="chat-avatar" alt="Bot Avatar">` + contentHTML;
        } else {
            messageElement.innerHTML = contentHTML;
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const addQuickReplies = (replies) => {
        const repliesContainer = document.createElement('div');
        repliesContainer.classList.add('quick-replies');
        repliesContainer.innerHTML = replies.map(reply => `<button class="qr-button" data-value="${reply}">${reply}</button>`).join('');
        
        chatMessages.appendChild(repliesContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        repliesContainer.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('qr-button')) {
                const value = target.dataset.value;
                handleQuickReplyClick(value, repliesContainer);
            }
        });
    };

    const handleQuickReplyClick = (value, container) => {
        addTextMessage(value, 'user');
        container.remove();
        handleBotResponse(value);
    };

    const handleBotResponse = (inputText) => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            let botResponse = "I'm not sure how to answer that. For detailed queries, please use the contact form below.";
            const lowerInput = inputText.toLowerCase();

            if (lowerInput.includes('services')) {
                botResponse = "We offer AI education for schools, universities, and corporations, as well as custom AI solutions. What are you most interested in?";
            } else if (lowerInput.includes('about')) {
                botResponse = "Udayam AI Labs is dedicated to empowering the next generation with cutting-edge AI education and technology solutions.";
            } else if (lowerInput.includes('contact')) {
                botResponse = "You can reach us at support@udayam.co.in or call +91-8600302429. The contact form is also available at the bottom of the page.";
            }
            
            addTextMessage(botResponse, 'bot');
        }, 1500);
    };
    
    const handleSendMessage = () => {
        const userText = chatInput.value.trim();
        if (userText) {
            addTextMessage(userText, 'user');
            chatInput.value = '';
            const existingReplies = document.querySelector('.quick-replies');
            if (existingReplies) existingReplies.remove();
            
            handleBotResponse(userText);
        }
    };

    const showWelcomeMessage = () => {
        addTextMessage("Hello! I'm the Udayam AI assistant. How can I help you today?", 'bot');
        addQuickReplies(['Our Services', 'About Us', 'Contact Info']);
    };
    
    chatSendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    showWelcomeMessage();
});