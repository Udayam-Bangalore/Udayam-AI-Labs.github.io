document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

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
    let contentHTML = `<div class="message-content">${marked.parse(
      text
    )}</div>`;

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
    chatMessages.scrollTop = chatMessages.scrollHeight;

    let botMessageElement = null;
    let pElement = null;
    let fullResponse = "";
    let isFirstChunk = true;

    try {
      const response = await fetch("https://assistant-xi.vercel.app/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history: chatHistory.slice(-6) }),
      });

      if (!response.ok) {
        hideTypingIndicator();
        throw new Error(`API Error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            if (isFirstChunk) {
              hideTypingIndicator();
              botMessageElement = document.createElement("div");
              botMessageElement.classList.add("message", "bot-message");
              botMessageElement.innerHTML = `
                            <img src="${botAvatarUrl}" class="chat-avatar" alt="Bot Avatar">
                            <div class="message-content"><p></p></div>`;
              chatMessages.appendChild(botMessageElement);
              pElement = botMessageElement.querySelector(".message-content p");
              pElement.classList.add("typing-cursor");
              isFirstChunk = false;
            }

            try {
              const jsonData = line.substring(6);
              const parsedData = JSON.parse(jsonData);
              const { token } = parsedData;

              if (token) {
                fullResponse += token;
                pElement.innerHTML = marked.parse(fullResponse);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                await new Promise((resolve) => setTimeout(resolve, 15));
              }
            } catch (e) {}
          }
        }
      }

      if (fullResponse) {
        chatHistory.push({ type: "ai", content: fullResponse });
      }
    } catch (error) {
      console.error(error);
      addMessage("bot", "Sorry, I encountered an error. Please try again.");
    } finally {
      hideTypingIndicator();
      if (pElement) pElement.classList.remove("typing-cursor");
      chatInput.disabled = false;
      chatSendBtn.disabled = false;
      document.querySelector(".chat-footer").classList.remove("disabled");
      chatInput.focus();
    }
  };
  const handleSendMessage = () => {
    const userText = chatInput.value.trim();
    if (userText) {
      addMessage("user", userText);
      chatHistory.push({ type: "human", content: userText });
      chatInput.value = "";
      chatInput.disabled = true;
      chatSendBtn.disabled = true;
      document.querySelector(".chat-footer").classList.add("disabled");

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

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

    if (
      navLinks.classList.contains("active") &&
      chatWidget.classList.contains("show")
    ) {
      toggleChatVisibility();
    }
  });
  showWelcomeMessage();
});
