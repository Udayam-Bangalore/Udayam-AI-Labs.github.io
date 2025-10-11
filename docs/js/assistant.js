document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selectors ---
  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const menuToggle = document.getElementById("menu-toggle"); // ADDED THIS BACK
  const callbackBtn = document.getElementById("request-callback-btn");
  const modal = document.getElementById("callback-modal");
  const closeBtn = document.querySelector(".callback-close-btn");
  const callbackForm = document.getElementById("callback-form");
  const heroSection = document.getElementById("hero-section");
  const toast = document.getElementById("toast"); // --- State & Constants ---

  const botAvatarUrl = "assets/images/favicon/favicon-96x96.png";
  let chatHistory = []; // --- Core Functions ---

  const toggleChatVisibility = () => {
    chatWidget.classList.toggle("show");
    chatToggle.classList.toggle("active");
    if (chatWidget.classList.contains("show")) {
      setTimeout(() => chatInput.focus(), 100);
    }
  };

  const openCallbackModal = () => {
    if (modal) modal.style.display = "flex";
  };
  const closeCallbackModal = () => {
    if (modal) modal.style.display = "none";
  };

  const showTypingIndicator = () => {
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
    indicator.classList.add("message", "bot-message");
    indicator.innerHTML = `<img src="${botAvatarUrl}" class="chat-avatar" alt="Bot Avatar"><div class="message-content"></div>`;
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
  const showWelcomeMessage = () => {
    const welcomeText = `👋 Hey there!\n\nI’m here to help you with any questions you've got. 💬\n\nIf you’d like, just share a few details with us and our team will get in touch to give you some personalized support. 🤝`;
    addMessage("bot", welcomeText);
    chatHistory.push({ type: "ai", content: welcomeText });

    const shareDetailsBtn = document.createElement("button");
    shareDetailsBtn.id = "share-details-btn";
    shareDetailsBtn.className = "share-details-btn";
    shareDetailsBtn.textContent = "Share my details";
    chatMessages.appendChild(shareDetailsBtn);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    shareDetailsBtn.addEventListener("click", () => {
      openCallbackModal();
      if (chatWidget.classList.contains("show")) {
        toggleChatVisibility();
      }
    });
  };
  const handleSendMessage = () => {
    const shareDetailsBtn = document.getElementById("share-details-btn");
    if (shareDetailsBtn) {
      shareDetailsBtn.classList.add("disintegrate");
      shareDetailsBtn.addEventListener("animationend", () =>
        shareDetailsBtn.remove()
      );
    }

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

  const handleApiCall = async (query) => {
    showTypingIndicator();
    chatMessages.scrollTop = chatMessages.scrollHeight;
    let botMessageElement = null,
      pElement = null,
      fullResponse = "",
      isFirstChunk = true;
    try {
      const response = await fetch(
        "https://assistant-xi.vercel.app/api/query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, history: chatHistory.slice(-6) }),
        }
      );
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const reader = response.body.getReader(),
        decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value),
          lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            if (isFirstChunk) {
              hideTypingIndicator();
              botMessageElement = document.createElement("div");
              botMessageElement.classList.add("message", "bot-message");
              botMessageElement.innerHTML = `<img src="${botAvatarUrl}" class="chat-avatar" alt="Bot Avatar"><div class="message-content"><p></p></div>`;
              chatMessages.appendChild(botMessageElement);
              pElement = botMessageElement.querySelector(".message-content p");
              pElement.classList.add("typing-cursor");
              isFirstChunk = false;
            }
            try {
              const jsonData = line.substring(6),
                parsedData = JSON.parse(jsonData),
                { token } = parsedData;
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
      if (fullResponse) chatHistory.push({ type: "ai", content: fullResponse });
    } catch (error) {
      console.error(error);
      addMessage("bot", "Sorry, I encountered an error. Please try again.");
    } finally {
      hideTypingIndicator();
      if (pElement) pElement.classList.remove("typing-cursor");
      (chatInput.disabled = false), (chatSendBtn.disabled = false);
      document.querySelector(".chat-footer").classList.remove("disabled");
      chatInput.focus();
    }
  };

  async function sendEmailWithRetry(
    serviceID,
    templateID,
    formElement,
    publicKey,
    retries = 2
  ) {
    try {
      return await emailjs.sendForm(
        serviceID,
        templateID,
        formElement,
        publicKey
      );
    } catch (error) {
      if (retries > 0) {
        console.warn(
          `EmailJS send failed. Retrying... (${retries} attempts left)`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return sendEmailWithRetry(
          serviceID,
          templateID,
          formElement,
          publicKey,
          retries - 1
        );
      }
      throw error;
    }
  } // --- Event Listeners ---

  chatToggle.addEventListener("click", toggleChatVisibility);
  chatCloseBtn.addEventListener("click", toggleChatVisibility);
  chatSendBtn.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
  }); // --- ADDED THIS BLOCK BACK --- // This new version closes the chat when the nav menu opens, without breaking the icon.

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      // Use a small delay to ensure navbar.js has updated the class first
      setTimeout(() => {
        const navMenu = document.querySelector(".nav-menu"); // Check if the nav menu is active AND the chat is shown
        if (
          navMenu &&
          navMenu.classList.contains("active") &&
          chatWidget.classList.contains("show")
        ) {
          toggleChatVisibility(); // If so, close the chat
        }
      }, 0);
    });
  } // Callback Modal Listeners

  if (
    callbackBtn &&
    modal &&
    closeBtn &&
    callbackForm &&
    heroSection &&
    toast
  ) {
    callbackBtn.onclick = openCallbackModal;
    closeBtn.onclick = closeCallbackModal;
    window.onclick = (event) => {
      if (event.target == modal) closeCallbackModal();
    };
    window.addEventListener("scroll", () => {
      if (heroSection)
        callbackBtn.classList.toggle(
          "show",
          window.scrollY > heroSection.offsetHeight
        );
    });
    callbackForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitBtn = document.getElementById("callback-submit-btn"),
        originalText = submitBtn.innerHTML;
      (submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...'),
        (submitBtn.disabled = true);
      try {
        await sendEmailWithRetry(
          "service_be02eae",
          "template_lpeyq9q",
          callbackForm,
          "aiyuFrLrbhA3x5BuI"
        );
        closeCallbackModal();
        toast.classList.add("show"),
          setTimeout(() => toast.classList.remove("show"), 3000);
        callbackForm.reset();
      } catch (error) {
        console.error("Callback form submission failed:", error);
        alert("Sorry, there was an error submitting your request.");
      } finally {
        (submitBtn.innerHTML = originalText), (submitBtn.disabled = false);
      }
    });
  } else {
    console.error("One or more callback feature elements were not found.");
  }
  showWelcomeMessage();
});
