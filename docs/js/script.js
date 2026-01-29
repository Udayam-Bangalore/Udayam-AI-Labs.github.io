/* !!important: we prevent special characters from being entered */
function validarSinEspeciales(textDemo) {
  // 1. block code chars
  if (/[<>\/\\{}[\]$#%^&*|~`]/.test(textDemo)) {
    return false;
  }
  // 2. allow secure characters
  return /^[\w\s@.,+–\-¡!¿?áéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙçÇ:;"'()¿¡\n\r\t]*$/.test(
    textDemo
  );
}
function validarTelefono(texto) {
  // Permite solo números, espacios, guiones y paréntesis
  const regex = /^[0-9\s\-()\+.]+$/;
  return regex.test(texto);
}

/*  unified code to avoid conflicts between events */
document.addEventListener("DOMContentLoaded", function () {
  // 2. Starts to Add animation classes to elements when they come into view
  // vefiry if the element exist:
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
  }
  // Ends to Add animation classes to elements when they come into


  // 3. Starts Training highlights card details (swipper)
  // vefiry if the element exist:
  if (
    document.getElementById("prevBtn") &&
    document.getElementById("nextBtn") &&
    document.getElementById("dotsContainer")
  ) {
    const cardData = [
      {
        image: {
          src: "assets/images/udayam-school-ai-training.png",
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
          src: "assets/images/udayam-faculty-development-program.png",
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
          src: "assets/images/udayam-corporate-ai-training.png",
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
          src: "assets/images/udayam-advanced-ai-techniques-training.png",
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
    const cardElement = document.getElementById("card");
    let currentTrainingCardIndex = 0;

    function renderCard(index) {

      const data = cardData[index];
      cardElement.style.opacity = "0";

      setTimeout(() => {    
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
        document.getElementById("userComment").textContent = data.reviewer.comment;

        document.getElementById("userInitials").textContent = data.reviewer.name
        .trim()
        .split(/\s+/)
        .map((w) => w[0].toUpperCase())
        .slice(0, 2)
        .join("");

        renderDots();

        setTimeout(() => { cardElement.style.opacity = "1";
        }, 250);

      }, 250);

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
    // move to left
    document.getElementById("prevBtn").addEventListener("click", () => {
      currentTrainingCardIndex =
        (currentTrainingCardIndex - 1 + cardData.length) % cardData.length;
      renderCard(currentTrainingCardIndex);
    });
    // move to right
    document.getElementById("nextBtn").addEventListener("click", () => {
      currentTrainingCardIndex =
        (currentTrainingCardIndex + 1) % cardData.length;
      renderCard(currentTrainingCardIndex);
    });
    renderCard(currentTrainingCardIndex);
  }
  // Ends Training highlights card details (swipper)


  // 4. Starts Accordion-toggle elements:
  // vefiry if the element exist:
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
        if (e.key === "Enter" || e.key === "") {
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
  }
  // Ends Accordion-toggle elements


  // 5. Starts go up function:
  // verify if the element exist
  if (document.getElementById("btnUp")) {
    const btnUp = document.getElementById("btnUp");
    // Show or hide the button depending on the scroll position:
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        btnUp.classList.add("show");
      } else {
        btnUp.classList.remove("show");
      }
    });
    // Smooth upward scroll with delay
    btnUp.addEventListener("click", function () {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    });
  }
  // Ends go up function


  /* 📧📧📧 6. Starts send emails function with EmailJS(Contact Form + Demo Modal) 📧📧📧*/
  /* Starts "Open/Close Book a Demo Modal": */
  /* Book A Demo (Sliding Class) */
  const bookModal = document.getElementById("demo-modal"); /* overlay */
  const demoCloseBtn =
    document.getElementById("demo-close-btn"); /* red rounded btn */
  const bookDemoBtn =
    document.getElementById("book-demo"); /* book a demo hero btn */
  /* if the demo modal elements exist */
  if (bookDemoBtn && bookModal && demoCloseBtn) {
    // open book a demo modal window
    bookDemoBtn.addEventListener("click", () => {
      bookModal.classList.add("sliding");
      document.body.style.overflow = "hidden"; // stop scroll propagation
    });
    // close book a demo modal window # 1:
    demoCloseBtn.addEventListener("click", () => {
      bookModal.classList.remove("sliding");
      document.body.style.overflow = ""; // when the window closes the document reactives other pointer events
    });
    /* close book a demo window #2: clic on the window overlay */
    window.addEventListener("click", (e) => {
      if (e.target === bookModal) {
        bookModal.classList.remove("sliding");
        ("active");
        document.body.style.overflow = "";
      }
    });
    /* close book a demo window #3: if the user press esc key, the window closes */
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        bookModal &&
        bookModal.classList.contains("sliding")
      ) {
        bookModal.classList.remove("sliding");
        ("active");
        document.body.style.overflow = "";
      }
    });
  }
  /* Ends "Open/Close Book a Demo Modal" */

  // global variables (contact and book a demo form)
  const maxRetries = 2;
  const delay = 1000;
  let emailjsInitialized = false;

  // retry send (contact and book a demo form)
  async function sendEmailWithRetry(formData, retries = maxRetries) {
    try {
      if (!emailjsInitialized) {
        emailjs.init("r8071XjnXsbmJjqpz"); // public key
        emailjsInitialized = true;
      }

      const response = await emailjs.sendForm(
        "service_1gtj9qj",
        "template_uk7gybo",
        formData
      );
      return response;
    } catch (error) {
      if (retries > 0) {
        console.log(
          `Reintentando envío... (${maxRetries - retries + 1} / ${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return sendEmailWithRetry(formData, retries - 1);
      }
      throw error;
    }
  }
  // contact form: verify if the contact form elements exist:
  if (
    document.getElementById("contact-form") &&
    document.getElementById("contactSubmitBtn")
  ) {
    /* send email without retries or errors */
    async function showAlert(event) {
      event.preventDefault(); // website will not reload, post method blocked
      /* reject special char and charge send btn */
      const form = event.target; // get form data
      const contactsubmitBtn = document.getElementById("contactSubmitBtn"); // cta button
      const originalText = contactsubmitBtn.innerHTML; // cta inner text
      let isFieldValid = true;

      // Validar todos los campos de texto, email y textarea
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
      // if validation fails, stop sending
      if (!isFieldValid) {
        return false;
      }
      // "sending" animation in the submit button:
      contactsubmitBtn.classList.add("loading");
      contactsubmitBtn.disabled = true;
      contactsubmitBtn.style.opacity = "0.5";
      contactsubmitBtn.style.pointerEvents = "none";
      contactsubmitBtn.style.cursor = "not-allowed";

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await sendEmailWithRetry(form); // check that there are no errors
        console.log("success", response.status, response.text);
        alert(" Your message was sent successfully!! ");
        form.reset(); // clean all input fields

        // If the email is sent successfully, redirect to the home page:
        setTimeout(() => {
          window.location.href = "#";
        }, 1000);
      } catch (error) {
        // show error messages
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
        // Restore original styles to the button submit (in case of success or error):
        setTimeout(() => {
          contactsubmitBtn.innerHTML = originalText;
          contactsubmitBtn.disabled = false;
          contactsubmitBtn.style.opacity = "1";
          contactsubmitBtn.style.pointerEvents = "auto";
          contactsubmitBtn.style.cursor = "pointer";
          contactsubmitBtn.classList.remove("loading");
        }, 500);
      }

      return false;
    }

    document
      .getElementById("contact-form")
      .addEventListener("submit", showAlert);
  }
  // Demo Registration Form: if the demo form elements exists:
  if (
    document.getElementById("demo-registration-form") &&
    document.getElementById("demo-submit-btn")
  ) {
    /* send email for demo modal */
    async function showAlertDemo(event) {
      event.preventDefault();
      const demoForm = event.target;
      const demoSubmitBtn = document.getElementById("demo-submit-btn");
      const originalText = demoSubmitBtn.innerHTML;
      let isValid = true;
      
      // Validar todos los campos (text, email, tel)
      const textInputs = demoForm.querySelectorAll('input[type="text"]');
      for (let Input of textInputs) {
        if (!validarSinEspeciales(Input.value)) {
          alert(`The field "${Input.name}" contains unauthorised characters.`);
          Input.focus();
          isValid = false;
          break;
        }
      }

      // Validar teléfono por separado
      if (isValid) {
        const phoneInput = demoForm.querySelector('input[type="tel"]');
        if (phoneInput && !validarTelefono(phoneInput.value)) {
          alert(`The phone number contains unauthorised characters.`);
          phoneInput.focus();
          isValid = false;
        }
      }

      if (!isValid) {
        return false;
      }

      // "sending" animation in the submit button:
      demoSubmitBtn.classList.add("loading");
      demoSubmitBtn.disabled = true;
      demoSubmitBtn.style.opacity = "0.5";
      demoSubmitBtn.style.pointerEvents = "none";
      demoSubmitBtn.style.cursor = "not-allowed";

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await sendEmailWithRetry(demoForm);
        console.log("success", response.status, response.text);
        alert(
          " Your demo request was sent successfully!! We'll contact you soon. "
        );
        demoForm.reset();

        // Cerrar el modal después de envío exitoso
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
          demoSubmitBtn.style.opacity = "1";
          demoSubmitBtn.style.pointerEvents = "auto";
          demoSubmitBtn.style.cursor = "pointer";
          demoSubmitBtn.classList.remove("loading");
        }, 500);
      }

      return false;
    }

    document
      .getElementById("demo-registration-form")
      .addEventListener("submit", showAlertDemo);
  }
  /*  📧📧📧 Ends send emails function with EmailJS(Contact Form + Demo Modal)  📧📧📧*/


  /* 8. starts partners section */
  // create parteners data:
  const partners = [
    {
      // kaizen engineers
      name: "Kaizen Engineers",
      logo: "./assets/images/partners/kaizen.png",
      url: "https://kaizengroup.co.in/",
    },
    {
      // stempedia
      name: "STEMpedia",
      logo: "./assets/images/partners/stempedia.png",
      url: "https://thestempedia.com/",
    },
    {
      // ramaiah university
      name: "Ramaiah University of Applied Sciences",
      logo: "./assets/images/partners/ramaiah.png",
      url: "https://www.msruas.ac.in/",
    },
    {
      // ambition biology academy
      name: "Ambition Biology Academy Ahmednagar",
      logo: "./assets/images/partners/ambitionscience.png",
      url: "https://www.justdial.com/Ahmednagar/Ambition-Biology-Academy-Near-Morya-Mangal-Karyalaya-Savedi/9999PX241-X241-211211124847-R1E9_BZDET",
    },
    {
      // Dr. Babasaheb Ambedkar Marathwada University
      name: "Dr. Babasaheb Ambedkar Marathwada University",
      logo: "./assets/images/partners/dr babasaheb.png",
      url: "http://bamu.ac.in/",
    },
    {
      //dr vithalrao foundation
      name: "Dr. Vithalrao Vikhe Patil Foundation's",
      logo: "./assets/images/partners/dr vithalrao.png",
      url: "https://www.vimscopt.edu.in/",
    },
    {
      // isbr
      name: "ISBR Business School,",
      logo: "./assets/images/partners/isbr.png",
      url: "https://www.isbr.in/",
    },
    {
      // kolkata
      name: "National Institute of Pharmaceutical Education and Research, Kolkata",
      logo: "./assets/images/partners/kolkata.png",
      url: "https://www.niperkolkata.edu.in/ ",
    },
    {
      // pdea
      name: "Pune District Education Association, Pune",
      logo: "./assets/images/partners/pdea.png",
      url: "https://www.pdeapune.org/",
    },
    {
      // swami university
      name: "Swami Ramanand Teerth Marathwada University",
      logo: "./assets/images/partners/swami.png",
      url: "https://srtmun.ac.in/en/",
    },
  ];
  // populate elements:
  const track = document.getElementById("partnersTrack");
  // verify if the element exist
  if (track) {
    // create logo containers
    function createLogos(e) {
      return `
          <a href="${e.url}" target="_blank" class="partner-logo-image" 
          aria-label="${e.name}" title="${e.name}">
            <img src="${e.logo}" alt="${e.name} logo">
          </a>
        `;
    }
    // duplicate logos (infinite scroll)
    const logosHTML = partners.map(createLogos).join("");
    track.innerHTML = logosHTML + logosHTML; // automatic clone

    // stop animation when the user touch/hover:
    class PartnersSlider {
      constructor() {
        this.track = document.getElementById("partnersTrack");
        this.isPaused = false;
        this.init();
      }

      init() {
        // stop with mouse:
        this.track.addEventListener("mouseenter", () => this.pause());
        this.track.addEventListener("mouseleave", () => this.resume());

        // stop with touch:
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
      // restart after 2 second if the user dont touch the section
      delayedResume() {
        setTimeout(() => this.resume(), 5000);
      }
    }

    // Init slider
    new PartnersSlider();
  }
  /* ends partners section */


  /* 9. starts send data and download brochure with EmailJS */
  const brochureoverlay = document.getElementById("brochureModalOverlay");
  // verify if the element exist
  if (brochureoverlay) {
    // close modal window when the user clicks off
    brochureoverlay.addEventListener("click", function (event) {
      if (event.target === this) {
        closeBrochureModal();
      }
    });
  }
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        brochureoverlay &&
        brochureoverlay.classList.contains("active")
      ) {
        closeBrochureModal();
      }
    });
  /* ends send data and download pdf */


  /*  STARTS SERVICE-CARDS GROW FUNCTION */
  if (document.querySelector(".service-card")) {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("click", function (i) {
        i.stopPropagation();
        const desc = this.querySelector(".service-desc");
        const isExpanded = desc.classList.contains("expanded");
        // Colapsar todas las demás tarjetas
        document.querySelectorAll(".service-desc").forEach((p) => {
          if (p != desc) {
            p.classList.remove("expanded");
            p.style.maxHeight = "3.2em"; // Reset height
          }
        });

        // Si la tarjeta NO estaba expandida, expandirla
        if (!isExpanded) {
          desc.classList.add("expanded");
          desc.style.maxHeight = desc.scrollHeight + "px";
        } else {
          desc.classList.remove("expanded");
          desc.style.maxHeight = "3.2em";
        }
      });
    });
    // close cards when the user press into "services-grid"
    document.addEventListener("click", function () {
      document.querySelectorAll(".service-desc").forEach((desc) => {
        desc.classList.remove("expanded");
        desc.style.maxHeight = "3.2em";
      });
    });
  }
  /* ENDS SERVICE-CARDS GROW FUNCTION */


  /* STARTS COURSE SLIDER */
  const courseSlider = document.getElementById("slider-contain");
  const coursePrevBtn = document.getElementById("course-prev-btn");
  const courseNextBtn = document.getElementById("course-next-btn");
  const courseCards = document.getElementById("course-cards");
  /* verify if the element exist */
    if(courseSlider){
      coursePrevBtn.addEventListener("click", function () {
        const card = document.querySelector(".card");
        const screenWidth = window.innerWidth;

        let gap;
        let cardsToMove;

        if (screenWidth <= 480) {
          // UNA tarjeta visible
          gap = 16; // 1rem
          cardsToMove = 1;
        } else if (screenWidth <= 768) {
          // DOS tarjetas visibles
          gap = 24; // 1.5rem
          cardsToMove = 1;
        } else if (screenWidth <= 992) {
          gap = 32; // 2rem
          cardsToMove = 2;
        } else {
          // Desktop normal
          gap = 48; // 3rem
          cardsToMove = 2;
        }
        // Card width + gap
        const cardWidth = card.offsetWidth + gap; 
        courseCards.scrollLeft -= cardWidth * cardsToMove; 
      });
      courseNextBtn.addEventListener("click", function () {

        const card = document.querySelector(".card");
        const screenWidth = window.innerWidth;

        let gap;
        let cardsToMove;

        if (screenWidth <= 480) {
          // UNA tarjeta visible
          gap = 16; // 1rem
          cardsToMove = 1;
        } else if (screenWidth <= 768) {
          // DOS tarjetas visibles
          gap = 24; // 1.5rem
          cardsToMove = 1;
        } else if (screenWidth <= 992) {
          gap = 32; // 2rem
          cardsToMove = 2;
        } else {
          // Desktop normal
          gap = 48; // 3rem
          cardsToMove = 2;
        }
        // Card width + gap
        const cardWidth = card.offsetWidth + gap;
        courseCards.scrollLeft += cardWidth * cardsToMove;
      });
    }
  /* ENDS COURSE SLIDER */


  /* STARTS OPEN/CLOSE COURSE REGISTRATION MODAL */
  const courseModal = document.getElementById(
    "course-registration-modal"
  ); /* course registration modal overlay */
  const courseCloseBtn = document.getElementById(
    "course-registration-close-btn"
  ); /* red rounded button */
  const courseRegisterBtns =
    document.querySelectorAll(".register-btn"); /* "register now" buttons */
  const courseWrappers =
    document.querySelectorAll(".course-wrapper"); /* custom course select */
  const courseSelect = document.getElementById("course"); /* "select" */
  /* if the elements exists */
  /* open course registration modal window */
  if (courseModal && courseRegisterBtns.length > 0) {
    /* select course name with the custom select */
    courseWrappers.forEach((cWrapper) => {
      const courseSelect = cWrapper.querySelector("select");
      const courseTrigger = cWrapper.querySelector(".course-select-trigger");
      const courseOptions = cWrapper.querySelector(".course-custom-options");

      // update trigger
      function updateCourseTrigger(value) {
        const courseCustomOption = courseOptions.querySelector(
          `[data-value="${value}"]`
        );
        if (courseCustomOption) {
          const courseIcon = courseCustomOption.querySelector(".course-icon");
          const courseName =
            courseCustomOption.querySelector(".course-name").textContent;

          courseTrigger.querySelector(".course-icon").src = courseIcon.src;
          courseTrigger.querySelector(".course-icon").alt = courseIcon.alt;
          courseTrigger.querySelector(".course-name").textContent = courseName;
        }
      }
      // default
      courseSelect.value = "Drones Technology";
      updateCourseTrigger("Drones Technology");
      // open and close options
      courseTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        cWrapper.classList.toggle("open");
      });
      // select phone options
      courseOptions.addEventListener("click", (e) => {
        const courseOption = e.target.closest(".course-custom-option");
        if (courseOption) {
          const value = courseOption.getAttribute("data-value");
          courseSelect.value = value;
          updateCourseTrigger(value);
          cWrapper.classList.remove("open");
        }
      });

      // Cerrar el menú si se hace clic fuera
      document.addEventListener("click", (e) => {
        if (!cWrapper.contains(e.target)) {
          cWrapper.classList.remove("open");
        }
      });

      // Manejar la navegación con el teclado
      courseTrigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          cWrapper.classList.toggle("open");
        } else if (e.key === "Escape") {
          cWrapper.classList.remove("open");
        }
      });
    });

    courseRegisterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        courseModal.classList.add("active");
        document.body.style.overflow = "hidden"; // stop scroll propagation
        /* show preselected */
        const course = btn.getAttribute("data-course");
        if (course && courseSelect) {
          courseSelect.value = course;
          // Update the custom select trigger
          const wrapper = document.querySelector(".course-wrapper");
          if (wrapper) {
            const updateFunc = wrapper.updateCourseTrigger; // Necesitarás exponer esta función
            if (updateFunc) updateFunc(course);
          }
        }
      });
    });

    /* close course registration modal window */
    /* pressing close btn */
    courseCloseBtn.addEventListener("click", () => {
      courseModal.classList.remove("active");
      document.body.style.overflow = ""; // when the window closes the document reactives other pointer events
    });
    /* pressing modal overlay */
    window.addEventListener("click", (e) => {
      if (e.target === courseModal) {
        courseModal.classList.remove("active");
        document.body.style.overflow = ""; // when the window closes the document reactives other pointer events
      }
    });
    /* pressing esc key */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && courseModal.classList.contains("active")) {
        courseModal.classList.remove("active");
        document.body.style.overflow = ""; // when the window closes the document reactives other pointer events
      }
    });
  }
  /* ENDS OPEN/CLOSE COURSE REGISTRATION MODAL */

  /* STARTS COURSE REGISTRATION FORM SUBMIT HANDLER */
  const courseRegistrationForm = document.getElementById("course-registration-form");
  if (courseRegistrationForm) {
    courseRegistrationForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      
      const submitBtn = document.getElementById("course-submit-btn");
      const originalText = submitBtn.innerHTML;
      
      // Get form values
      const name = document.getElementById("user-name").value.trim();
      const email = document.getElementById("user-email").value.trim();
      const mobile = document.getElementById("user-mobile").value.trim();
      const course = document.getElementById("course").value;
      
      // Validate fields
      if (!validarSinEspeciales(name) || !validarSinEspeciales(email) || !validarSinEspeciales(mobile)) {
        alert("Please remove special characters from the form fields.");
        return;
      }
      
      // Show loading state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.5";
      submitBtn.style.pointerEvents = "none";
      submitBtn.style.cursor = "not-allowed";
      
      try {
        // Initialize EmailJS if not already initialized
        if (!emailjsInitialized) {
          emailjs.init("r8071XjnXsbmJjqpz");
          emailjsInitialized = true;
        }
        
        // Prepare template parameters
        const templateParams = {
          from_name: name,
          from_email: email,
          mobile: mobile,
          course: course,
          to_email: "support@udayam.co.in",
          subject: `New Course Registration: ${course}`,
          message: `New registration for ${course} course:\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}`
        };
        
        // Send email using EmailJS
        await emailjs.send(
          "service_1gtj9qj",
          "template_uk7gybo",
          templateParams
        );
        
        alert("Registration successful! We will contact you soon.");
        courseRegistrationForm.reset();
        courseModal.classList.remove("active");
        document.body.style.overflow = "";
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Registration submitted! We'll contact you soon. (Email notification failed)");
        courseRegistrationForm.reset();
        courseModal.classList.remove("active");
        document.body.style.overflow = "";
      } finally {
        // Restore button state
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.style.pointerEvents = "auto";
          submitBtn.style.cursor = "pointer";
          submitBtn.classList.remove("loading");
        }, 500);
      }
    });
  }
  /* ENDS COURSE REGISTRATION FORM SUBMIT HANDLER */


  /* STARTS LOCATION WRAPPER */
  const locationWrappers = document.querySelectorAll(".location-wrapper");
  /* select course name with the custom select */
  locationWrappers.forEach((lWrapper) => {
    const locationSelect = lWrapper.querySelector("select");
    const locationTrigger = lWrapper.querySelector(".location-select-trigger");
    const locationOptions = lWrapper.querySelector(".location-custom-options");
    // update trigger
    function updateLocationTrigger(value) {
      const locationCustomOption = locationOptions.querySelector(
        `[data-value="${value}"]`
      );
      if (locationCustomOption) {
        const locationName =
          locationCustomOption.querySelector(".location-name").textContent;
        locationTrigger.querySelector(".location-name").textContent =
          locationName;
      }
    }
    // default
    locationSelect.value = "Bengaluru";
    updateLocationTrigger("Bengaluru");
    // open and location menu
    locationTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      lWrapper.classList.toggle("open");
    });

    // select location options
    locationOptions.addEventListener("click", (e) => {
      const locationOption = e.target.closest(".location-custom-option");
      if (locationOption) {
        const value = locationOption.getAttribute("data-value");
        locationSelect.value = value;
        updateLocationTrigger(value);
        lWrapper.classList.remove("open");
      }
    });
    // Cerrar el menú si se hace clic fuera
    document.addEventListener("click", (e) => {
      if (!lWrapper.contains(e.target)) {
        lWrapper.classList.remove("open");
      }
    });

    // Manejar la navegación con el teclado
    locationTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        lWrapper.classList.toggle("open");
      } else if (e.key === "Escape") {
        lWrapper.classList.remove("open");
      }
    });
  });
  /* ENDS LOCATION WRAPPER */
});

/* 8. starts send data and download pdf */
// global functions
function openBrochureModal() {
  const brochureModalOverlay = document.getElementById("brochureModalOverlay");
  // verify if the element exist
  if (brochureModalOverlay) {
    brochureModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // anula scroll y eventos detrás de ella
  }
}
function closeBrochureModal() {
  const brochureModalOverlay = document.getElementById("brochureModalOverlay");
  if (brochureModalOverlay) {
    brochureModalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // anula scroll y eventos detrás de ella
  }
  resetBrochureForm();
}
function resetBrochureForm() {
  document.getElementById("brochure-email").value = "";
  document.getElementById("brochure-phone").value = "";
  document.getElementById("brochureEmailError").classList.remove("active");
  document.getElementById("brochurePhoneError").classList.remove("active");
  document.getElementById("brochureGeneralError").classList.remove("active");
  document.getElementById("brochureGeneralError").textContent = "";
  document.getElementById("brochure-form-content").style.display = "flex";
  document.getElementById("brochureSuccessContent").style.display = "none";
  document.getElementById("downloadBrochureBtn").disabled = false;
  document.getElementById("downloadBrochureBtn").textContent = "Submit";
}

/* send email and phone  */
function handleSubmit(event) {
  event.preventDefault();
  // init emailJS
  emailjs.init("ilcGOCulCPRqjQQDb");

  const brochureEmail = document.getElementById("brochure-email").value.trim();
  const brochurePhone = document.getElementById("brochure-phone").value.trim();
  const brochureEmailError = document.getElementById("brochureEmailError");
  const brochurePhoneError = document.getElementById("brochurePhoneError");
  const brochureGeneralError = document.getElementById("brochureGeneralError");
  const downloadBrochureBtn = document.getElementById("downloadBrochureBtn");
  // errors reset
  brochureEmailError.classList.remove("active");
  brochurePhoneError.classList.remove("active");
  brochureGeneralError.classList.remove("active");
  // validate
  let isValid = true;
  if (!brochureEmail) {
    brochureEmailError.textContent = "Please type your email";
    brochureEmailError.classList.add("active");
    isValid = false;
  } else if (!validarSinEspeciales(brochureEmail)) {
  /* evitar que se ingresen caracteres especiales */
    brochureEmailError.textContent =
      "The email address contains unauthorised characters.";
    brochureEmailError.classList.add("active");
    isValid = false;
  }
  // si el correo no incluye @
  else if (!brochureEmail.includes("@")) {
    brochureEmailError.textContent = "Please enter a valid email";
    brochureEmailError.classList.add("active");
    isValid = false;
  }

  if (!brochurePhone) {
    brochurePhoneError.textContent = "Type your phone";
    brochurePhoneError.classList.add("active");
    isValid = false;
  } else if (!validarTelefono(brochurePhone)) {
  /* evitar que se ingresen caracteres especiales */
    brochurePhoneError.textContent =
      "This number contains unauthorised characters.";
    brochurePhoneError.classList.add("active");
    isValid = false;
  }

  if (!isValid) return;
  // Deshabilitar botón y mostrar loading
  downloadBrochureBtn.disabled = true;
  downloadBrochureBtn.textContent = "Sending...";
  // Enviar datos con EmailJS
  const templateParams = {
    email: brochureEmail,
    phone: brochurePhone,
  };
  emailjs.send("service_vetmuad", "template_p70cppb", templateParams).then(
    function (response) {
      console.log("This Email was sended sucessfully:", response);
      // show succes message

      document.getElementById("brochure-form-content").style.display = "none";
      document.getElementById("brochureSuccessContent").style.display = "flex";
    },
    function (error) {
      console.error("An error has ocurred:", error);

      brochureGeneralError.textContent =
        "Error while attempting to send the information. Please try again.";
      brochureGeneralError.classList.add("active");
      downloadBrochureBtn.disabled = false;
      downloadBrochureBtn.textContent = "Submit";
    }
  );
}
/* ends send data and download pdf */
