  /* !!important: we prevent special characters from being entered */
  function validarSinEspeciales(textDemo) {
    // 1. block code chars
    if (/[<>\/\\{}[\]$#%^&*|~`]/.test(textDemo)) {
      return false;
    }
    // 2. allow secure characters
    return /^[\w\s@.,+–\-¡!¿?áéíóúÁÉÍÓÚñÑüÜàèìòùÀÈÌÒÙçÇ:;"'()¿¡\n\r\t]*$/.test(textDemo);
  }
  function validarTelefono(texto) {
    // Permite solo números, espacios, guiones y paréntesis
    const regex = /^[0-9\s\-()\+.]+$/;
    return regex.test(texto);
  }

/*  unified code to avoid conflicts between events */
document.addEventListener('DOMContentLoaded', function () {

    // 1. Starts Smooth scrolling function for navigation links:
    // vefiry if the element exist:
    if(document.querySelector("nav a")){
      document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {

        const href = this.getAttribute('href');
        if(!href) return;

        // solo prevenir el comportamiento por defecto para los enlaces internos:
        if(href.startsWith("#") && href != "#"){

          const targetId = href;
          const targetElement = document.querySelector(targetId);

          if(targetElement){

            e.preventDefault();

            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

            history.pushState(null, null, targetId);
          }
        }

      });
      });
    }
    // Ends Smooth scrolling function for navigation links


    // 2. Starts to Add animation classes to elements when they come into view
    // vefiry if the element exist:
    if(document.querySelector(".service-card") || document.querySelector(".photo-card") || document.querySelector(".about-content p")){
    const animatedElements = document.querySelectorAll('.service-card, .photo-card, .about-content p');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
    }, {
      threshold: 0.2
    });

      animatedElements.forEach(element => {
      observer.observe(element);
      element.classList.add('pre-animation');
    });
    }
    // Ends to Add animation classes to elements when they come into


    // 3. Starts Training highlights card details (swipper)
    // vefiry if the element exist:
    if(document.getElementById("prevBtn") && document.getElementById("nextBtn") && document.getElementById("dotsContainer")){
    const cardData = [
      {
      image: {
      src: "assets/images/training3.webp",
      alt: "School Trainings Img"
      },
      title: "School Trainings",
      description: "Introducing young learners to the word of artificial intelligence.",
      reviewer: {
        comment: "\"Amazing program! My daughter loves the hands-on robotics sessions and has learned so much about technology.\"",
        name: "Ananya G",
        designation: "Baldwin Girls' High School",
        location: "Bangalore",
      }
      },
      {
      image: {
      src: "assets/images/training1.webp",
      alt: "Faculty Development Programs Img"
      },
      title: "Faculty Development Programs",
      description: "Faculty learning practical Al implementation through guided exercises.",
      reviewer: {
        comment: "\"Really this workshop builds confidence to make creative ideas for teaching process.\"",
        name: "Priyanka M",
        designation: "TGT Science",
        location: "PPS Bengaluru"
      }
      }, 
      {
      image: {
      src: "assets/images/training2.webp",
      alt: "Corporate Trainings Img"
      },
      title: "Corporate Trainings",
      description: "Professionals enchancing their AI skills in an interactive setting.",
      reviewer: {
        comment: "\"The corporate training by Udayam AI Labs was highly engaging and practical. Mr. Udayraj Patare delivered complex AI concepts with clarity, real-world examples, and hands-on activities. Our team walked away with future-ready skills that we can apply immediately in our work.\"",
        name: "MR.TEJAS INAGALE",
        designation: "KAIZEN ENGINEERING",
        location: "Ahilyanagar, Maharashtra",
      }
      },
      {
      image: {
      src: "assets/images/training4.webp",
      alt: "Advanced Techniques Img"
      },
      title: "Advanced Techniques",
      description: "Exploring cutting-edge AI methodologies with our expert trainers.",
      reviewer: {
        comment: "\"It was a good opportunity to learn AI in Pharma and i am interested to apply it in my future research.\"",
        name: "Ayesha S",
        designation:  "Pharmaceutical Analysis Dept",
        location: "NIPER-Kolkata"
      }
      }
    ]
    const dotsContainer = document.getElementById('dotsContainer');
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
        document.getElementById("userComment").textContent = data.reviewer.comment;

        document.getElementById("userInitials").textContent = data.reviewer.name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join("");
        
        renderDots();
      }

      function renderDots() {
        dotsContainer.innerHTML = '';
        cardData.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'dot' + (i === currentTrainingCardIndex ? ' active' : '');
          dot.type = 'button';
          dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
          if(i === currentTrainingCardIndex){
            dot.setAttribute('aria-current', 'true');
          }
          dot.addEventListener('click', () => {
          currentTrainingCardIndex = i;
          renderCard(currentTrainingCardIndex);
          });
          dot.addEventListener('keydown', (e)=>{
            if(e.key === "ArrowRight") {
              const next = (i + 1) % cardData.length;
              dotsContainer.children[next].focus();
              currentTrainingCardIndex = next;
              renderCard(next);
            }else if(e.key === "ArrowLeft"){
              const prev = (i - 1 + cardData.length) % cardData.length;
              dotsContainer.children[prev].focus();
              currentTrainingCardIndex = prev;
              renderCard(prev);
            }
          })
          dotsContainer.appendChild(dot);
        });
      }
        // move to left
        document.getElementById("prevBtn").addEventListener("click", () => {
          currentTrainingCardIndex = (currentTrainingCardIndex - 1 + cardData.length) % cardData.length;
          renderCard(currentTrainingCardIndex);
        });
        // move to right
        document.getElementById("nextBtn").addEventListener("click", () => {
          currentTrainingCardIndex = (currentTrainingCardIndex + 1) % cardData.length;
          renderCard(currentTrainingCardIndex);
        });
        renderCard(currentTrainingCardIndex);
    }
    // Ends Training highlights card details (swipper)


    // 4. Starts Accordion-toggle elements:
    // vefiry if the element exist:
    if(document.querySelector(".accordion-item")){
    const firstItem = document.querySelector('.accordion-item');
    
    if(firstItem){
      firstItem.classList.add('active')
    }
      document.querySelectorAll('.accordion-header').forEach(header=>{
        header.addEventListener('click', ()=>{
          toggleAccordion(header);
        });

        header.addEventListener('keydown', (e)=>{
        if(e.key === "Enter" || e.key === ''){
          e.preventDefault();
          toggleAccordion(header);
        }
        })
      });
    
    function toggleAccordion(header){
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      document.querySelectorAll('.accordion-item').forEach(i=> i.classList.remove('active'));
      if(!isActive){
        item.classList.add('active');
      }
    }
    }
    // Ends Accordion-toggle elements


    // 5. Starts go up function:
    // verify if the element exist
    if (document.getElementById("btnUp")) {
    const btnUp = document.getElementById("btnUp");
    // Show or hide the button depending on the scroll position:
      window.addEventListener('scroll', function () {
          if (window.pageYOffset > 300) 
            {
              btnUp.classList.add('show');
            } 
          else {
            btnUp.classList.remove('show');
          }
      });
    // Smooth upward scroll with delay
      btnUp.addEventListener('click', function () {
        setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });          
        }, 100);
      });
    }
    // Ends go up function 


    /* 6. Starts send emails function with EmailJS(Contact Form) */
    // verify if the element exist
    if (document.getElementById('contact-form') && document.getElementById("submitBtn")) {

    // Variables to manage the number of submission attempts for the form and a delay while checking:
    const maxRetries = 2;
    const delay = 1000;
    let emailjsInitialized = false;

    // Use the above counters to assist in debugging errors:
    async function sendEmailWithRetry(formData, retries = maxRetries) {
      // We initially attempted to send the form (without the user noticing):
      try{
        if(!emailjsInitialized){
          // Inicialite emailJS:
          emailjs.init("r8071XjnXsbmJjqpz"); // public key 
          emailjsInitialized = true;
        }

        // const response = await emailjs.sendForm('service_ID',  'template_ID, form data);
        const response = await emailjs.sendForm('service_1gtj9qj', 'template_uk7gybo', formData);
        return response;
      }
      // If the delivery fails, start using the retry counter (1 successful delivery + 2 additional attempts):
      catch(error){
        if(retries>0){
          console.log("Reintentando envío... (${maxRetries - retries + 1} / ${maxRetries})");
          // count 1 second before attempting another send attempt:
          await new Promise(resolve => setTimeout(resolve, delay));
          return sendEmailWithRetry(formData, retries - 1); 
        }
        //
        throw error; // if resending attempts fail, a message is displayed to users
      }
      //------
    }
  
    /* send email without retries or errors */
    async function showAlert(event) {

    event.preventDefault(); // website will not reload, post method blocked

    /* reject special char and charge send btn */
      const form = event.target; // get form data
      const submitBtn = document.getElementById("submitBtn"); // cta button
      const originalText = submitBtn.innerHTML; // cta inner text
      let isValid = true;
      
      // Validar todos los campos de texto, email y textarea
    const inputs = form.querySelectorAll('input[type="text"],  textarea');
      for (let Input of inputs) {
        if (!validarSinEspeciales(Input.value)) {
          alert(`The field "${Input.name}" contains unauthorised characters.`);
          Input.focus();
          isValid = false;
          break;
        }
      }
        // if validation fails, stop sending
        if (!isValid) {
            return false;
        }


      // "sending" animation in the submit button:
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
        submitBtn.style.pointerEvents = "none";
        submitBtn.style.cursor = "not-allowed";

        await new Promise(resolve => setTimeout(resolve, 50));

      //
      try{
        const response = await sendEmailWithRetry(form); // check that there are no errors
        console.log("success", response.status, response.text);
        alert(" Your message was sent successfully!! ");
        form.reset(); // clean all input fields

        // If the email is sent successfully, redirect to the home page:
        setTimeout(() => {
          window.location.href = "https://udayam.co.in/index.html#contact";
        }, 1000);
      }
      // show error messages
      catch(error){
        console.log("failed", error);
        let errorMessage = "Sorry, there was an error sending your message. Please try again. ";
            
        if (error?.status === 0 || error?.toString().includes('Network')) {
          errorMessage += " Please check your internet connection and try again.";
        } else if (error?.status >= 500) {
          errorMessage += " Our server is having issues. Please try again in a few minutes.";
        } else {
          errorMessage += " Please try again or contact us directly at support@udayam.co.in ";
        }
            
        alert(errorMessage);
      }
      finally{
        // Restore original styles to the button submit (in case of success or error):
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.style.pointerEvents = "auto";
          submitBtn.style.cursor = "pointer";
          submitBtn.classList.remove("loading");
        }, 500);
      }

      return false;
    }

    document.getElementById('contact-form').addEventListener('submit', showAlert);
    }
    /* Ends send emails function with EmailJS(Contact Form) */
    
    
    // 7. starts dropdown menu support for mobile
    // verify if the element exis
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

      if(dropdownToggles.length > 0){
        dropdownToggles.forEach(toggle => {
          toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            
            if (window.innerWidth <= 992) {
              dropdown.classList.toggle('active');
              
              // close another dropdown
              document.querySelectorAll('.dropdown').forEach(other => {
                if (other !== dropdown) other.classList.remove('active');
              });
            }
          });
        });

        // close if the user touch outside
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
              dropdown.classList.remove('active');
            });
          }
        });

      }
    // ends dropdown menu support for mobile 


    /* 8. starts partners section */
    // create parteners data:
    const partners = [
      { // kaizen engineers
        name: "Kaizen Engineers",
        logo: "./assets/images/partners/kaizen.png",
        url: "https://kaizengroup.co.in/"
      },
      { // stempedia
        name: "STEMpedia",
        logo: "./assets/images/partners/stempedia.png", 
        url: "https://thestempedia.com/"
      },
      { // ramaiah university
        name: "Ramaiah University of Applied Sciences",
        logo: "./assets/images/partners/ramaiah.png",
        url: "https://www.msruas.ac.in/"
      },
      { // ambition biology academy
        name: "Ambition Biology Academy Ahmednagar",
        logo: "./assets/images/partners/ambitionscience.png",
        url: "https://www.justdial.com/Ahmednagar/Ambition-Biology-Academy-Near-Morya-Mangal-Karyalaya-Savedi/9999PX241-X241-211211124847-R1E9_BZDET"
      },
      { // Dr. Babasaheb Ambedkar Marathwada University
        name: "Dr. Babasaheb Ambedkar Marathwada University",
        logo: "./assets/images/partners/dr babasaheb.png",
        url: "http://bamu.ac.in/"
      },
      { //dr vithalrao foundation
        name: "Dr. Vithalrao Vikhe Patil Foundation's",
        logo: "./assets/images/partners/dr vithalrao.png",
        url: "https://www.vimscopt.edu.in/"
      },
      { // isbr
        name: "ISBR Business School,",
        logo: "./assets/images/partners/isbr.png",
        url: "https://www.isbr.in/"
      },
      { // kolkata
        name: "National Institute of Pharmaceutical Education and Research, Kolkata",
        logo: "./assets/images/partners/kolkata.png",
        url: "https://www.niperkolkata.edu.in/ "
      },
      { // pdea
        name: "Pune District Education Association, Pune",
        logo: "./assets/images/partners/pdea.png",
        url: "https://www.pdeapune.org/"
      },
      { // swami university
        name: "Swami Ramanand Teerth Marathwada University",
        logo: "./assets/images/partners/swami.png",
        url: "https://srtmun.ac.in/en/"
      }
    ];

    // populate elements:
    const track = document.getElementById("partnersTrack");
    // verify if the element exist
    if(track){
      // create logo containers
      function createLogos(e){
      return `
        <a href="${e.url}" target="_blank" class="partner-logo-image" 
         aria-label="${e.name}" title="${e.name}">
          <img src="${e.logo}" alt="${e.name} logo">
        </a>
      `;
      }
      // duplicate logos (infinite scroll)
      const logosHTML = partners.map(createLogos).join('');
      track.innerHTML = logosHTML+logosHTML; // automatic clone

        // stop animation when the user touch/hover:
        class PartnersSlider {
          constructor() {
            this.track = document.getElementById('partnersTrack');
            this.isPaused = false;
            this.init();
          }
          
          init() {
            // stop with mouse:
            this.track.addEventListener('mouseenter', () => this.pause());
            this.track.addEventListener('mouseleave', () => this.resume());
            
            // stop with touch:
            this.track.addEventListener('touchstart', () => this.pause());
            this.track.addEventListener('touchend', () => this.delayedResume());
          }
          
          pause() {
            if (!this.isPaused) {
              this.track.classList.add('paused');
              this.isPaused = true;
            }
          }
          
          resume() {
            if (this.isPaused) {
              this.track.classList.remove('paused');
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
    // verify if the element exist
      // close modal window when the user clicks off
      document.getElementById('modalOverlay').addEventListener('click', function(event) {
        if (event.target === this) {
          closeModal();
        }
      });
      // close modal window with ESC
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('active')) {
          closeModal();
        }
      });
    /* ends send data and download pdf */

    /* 10. starts previous trainings carrousel */
    const cardData = [
    {
      image: "./assets/images/gallery/1.jpg",
      title: "Introduction to AI",
      subtitle: "Mahesh Munot High School",
      category: "school"
    },
    {
      image: "./assets/images/gallery/5.jpg",
      title: "Data Science",
      subtitle: "University of Pune",
      category: "university"
    },
    {
      image: "./assets/images/gallery/14.jpg",
      title: "Mathematical Techniques in Data Science",
      subtitle: "Sardar Vallabhbhai Patel University",
      category: "university"
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
      category: "university"
    },
    {
      image: "./assets/images/gallery/64.jpg",
      title: "Machine Learning",
      subtitle: "Vikhe Patil Eng. College",
      category: "university"
    },
    {
      image: "./assets/images/gallery/68.jpg",
      title: "Mathematical Techniques in Data Science",
      subtitle: "More College Akurdi pune",
      category: "university"
    },
    {
      image: "./assets/images/gallery/78.jpg",
      title: "National Mathematics Day",
      subtitle: "Annasaheb magar College,Hadapsar",
      category: "university"
    },
    {
      image: "./assets/images/gallery/81.jpg",
      title: "MOU",
      subtitle: "Annasaheb magar College,Hadapsar",
      category: "university"
    },
    {
      image: "./assets/images/gallery/31.jpg",
      title: "Introduction to AI",
      subtitle: "Latur Subcenter",
      category: "university"
    },
    {
      image: "./assets/images/gallery/82.jpg",
      title: "AI for Young Innovators",
      subtitle: "Dr. Vithalrao Vikhe Patil Foundation's",
      category: "school"
    },
    {
      image: "./assets/images/gallery/83.jpg",
      title: "AI Bussiness Directors",
      subtitle: "MIDC, Ahilyanagar",
      category: "corporate"
    },
    {
      image: "./assets/images/gallery/84.jpg",
      title: "Navigating AI-Driven Opportunities",
      subtitle: "Dr. Babasaheb Ambedkar Marathwada University",
      category: "corporate"
    },
    {
      image: "./assets/images/gallery/85.jpg",
      title: "Industrial Training for Statistics Students",
      subtitle: "Swami Ramanand Teerth Marathwada University",
      category: "university"
    },
    {
      image: "./assets/images/gallery/86.jpg",
      title: "Machine Learning Training",
      subtitle: "Dr.Ramkrushna More College Akurdi",
      category: "university"
    },
    {
      image: "./assets/images/gallery/87.jpg",
      title: "AI Session",
      subtitle: "Kendriya vidyalaya, AhilyaNagar",
      category: "school"
    }, 
    {
      image: "./assets/images/gallery/88.jpg",
      title: "AI in Healthcare",
      subtitle: "Dr. Vikhe Patil Foundation Medical college",
      category: "corporate"
    }, 
    ];    

  // Variables globales
    let currentFilter = 'all';
    let currentLightboxIndex = 0;
    let filteredData = [];

    // Inicializar la galería
    function initGallery() {
      renderGallery();
      setupEventListeners();
    }

    // Renderizar la galería
    function renderGallery() {
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML = '';
        
      filteredData = currentFilter === 'all' 
          ? [...cardData] 
          : cardData.filter(card => card.category === currentFilter);
        
    filteredData.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'training-card';
      cardElement.dataset.index = index;
      cardElement.innerHTML = `
          <div class="training-card-image">
              <img src="${card.image}" alt="${card.title}">
              <div class="institution-badge">${getCategoryName(card.category)}</div>
          </div>
          <div class="training-card-content">
              <h3 class="training-card-title">${card.title}</h3>
              <p class="training-card-subtitle">${card.subtitle}</p>
          </div>
      `;
      gallery.appendChild(cardElement);
    });
    }

    // Obtener nombre de categoría
    function getCategoryName(category) {
      const categories = {
        'university': 'University',
        'school': 'Schools',
        'corporate': 'Corporate',
      };
      return categories[category] || category;
    }

    // Configurar event listeners
    function setupEventListeners() {
    // Filtros
      document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          currentFilter = button.dataset.filter;
          renderGallery();
        });
      });

    // Lightbox - abrir al hacer clic en una tarjeta
      document.addEventListener('click', (e) => {
        const card = e.target.closest('.training-card');
        if (card) {
          openLightbox(parseInt(card.dataset.index));
        }
      });

    // Lightbox - cerrar
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

    // Lightbox - navegación
    document.getElementById('prevBtn').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigateLightbox(1));

    // Lightbox - teclado
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
      }
    });

        // Lightbox - cerrar al hacer clic en el overlay (fondo negro)
    document.getElementById("lightbox").addEventListener('click', (i) => {
      if (i.target === lightbox) {
        closeLightbox();
      }
    });

    // Lightbox - swipe para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
        
    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
        
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        navigateLightbox(1); // Swipe izquierda
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        navigateLightbox(-1); // Swipe derecha
      }
    }
    }

    // Abrir lightbox
    function openLightbox(index) {
      currentLightboxIndex = index;
      const lightbox = document.getElementById('lightbox');
      const lightboxImage = document.getElementById('lightboxImage');
      const lightboxTitle = document.getElementById('lightboxTitle');
      const lightboxSubtitle = document.getElementById('lightboxSubtitle');
        
      lightboxImage.classList.add("changing");

      setTimeout(() =>{

        lightboxImage.src = filteredData[index].image;
        lightboxImage.alt = filteredData[index].alt;
        lightboxTitle.textContent = filteredData[index].title;
        lightboxSubtitle.textContent = filteredData[index].subtitle;
      
        setTimeout(() => {
            lightboxImage.classList.remove('changing');
        }, 50);
      }, 250);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Cerrar lightbox
    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    // Navegar en el lightbox
    function navigateLightbox(direction) {
      let newIndex = currentLightboxIndex + direction;
      
      if (newIndex < 0) {
        newIndex = filteredData.length - 1;
      } else if (newIndex >= filteredData.length) {
        newIndex = 0;
      }
      
      openLightbox(newIndex);
    }    
    if(gallery){
      initGallery();
    }
    /*  ends previous trainings carrousel */

});



  /* 8. starts send data and download pdf */
    // global functions
    function openModal() {
      const modalOverlay = document.getElementById('modalOverlay');
      // verify if the element exist
      if(modalOverlay){
        modalOverlay.classList.add('active');
      }
    }
    function closeModal() {
      const modalOverlay = document.getElementById('modalOverlay');
      if(modalOverlay){
        modalOverlay.classList.remove('active');
      }
      resetForm();
    }
    function resetForm() {
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('emailError').classList.remove('active');
      document.getElementById('phoneError').classList.remove('active');
      document.getElementById('generalError').classList.remove('active');
      document.getElementById('generalError').textContent = '';
      document.getElementById('formContent').style.display = 'block';
      document.getElementById('successContent').style.display = 'none';
      document.getElementById('submitBtn').disabled = false;
      document.getElementById('submitBtn').textContent = 'Enviar y descargar';
    }
    function handleSubmit(event) {
    event.preventDefault();

      // init emailJS
      emailjs.init("ilcGOCulCPRqjQQDb"); 

      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const emailError = document.getElementById('emailError');
      const phoneError = document.getElementById('phoneError');
      const generalError = document.getElementById('generalError');
      const submitBtn = document.getElementById('submitBtn');
    // errors reset
    emailError.classList.remove('active');
    phoneError.classList.remove('active');
    generalError.classList.remove('active');
    // validate
    let isValid = true;
    if (!email) {
      emailError.textContent = 'Please type your email';
      emailError.classList.add('active');
      isValid = false;
    } 
      /* evitar que se ingresen caracteres especiales */
      else if (!validarSinEspeciales(email)) {
        emailError.textContent = 'The email address contains unauthorised characters.';
        emailError.classList.add('active');
        isValid = false;
      }
      else if (!email.includes('@')) {
        emailError.textContent = 'Please enter a valid email';
        emailError.classList.add('active');
        isValid = false;
      }

    if (!phone) {
      phoneError.textContent = 'Type your phone';
      phoneError.classList.add('active');
      isValid = false;
    } 
      /* evitar que se ingresen caracteres especiales */
      else if (!validarTelefono(phone)) {
        phoneError.textContent = 'This number contains unauthorised characters.';
        phoneError.classList.add('active');
        isValid = false;
      }
    if (!isValid) return;
    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    // Enviar datos con EmailJS
    const templateParams = {
      email: email,
      phone: phone,
    };
    emailjs.send('service_vetmuad', 'template_p70cppb', templateParams)
      .then(function(response) {
        console.log('This Email was sended sucessfully:', response);
        // show succes message
        document.getElementById('formContent').style.display = 'none';
        document.getElementById('successContent').style.display = 'block';
      }, function(error) {
          console.error('An error has ocurred:', error);
          generalError.textContent = 'Error while attempting to send the information. Please try again.';
          generalError.classList.add('active');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send and Download';
      });
    
    }
  /* ends send data and download pdf */    








// const menuToggle = document.getElementById("menu-toggle");
//   const navLinks = document.getElementById("nav-links");

//   menuToggle.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
//     menuToggle.innerHTML = navLinks.classList.contains("active") 
//         ? '<i class="fa-solid fa-xmark"></i>' 
//         : '<i class="fa-solid fa-bars"></i>';
// });

