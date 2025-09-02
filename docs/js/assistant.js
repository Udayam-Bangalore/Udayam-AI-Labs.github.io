document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");

  const botAvatarUrl = "assets/images/favicon/favicon-96x96.png";
  let chatHistory = [];

  const toggleChatVisibility = () => {
    chatWidget.classList.toggle("show");
    chatToggle.classList.toggle("active");

    if (chatWidget.classList.contains("show")) {
      setTimeout(() => chatInput.focus(), 100);
    }
  };

  const showTypingIndicator = () => {
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
    indicator.classList.add("message", "bot-message");
    indicator.innerHTML = `
            <img src="${botAvatarUrl}" class="chat-avatar" alt="Bot Avatar">
            <div class="message-content">
                <div class="dots"><span></span><span></span><span></span></div>
            </div>`;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const hideTypingIndicator = () => {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) indicator.remove();
  };

  const addMessage = (sender, text) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", `${sender}-message`);

    let contentHTML = `<div class="message-content"><p>${text.replace(
      /\n/g,
      "<br>"
    )}</p></div>`;

    if (sender === "bot") {
      messageElement.innerHTML =
        `<img src="${botAvatarUrl}" class="chat-avatar" alt="Bot Avatar">` +
        contentHTML;
    } else {
      messageElement.innerHTML = contentHTML;
    }

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const handleApiCall = async (query) => {
    showTypingIndicator();

    try {
      const response = await fetch("http://localhost:3000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history: chatHistory.slice(0, -1) }),
      });

      console.log(query);
      console.log(chatHistory);

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();

      hideTypingIndicator();
      addMessage("bot", data.answer);
      chatHistory.push({ type: "ai", content: data.answer });
    } catch (error) {
      console.error(error);
      hideTypingIndicator();
      addMessage("bot", "Sorry, I encountered an error. Please try again.");
    }
  };

  const handleSendMessage = () => {
    const userText = chatInput.value.trim();
    if (userText) {
      addMessage("user", userText);
      chatHistory.push({ type: "human", content: userText });
      chatInput.value = "";

      handleApiCall(userText);
    }
  };

  const showWelcomeMessage = () => {
    addMessage(
      "bot",
      "Hello! I'm the Udayam AI assistant. How can I help you today?"
    );
    chatHistory.push({
      type: "ai",
      content: "Hello! I'm the Udayam AI assistant. How can I help you today?",
    });
  };

  chatToggle.addEventListener("click", toggleChatVisibility);
  chatCloseBtn.addEventListener("click", toggleChatVisibility);
  chatSendBtn.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
  });

  showWelcomeMessage();
});
