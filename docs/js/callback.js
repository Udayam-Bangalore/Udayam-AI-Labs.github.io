document.addEventListener("DOMContentLoaded", () => {
  const callbackBtn = document.getElementById("request-callback-btn");
  const modal = document.getElementById("callback-modal");
  const closeBtn = document.querySelector(".callback-close-btn");
  const callbackForm = document.getElementById("callback-form");
  const heroSection = document.getElementById("hero-section");
  const toast = document.getElementById("toast");

  if (
    !callbackBtn ||
    !modal ||
    !closeBtn ||
    !callbackForm ||
    !heroSection ||
    !toast
  ) {
    console.error("Callback feature element(s) not found.");
    return;
  }

  callbackBtn.onclick = () => {
    modal.style.display = "flex";
  };
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  window.addEventListener("scroll", () => {
    if (heroSection) {
      callbackBtn.classList.toggle(
        "show",
        window.scrollY > heroSection.offsetHeight
      );
    }
  });

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
  }

  callbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById("callback-submit-btn");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const serviceID = "service_be02eae";
      const templateID = "template_lpeyq9q";
      const publicKey = "aiyuFrLrbhA3x5BuI";

      await sendEmailWithRetry(serviceID, templateID, callbackForm, publicKey);

      modal.style.display = "none";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
      callbackForm.reset();
    } catch (error) {
      console.error("Callback form submission failed:", error);
      alert(
        "Sorry, there was an error submitting your request. Please check the developer console for more details."
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
});
