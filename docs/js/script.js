// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Add animation classes to elements when they come into view
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll('.service-card');

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
});
// Training highlights card details
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
    name: "anonymous",
    designation: "",
    location: "",
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
  description: "Professioanls enchancing thier AI skills in an interactive setting.",
  reviewer: {
    comment: "\"Transformed our team's productivity! The AI training was practical and immediately applicable to our work.\"",
    name: "anonymous",
    designation: "",
    location: "",
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
document.getElementById("prevBtn").addEventListener("click", () => {
  currentTrainingCardIndex = (currentTrainingCardIndex - 1 + cardData.length) % cardData.length;
  renderCard(currentTrainingCardIndex);
});
document.getElementById("nextBtn").addEventListener("click", () => {
  currentTrainingCardIndex = (currentTrainingCardIndex + 1) % cardData.length;
  renderCard(currentTrainingCardIndex);
});
document.addEventListener("DOMContentLoaded", () => {
  renderCard(currentTrainingCardIndex);
});
// Accordion-toggle
document.addEventListener("DOMContentLoaded",()=>{
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
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();

const targetId = this.getAttribute('href');
const targetElement = document.querySelector(targetId);

setTimeout(() => {
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: 'smooth'
  });      
}, 150);

});
});

// Add animation classes to elements when they come into view
document.addEventListener('DOMContentLoaded', function () {
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
});

// go up function:
document.addEventListener('DOMContentLoaded',   function () {
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
    }, 150);
  });
});

/* send emails */
  
function showAlert(event) {
    // the page won´t reload by default
    event.preventDefault();
    
    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn.innerHTML;
    
    // Disables the button behaviour to simulate a loading animation
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      submitBtn.style.opacity="0.5";
      submitBtn.style.pointerEvents = "none";
      submitBtn.style.cursor = "not-allowed";
    
    // 
    alert("Your message will be send.We'll get back to you as soon as possible.");
    
    // Send the form after 1 second
    setTimeout(() => {
        event.target.submit();
        
        // Reset the form 
        setTimeout(() => {
            event.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity="1";
            submitBtn.style.pointerEvents = "auto";
            submitBtn.style.cursor = "allowed";
        }, 2000);
    }, 1500);
    
    return false;
}

const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.innerHTML = navLinks.classList.contains("active") 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
});