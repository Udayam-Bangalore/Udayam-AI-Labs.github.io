function validarSinEspeciales(textDemo) {
  if (/[<>\/\\{}[\]$#%^&*|~`]/.test(textDemo)) {
    return false;
  }
  return /^[\w\s@.,+–\-¡!¿?áéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙçÇ:;"'()¿¡\n\r\t]*$/.test(
    textDemo
  );
}

function validarTelefono(texto) {
  const regex = /^[0-9\s\-()\+.]+$/;
  return regex.test(texto);
}

// Brochure Download Modal Functions (Global Scope)
function openModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.classList.add("active");
  }
}

function closeModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
  }
  resetForm();
}

function resetForm() {
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("emailError").classList.remove("active");
  document.getElementById("phoneError").classList.remove("active");
  document.getElementById("generalError").classList.remove("active");
  document.getElementById("generalError").textContent = "";
  document.getElementById("formContent").style.display = "block";
  document.getElementById("successContent").style.display = "none";
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("submitBtn").textContent = "Enviar y descargar";
}

function handleSubmit(event) {
  event.preventDefault();
  emailjs.init("ilcGOCulCPRqjQQDb");
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const generalError = document.getElementById("generalError");
  const submitBtn = document.getElementById("submitBtn");
  emailError.classList.remove("active");
  phoneError.classList.remove("active");
  generalError.classList.remove("active");
  let isValid = true;
  if (!email) {
    emailError.textContent = "Please type your email";
    emailError.classList.add("active");
    isValid = false;
  } else if (!validarSinEspeciales(email)) {
    emailError.textContent =
      "The email address contains unauthorised characters.";
    emailError.classList.add("active");
    isValid = false;
  } else if (!email.includes("@")) {
    emailError.textContent = "Please enter a valid email";
    emailError.classList.add("active");
    isValid = false;
  }
  if (!phone) {
    phoneError.textContent = "Type your phone";
    phoneError.classList.add("active");
    isValid = false;
  } else if (!validarTelefono(phone)) {
    phoneError.textContent = "This number contains unauthorised characters.";
    phoneError.classList.add("active");
    isValid = false;
  }
  if (!isValid) return;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  const templateParams = {
    email: email,
    phone: phone,
  };
  emailjs.send("service_vetmuad", "template_p70cppb", templateParams).then(
    function (response) {
      console.log("This Email was sended sucessfully:", response);
      document.getElementById("formContent").style.display = "none";
      document.getElementById("successContent").style.display = "block";
    },
    function (error) {
      console.error("An error has ocurred:", error);
      generalError.textContent =
        "Error while attempting to send the information. Please try again.";
      generalError.classList.add("active");
      submitBtn.disabled = false;
      submitBtn.textContent = "Send and Download";
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  // 1. Animate elements on scroll
  if (
    document.querySelector(".service-card") ||
    document.querySelector(".photo-card") ||
    document.querySelector(".about-content p")
  ) {
    const animatedElements = document.querySelectorAll(
      ".service-card, .photo-card, .about-content p"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
    animatedElements.forEach((element) => {
      observer.observe(element);
      element.classList.add("pre-animation");
    });
  } // 2. Training highlights card slider

  if (
    document.getElementById("prevBtn") &&
    document.getElementById("nextBtn") &&
    document.getElementById("dotsContainer")
  ) {
    const cardData = [
      {
        image: {
          src: "assets/images/training3.webp",
          alt: "School Trainings Img",
        },
        title: "School Trainings",
        description:
          "Introducing young learners to the word of artificial intelligence.",
        reviewer: {
          comment:
            '"Amazing program! My daughter loves the hands-on robotics sessions and has learned so much about technology."',
          name: "Ananya G",
          designation: "Baldwin Girls' High School",
          location: "Bangalore",
        },
      },
      {
        image: {
          src: "assets/images/training1.webp",
          alt: "Faculty Development Programs Img",
        },
        title: "Faculty Development Programs",
        description:
          "Faculty learning practical Al implementation through guided exercises.",
        reviewer: {
          comment:
            '"Really this workshop builds confidence to make creative ideas for teaching process."',
          name: "Priyanka M",
          designation: "TGT Science",
          location: "PPS Bengaluru",
        },
      },
      {
        image: {
          src: "assets/images/training2.webp",
          alt: "Corporate Trainings Img",
        },
        title: "Corporate Trainings",
        description:
          "Professionals enchancing their AI skills in an interactive setting.",
        reviewer: {
          comment:
            '"The corporate training by Udayam AI Labs was highly engaging and practical. Mr. Udayraj Patare delivered complex AI concepts with clarity, real-world examples, and hands-on activities. Our team walked away with future-ready skills that we can apply immediately in our work."',
          name: "MR.TEJAS INAGALE",
          designation: "KAIZEN ENGINEERING",
          location: "Ahilyanagar, Maharashtra",
        },
      },
      {
        image: {
          src: "assets/images/training4.webp",
          alt: "Advanced Techniques Img",
        },
        title: "Advanced Techniques",
        description:
          "Exploring cutting-edge AI methodologies with our expert trainers.",
        reviewer: {
          comment:
            '"It was a good opportunity to learn AI in Pharma and i am interested to apply it in my future research."',
          name: "Ayesha S",
          designation: "Pharmaceutical Analysis Dept",
          location: "NIPER-Kolkata",
        },
      },
    ];
    const dotsContainer = document.getElementById("dotsContainer");
    let currentTrainingCardIndex = 0;

    function renderCard(index) {
      const data = cardData[index];
      document.getElementById("cardImage").src = data.image.src;
      document.getElementById("cardImage").alt = data.image.alt;
      document.getElementById("cardTitle").textContent = data.title;
      document.getElementById("cardDescription").textContent = data.description;
      let formattedName = data.reviewer.name;
      if (data.reviewer.designation && data.reviewer.location) {
        formattedName += `, ${data.reviewer.designation} (${data.reviewer.location})`;
      } else if (data.reviewer.designation) {
        formattedName += `, ${data.reviewer.designation}`;
      } else if (data.reviewer.location) {
        formattedName += ` (${data.reviewer.location})`;
      }
      document.getElementById("userName").textContent = formattedName;
      document.getElementById("userComment").textContent =
        data.reviewer.comment;
      document.getElementById("userInitials").textContent = data.reviewer.name
        .trim()
        .split(/\s+/)
        .map((w) => w[0].toUpperCase())
        .slice(0, 2)
        .join("");
      renderDots();
    }

    function renderDots() {
      dotsContainer.innerHTML = "";
      cardData.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className =
          "dot" + (i === currentTrainingCardIndex ? " active" : "");
        dot.type = "button";
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        if (i === currentTrainingCardIndex) {
          dot.setAttribute("aria-current", "true");
        }
        dot.addEventListener("click", () => {
          currentTrainingCardIndex = i;
          renderCard(currentTrainingCardIndex);
        });
        dot.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight") {
            const next = (i + 1) % cardData.length;
            dotsContainer.children[next].focus();
            currentTrainingCardIndex = next;
            renderCard(next);
          } else if (e.key === "ArrowLeft") {
            const prev = (i - 1 + cardData.length) % cardData.length;
            dotsContainer.children[prev].focus();
            currentTrainingCardIndex = prev;
            renderCard(prev);
          }
        });
        dotsContainer.appendChild(dot);
      });
    }
    document.getElementById("prevBtn").addEventListener("click", () => {
      currentTrainingCardIndex =
        (currentTrainingCardIndex - 1 + cardData.length) % cardData.length;
      renderCard(currentTrainingCardIndex);
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
      currentTrainingCardIndex =
        (currentTrainingCardIndex + 1) % cardData.length;
      renderCard(currentTrainingCardIndex);
    });
    renderCard(currentTrainingCardIndex);
  } // 3. Accordion-toggle elements

  if (document.querySelector(".accordion-item")) {
    const firstItem = document.querySelector(".accordion-item");
    if (firstItem) {
      firstItem.classList.add("active");
    }
    document.querySelectorAll(".accordion-header").forEach((header) => {
      header.addEventListener("click", () => {
        toggleAccordion(header);
      });
      header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleAccordion(header);
        }
      });
    });

    function toggleAccordion(header) {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");
      document
        .querySelectorAll(".accordion-item")
        .forEach((i) => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    }
  } // 4. Go up button function

  if (document.getElementById("btnUp")) {
    const btnUp = document.getElementById("btnUp");
    window.addEventListener("scroll", function () {
      btnUp.classList.toggle("show", window.pageYOffset > 300);
    });
    btnUp.addEventListener("click", function () {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    });
  } // 5. EmailJS Forms Logic

  if (
    document.getElementById("contact-form") ||
    document.getElementById("demo-registration-form")
  ) {
    const maxRetries = 2;
    const delay = 1000;
    let emailjsInitialized = false;

    async function sendEmailWithRetry(formData, retries = maxRetries) {
      try {
        if (!emailjsInitialized) {
          emailjs.init("r8071XjnXsbmJjqpz");
          emailjsInitialized = true;
        }
        const serviceID =
          formData.id === "contact-form"
            ? "service_1gtj9qj"
            : "ANOTHER_SERVICE_ID_FOR_DEMO";
        const templateID =
          formData.id === "contact-form"
            ? "template_uk7gybo"
            : "ANOTHER_TEMPLATE_ID_FOR_DEMO";
        return await emailjs.sendForm(serviceID, templateID, formData);
      } catch (error) {
        if (retries > 0) {
          console.log(
            `Reintentando envío... (${
              maxRetries - retries + 1
            } / ${maxRetries})`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          return sendEmailWithRetry(formData, retries - 1);
        }
        throw error;
      }
    } // Handler for Contact Form

    if (
      document.getElementById("contact-form") &&
      document.getElementById("submitBtn")
    ) {
      // Assuming contact form submit is #submitBtn
      async function showAlert(event) {
        event.preventDefault();
        const form = event.target;
        const contactsubmitBtn = document.getElementById("submitBtn"); // Changed to submitBtn
        const originalText = contactsubmitBtn.innerHTML;
        let isFieldValid = true;
        const inputs = form.querySelectorAll('input[type="text"], textarea');
        for (let InputField of inputs) {
          if (!validarSinEspeciales(InputField.value)) {
            alert(
              `The field "${InputField.name}" contains unauthorised characters.`
            );
            InputField.focus();
            isFieldValid = false;
            break;
          }
        }
        if (!isFieldValid) return false;

        contactsubmitBtn.classList.add("loading");
        contactsubmitBtn.disabled = true;
        try {
          const response = await sendEmailWithRetry(form);
          console.log("success", response.status, response.text);
          alert(" Your message was sent successfully!! ");
          form.reset();
          setTimeout(() => {
            window.location.href = "#";
          }, 1000);
        } catch (error) {
          console.log("failed", error);
          let errorMessage =
            "Sorry, there was an error sending your message. Please try again. ";
          if (error?.status === 0 || error?.toString().includes("Network")) {
            errorMessage +=
              " Please check your internet connection and try again.";
          } else if (error?.status >= 500) {
            errorMessage +=
              " Our server is having issues. Please try again in a few minutes.";
          } else {
            errorMessage +=
              " Please try again or contact us directly at support@udayam.co.in ";
          }
          alert(errorMessage);
        } finally {
          setTimeout(() => {
            contactsubmitBtn.innerHTML = originalText;
            contactsubmitBtn.disabled = false;
            contactsubmitBtn.classList.remove("loading");
          }, 500);
        }
      }
      document
        .getElementById("contact-form")
        .addEventListener("submit", showAlert);
    } // Handler for Demo Registration Form

    if (
      document.getElementById("demo-registration-form") &&
      document.getElementById("demo-submit-btn")
    ) {
      async function showAlertDemo(event) {
        event.preventDefault();
        const demoForm = event.target;
        const demoSubmitBtn = document.getElementById("demo-submit-btn");
        const originalText = demoSubmitBtn.innerHTML;
        let isValid = true;
        const textInputs = demoForm.querySelectorAll('input[type="text"]');
        for (let Input of textInputs) {
          if (!validarSinEspeciales(Input.value)) {
            alert(
              `The field "${Input.name}" contains unauthorised characters.`
            );
            Input.focus();
            isValid = false;
            break;
          }
        }
        if (isValid) {
          const phoneInput = demoForm.querySelector('input[type="tel"]');
          if (phoneInput && !validarTelefono(phoneInput.value)) {
            alert(`The phone number contains unauthorised characters.`);
            phoneInput.focus();
            isValid = false;
          }
        }
        if (!isValid) return false;

        demoSubmitBtn.classList.add("loading");
        demoSubmitBtn.disabled = true;
        try {
          const response = await sendEmailWithRetry(demoForm);
          console.log("success", response.status, response.text);
          alert(
            " Your demo request was sent successfully!! We'll contact you soon. "
          );
          demoForm.reset();
          const modal = document.getElementById("demo-modal");
          if (modal) {
            setTimeout(() => {
              modal.classList.remove("sliding");
            }, 1000);
          }
        } catch (error) {
          console.log("failed", error);
          let errorMessage =
            "Sorry, there was an error sending your request. Please try again. ";
          if (error?.status === 0 || error?.toString().includes("Network")) {
            errorMessage +=
              " Please check your internet connection and try again.";
          } else if (error?.status >= 500) {
            errorMessage +=
              " Our server is having issues. Please try again in a few minutes.";
          } else {
            errorMessage +=
              " Please try again or contact us directly at support@udayam.co.in ";
          }
          alert(errorMessage);
        } finally {
          setTimeout(() => {
            demoSubmitBtn.innerHTML = originalText;
            demoSubmitBtn.disabled = false;
            demoSubmitBtn.classList.remove("loading");
          }, 500);
        }
      }
      document
        .getElementById("demo-registration-form")
        .addEventListener("submit", showAlertDemo);
    }
  } // 6. Dropdown menu support for mobile

  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  if (dropdownToggles.length > 0) {
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        const dropdown = this.closest(".dropdown");
        if (window.innerWidth <= 992) {
          const isActive = dropdown.classList.toggle("active");
          this.setAttribute("aria-expanded", isActive);
          dropdownToggles.forEach((otherToggle) => {
            const otherDropDown = otherToggle.closest(".dropdown");
            if (otherDropDown !== dropdown) {
              otherDropDown.classList.remove("active");
              otherToggle.setAttribute("aria-expanded", false);
            }
          });
        }
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".dropdown")) {
        dropdownToggles.forEach((toggle) => {
          const dropdownElement = toggle.closest(".dropdown");
          dropdownElement.classList.remove("active");
          toggle.setAttribute("aria-expanded", false);
        });
      }
    });
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });
  } // 7. Partners section slider

  const track = document.getElementById("partnersTrack");
  if (track) {
    const partners = [
      {
        name: "Kaizen Engineers",
        logo: "./assets/images/partners/kaizen.png",
        url: "https://kaizengroup.co.in/",
      },
      {
        name: "STEMpedia",
        logo: "./assets/images/partners/stempedia.png",
        url: "https://thestempedia.com/",
      },
      {
        name: "Ramaiah University of Applied Sciences",
        logo: "./assets/images/partners/ramaiah.png",
        url: "https://www.msruas.ac.in/",
      },
      {
        name: "Ambition Biology Academy Ahmednagar",
        logo: "./assets/images/partners/ambitionscience.png",
        url: "https://www.justdial.com/Ahmednagar/Ambition-Biology-Academy-Near-Morya-Mangal-Karyalaya-Savedi/9999PX241-X241-211211124847-R1E9_BZDET",
      },
      {
        name: "Dr. Babasaheb Ambedkar Marathwada University",
        logo: "./assets/images/partners/dr babasaheb.png",
        url: "http://bamu.ac.in/",
      },
      {
        name: "Dr. Vithalrao Vikhe Patil Foundation's",
        logo: "./assets/images/partners/dr vithalrao.png",
        url: "https://www.vimscopt.edu.in/",
      },
      {
        name: "ISBR Business School,",
        logo: "./assets/images/partners/isbr.png",
        url: "https://www.isbr.in/",
      },
      {
        name: "National Institute of Pharmaceutical Education and Research, Kolkata",
        logo: "./assets/images/partners/kolkata.png",
        url: "https://www.niperkolkata.edu.in/ ",
      },
      {
        name: "Pune District Education Association, Pune",
        logo: "./assets/images/partners/pdea.png",
        url: "https://www.pdeapune.org/",
      },
      {
        name: "Swami Ramanand Teerth Marathwada University",
        logo: "./assets/images/partners/swami.png",
        url: "https://srtmun.ac.in/en/",
      },
    ];
    function createLogos(e) {
      return `<a href="${e.url}" target="_blank" class="partner-logo-image" aria-label="${e.name}" title="${e.name}"><img src="${e.logo}" alt="${e.name} logo"></a>`;
    }
    const logosHTML = partners.map(createLogos).join("");
    track.innerHTML = logosHTML + logosHTML;
    class PartnersSlider {
      constructor() {
        this.track = document.getElementById("partnersTrack");
        this.isPaused = false;
        this.init();
      }
      init() {
        this.track.addEventListener("mouseenter", () => this.pause());
        this.track.addEventListener("mouseleave", () => this.resume());
        this.track.addEventListener("touchstart", () => this.pause());
        this.track.addEventListener("touchend", () => this.delayedResume());
      }
      pause() {
        if (!this.isPaused) {
          this.track.classList.add("paused");
          this.isPaused = true;
        }
      }
      resume() {
        if (this.isPaused) {
          this.track.classList.remove("paused");
          this.isPaused = false;
        }
      }
      delayedResume() {
        setTimeout(() => this.resume(), 5000);
      }
    }
    new PartnersSlider();
  } // 8. Brochure Modal Listeners

  const overlay = document.getElementById("modalOverlay");
  if (overlay) {
    overlay.addEventListener("click", function (event) {
      if (event.target === this) {
        closeModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("active")) {
        closeModal();
      }
    });
  } // 9. Gallery and Lightbox

  const galleryElement = document.querySelector(".gallery");
  if (galleryElement) {
    const cardData = [
      {
        image: "./assets/images/gallery/1.jpg",
        title: "Introduction to AI",
        subtitle: "Mahesh Munot High School",
        category: "school",
      },
      {
        image: "./assets/images/gallery/5.jpg",
        title: "Data Science",
        subtitle: "University of Pune",
        category: "university",
      },
      {
        image: "./assets/images/gallery/14.jpg",
        title: "Mathematical Techniques in Data Science",
        subtitle: "Sardar Vallabhbhai Patel University",
        category: "university",
      },
      {
        image: "./assets/images/gallery/30.jpg",
        title: "Introduction to AI",
        subtitle: "Latur Subcenter",
        category: "university",
      },
      {
        image: "./assets/images/gallery/44.jpg",
        title: "Mathematics and ML",
        subtitle: "Ahmednagar College",
        category: "university",
      },
      {
        image: "./assets/images/gallery/64.jpg",
        title: "Machine Learning",
        subtitle: "Vikhe Patil Eng. College",
        category: "university",
      },
      {
        image: "./assets/images/gallery/68.jpg",
        title: "Mathematical Techniques in Data Science",
        subtitle: "More College Akurdi pune",
        category: "university",
      },
      {
        image: "./assets/images/gallery/78.jpg",
        title: "National Mathematics Day",
        subtitle: "Annasaheb magar College,Hadapsar",
        category: "university",
      },
      {
        image: "./assets/images/gallery/81.jpg",
        title: "MOU",
        subtitle: "Annasaheb magar College,Hadapsar",
        category: "university",
      },
      {
        image: "./assets/images/gallery/31.jpg",
        title: "Introduction to AI",
        subtitle: "Latur Subcenter",
        category: "university",
      },
      {
        image: "./assets/images/gallery/82.jpg",
        title: "AI for Young Innovators",
        subtitle: "Dr. Vithalrao Vikhe Patil Foundation's",
        category: "school",
      },
      {
        image: "./assets/images/gallery/83.jpg",
        title: "AI Bussiness Directors",
        subtitle: "MIDC, Ahilyanagar",
        category: "corporate",
      },
      {
        image: "./assets/images/gallery/84.jpg",
        title: "Navigating AI-Driven Opportunities",
        subtitle: "Dr. Babasaheb Ambedkar Marathwada University",
        category: "corporate",
      },
      {
        image: "./assets/images/gallery/85.jpg",
        title: "Industrial Training for Statistics Students",
        subtitle: "Swami Ramanand Teerth Marathwada University",
        category: "university",
      },
      {
        image: "./assets/images/gallery/86.jpg",
        title: "Machine Learning Training",
        subtitle: "Dr.Ramkrushna More College Akurdi",
        category: "university",
      },
      {
        image: "./assets/images/gallery/87.jpg",
        title: "AI Session",
        subtitle: "Kendriya vidyalaya, AhilyaNagar",
        category: "school",
      },
      {
        image: "./assets/images/gallery/88.jpg",
        title: "AI in Healthcare",
        subtitle: "Dr. Vikhe Patil Foundation Medical college",
        category: "corporate",
      },
      {
        image: "./assets/images/gallery/89.jpg",
        title: "AI in Healthcare Workshop",
        subtitle: "ASCOMS & Hospital, Jammu",
        category: "corporate",
      },
      {
        image: "./assets/images/gallery/90.jpg",
        title: "AI for Educators",
        subtitle: "Police Public School, Bengaluru",
        category: "school",
      },
      {
        image: "./assets/images/gallery/91.jpg",
        title: "AI for Young Innovators",
        subtitle: "KV Sunjuwan, Jammu",
        category: "school",
      },
    ];
    let currentFilter = "all";
    let currentLightboxIndex = 0;
    let filteredData = [];

    function initGallery() {
      renderGallery();
      setupEventListeners();
    }

    function renderGallery() {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      filteredData =
        currentFilter === "all"
          ? [...cardData]
          : cardData.filter((card) => card.category === currentFilter);
      filteredData.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "training-card";
        cardElement.dataset.index = index;
        cardElement.innerHTML = `
          <div class="training-card-image">
            <img src="${card.image}" alt="${card.title}">
            <div class="institution-badge">${getCategoryName(
              card.category
            )}</div>
          </div>
          <div class="training-card-content">
            <h3 class="training-card-title">${card.title}</h3>
            <p class="training-card-subtitle">${card.subtitle}</p>
          </div>
        `;
        gallery.appendChild(cardElement);
      });
    }

    function getCategoryName(category) {
      const categories = {
        university: "University",
        school: "Schools",
        corporate: "Corporate",
      };
      return categories[category] || category;
    }

    function setupEventListeners() {
      document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", () => {
          document
            .querySelectorAll(".filter-btn")
            .forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
          currentFilter = button.dataset.filter;
          renderGallery();
        });
      });
      document.addEventListener("click", (e) => {
        const card = e.target.closest(".training-card");
        if (card) {
          openLightbox(parseInt(card.dataset.index));
        }
      });
      document
        .getElementById("lightboxClose")
        .addEventListener("click", closeLightbox);
      document
        .getElementById("prevBtn")
        .addEventListener("click", () => navigateLightbox(-1));
      document
        .getElementById("nextBtn")
        .addEventListener("click", () => navigateLightbox(1));
      document.addEventListener("keydown", (e) => {
        if (document.getElementById("lightbox").classList.contains("active")) {
          if (e.key === "Escape") closeLightbox();
          if (e.key === "ArrowLeft") navigateLightbox(-1);
          if (e.key === "ArrowRight") navigateLightbox(1);
        }
      });
      const lightbox = document.getElementById("lightbox");
      lightbox.addEventListener("click", (i) => {
        if (i.target === lightbox) {
          closeLightbox();
        }
      });
      let touchStartX = 0,
        touchEndX = 0;
      lightbox.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        false
      );
      lightbox.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        },
        false
      );

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) navigateLightbox(1);
        if (touchEndX > touchStartX + swipeThreshold) navigateLightbox(-1);
      }
    }

    function openLightbox(index) {
      currentLightboxIndex = index;
      const lightbox = document.getElementById("lightbox");
      const lightboxImage = document.getElementById("lightboxImage");
      const lightboxTitle = document.getElementById("lightboxTitle");
      const lightboxSubtitle = document.getElementById("lightboxSubtitle");
      lightboxImage.classList.add("changing");
      setTimeout(() => {
        lightboxImage.src = filteredData[index].image;
        lightboxImage.alt = filteredData[index].alt;
        lightboxTitle.textContent = filteredData[index].title;
        lightboxSubtitle.textContent = filteredData[index].subtitle;
        setTimeout(() => {
          lightboxImage.classList.remove("changing");
        }, 50);
      }, 250);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      document.getElementById("lightbox").classList.remove("active");
      document.body.style.overflow = "";
    }

    function navigateLightbox(direction) {
      let newIndex =
        (currentLightboxIndex + direction + filteredData.length) %
        filteredData.length;
      openLightbox(newIndex);
    }
    initGallery();
  } // 10. Service card expanded

  if (document.querySelector(".service-card")) {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("click", function (i) {
        i.stopPropagation();
        const desc = this.querySelector(".service-desc");
        const isExpanded = desc.classList.contains("expanded");
        document.querySelectorAll(".service-desc").forEach((p) => {
          p.classList.remove("expanded");
        });
        if (!isExpanded) {
          desc.classList.add("expanded");
        }
      });
    });
  } // 11. Event Registration Form

  const eventModal = document.getElementById("event-registration-modal");
  const eventCloseBtn = document.querySelector(".event-registration-close-btn");
  const eventRegisterBtns = document.querySelectorAll(".event-btn");
  const eventSelect = document.getElementById("event");
  if (eventModal && eventCloseBtn && eventRegisterBtns.length > 0) {
    eventRegisterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const course = btn.getAttribute("data-event");
        eventModal.style.display = "flex";
        if (eventSelect) eventSelect.value = course;
      });
    });
    eventCloseBtn.addEventListener("click", () => {
      eventModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === eventModal) eventModal.style.display = "none";
    });
  } // 12. Course Registration Form

  const courseModal = document.getElementById("course-registration-modal");
  const courseCloseBtn = document.querySelector(
    ".course-registration-close-btn"
  );
  const courseRegisterBtns = document.querySelectorAll("#course-btn");
  const courseSelect = document.getElementById("course");
  if (courseModal && courseCloseBtn && courseRegisterBtns.length > 0) {
    courseRegisterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const course = btn.getAttribute("data-course");
        courseModal.style.display = "flex";
        if (courseSelect) courseSelect.value = course; // Changed from eventSelect
      });
    });
    courseCloseBtn.addEventListener("click", () => {
      courseModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === courseModal) courseModal.style.display = "none"; // Changed from modal
    });
  } // 13. Book A Demo (Sliding Window)

  const bookModal = document.getElementById("demo-modal");
  const demoCloseBtn = document.querySelector(".demo-close-btn");
  const bookDemoBtn = document.getElementById("book-demo");
  if (bookDemoBtn && bookModal && demoCloseBtn) {
    bookDemoBtn.addEventListener("click", () => {
      bookModal.classList.add("sliding");
    });
    demoCloseBtn.addEventListener("click", () => {
      bookModal.classList.remove("sliding");
    });
    window.addEventListener("click", (e) => {
      if (e.target === bookModal) bookModal.classList.remove("sliding");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && bookModal.classList.contains("sliding")) {
        bookModal.classList.remove("sliding");
      }
    });
  } // 14. Offline Workshop Location Dropdown

  const findLocationBtn = document.getElementById("find-location-btn");
  if (findLocationBtn) {
    findLocationBtn.addEventListener("click", function () {
      this.classList.add("hidden");
      const dropdown = document.getElementById("workshop-location");
      dropdown.classList.remove("hidden");
    });
  }
});
