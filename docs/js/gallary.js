document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DATA ARRAY ---
  // All your gallery data in one place
  const cardData = [
    {
      image: "./assets/images/gallery/89.jpg",
      title: "AI in Healthcare Workshop",
      subtitle: "ASCOMS & Hospital, Jammu",
      category: "university",
    },
    {
      image: "./assets/images/gallery/82.jpg",
      title: "AI for Young Innovators",
      subtitle: "Dr. Vithalrao Vikhe Patil Foundation's",
      category: "school",
    },
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
    {
      image: "./assets/images/gallery/2_MIT.jpg.jpeg",
      title: "AI for Young Innovators",
      subtitle: "KV Sunjuwan, Jammu",
      category: "school",
    },
    {
      image: "./assets/images/gallery/3_MIT.jpg.jpeg",
      title: "AI for Young Innovators",
      subtitle: "KV Sunjuwan, Jammu",
      category: "school",
    },
    {
      image: "./assets/images/gallery/4_MIT.jpg.jpeg",
      title: "AI for Young Innovators",
      subtitle: "KV Sunjuwan, Jammu",
      category: "school",
    }, 
    {
      image: "./assets/images/gallery/5_MIT.jpg.jpeg",
      title: "AI for Young Innovators",
      subtitle: "KV Sunjuwan, Jammu",
      category: "school",
    }, 
    {
      image: "./assets/images/gallery/6_MIT.jpg.jpeg",
      title: "AI for Young Innovators",
      subtitle: "KV Sunjuwan, Jammu",
      category: "school",
    },
    {
      image: "./assets/images/gallery/7_MIT.jpg.jpeg",
      title: "AI for Young Innovators",
      subtitle: "KV Sunjuwan, Jammu",
      category: "school",
    },
  ];

  // --- 2. ELEMENT SELECTORS ---
  let mainTrack = document.getElementById("featured-slider-track");
  const scrollTrack = document.getElementById("gallery-strip-track");
  const lightbox = document.getElementById("lightbox");
  const filterContainer = document.getElementById("filter-container");
  const filterIndicator = document.getElementById("filter-indicator");

  // --- 3. STATE VARIABLES ---
  let currentFilter = "all";
  let filteredData = []; // Data for the main carousel
  let allData = [...cardData]; // Data for the scroll strip (always all)
  let currentLightboxIndex = 0;
  let carouselCurrentIndex = 0;
  let carouselSlides = [];
  let carouselSlideWidth = 0;

  // --- 4. HELPER FUNCTIONS ---
  function getCategoryName(category) {
    const categories = {
      university: "University",
      school: "Schools",
      corporate: "Corporate",
    };
    return categories[category] || category;
  }

  // --- 5. GALLERY POPULATION ---
  function populateGalleries() {
    if (!mainTrack || !scrollTrack) {
      console.error("Gallery tracks not found!");
      return;
    }

    // Filter data for the main carousel
    filteredData =
      currentFilter === "all"
        ? [...allData]
        : allData.filter((card) => card.category === currentFilter);

    // Clear existing content
    mainTrack.innerHTML = "";
    scrollTrack.innerHTML = "";

    // 1. Populate Main Slider (based on filter)
    if (filteredData.length === 0) {
      mainTrack.innerHTML = `<div class="slider-slide"><div class="container"><p>No items match this filter.</p></div></div>`;
    } else {
      filteredData.forEach((card, index) => {
        const slide = document.createElement("div");
        slide.className = "slider-slide";
        const originalIndex = allData.indexOf(card);
        slide.innerHTML = `
            <div class="container">
              <div class="training-card" data-category="${
                card.category
              }" data-index="${originalIndex}">
                <div class="training-card-image">
                  <img src="${card.image}" alt="${card.title}" />
                  <span class="institution-badge">${getCategoryName(
                    card.category
                  )}</span>
                </div>
                <div class="training-card-content">
                  <h3 class="training-card-title">${card.title}</h3>
                  <p class="training-card-subtitle">${card.subtitle}</p>
                </div>
              </div>
            </div>`;
        mainTrack.appendChild(slide);
      });
    }

    // --- FIX: THIS SECTION IS UPDATED ---
    // 2. Populate Scrolling Strip (now based on filter)
    filteredData.forEach((card) => { // <-- Changed from allData
      const smallCard = document.createElement("div");
      smallCard.className = "training-card-small";
      smallCard.dataset.category = card.category;
      
      // Get the original index from allData so the lightbox works
      const originalIndex = allData.indexOf(card);
      smallCard.dataset.index = originalIndex; // <-- Use original index
      
      smallCard.innerHTML = `
        <img src="${card.image}" alt="${card.title}" />
        <div class="card-small-details">
          <h4>${card.title}</h4>
          <p>${card.subtitle}</p>
        </div>`;
      scrollTrack.appendChild(smallCard);
    });
    // --- END FIX ---
  }

  // --- 6. ANIMATION & COMPONENT INITIALIZERS ---

  /**
   * Initializes the sliding filter indicator.
   */
  function initFilter() {
    if (!filterContainer || !filterIndicator) return;

    const filterButtons = filterContainer.querySelectorAll(".filter-btn");

    function moveIndicator(target) {
      if (!target) return;
      const containerRect = filterContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const left = targetRect.left - containerRect.left;
      const width = targetRect.width;
      filterIndicator.style.left = `${left}px`;
      filterIndicator.style.width = `${width}px`;
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      target.classList.add("active");
    }

    const activeBtn =
      filterContainer.querySelector('.filter-btn[data-filter="all"]') ||
      filterButtons[0];
    requestAnimationFrame(() => moveIndicator(activeBtn));

    window.addEventListener("resize", () => {
      const currentActiveBtn =
        filterContainer.querySelector(".filter-btn.active") || activeBtn;
      moveIndicator(currentActiveBtn);
    });

    // Add filter logic
    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const target = e.currentTarget;
        currentFilter = target.dataset.filter;

        moveIndicator(target); // Animate the filter
        populateGalleries(); // Re-build the galleries
        initFeaturedCarousel(); // Re-init the carousel
        initScrollStrip(); // Re-init the scroll strip
      });
    });
  }

  /**
   * Initializes the main featured carousel.
   */
  /**
   * Initializes the main featured carousel.
   */
/**
   * Initializes the main featured carousel.
   */
  function initFeaturedCarousel() {
    const prevBtn = document.getElementById("featured-prev");
    const nextBtn = document.getElementById("featured-next");

    if (!mainTrack || !prevBtn || !nextBtn) return;

    // --- FIX: Clone the track to remove old touch listeners causing "skipping" ---
    // This requires `mainTrack` to be declared with `let` instead of `const`
    const newMainTrack = mainTrack.cloneNode(true);
    mainTrack.parentNode.replaceChild(newMainTrack, mainTrack);
    mainTrack = newMainTrack; // Update the global reference to the new track
    // --- END FIX ---

    carouselSlides = mainTrack.querySelectorAll(".slider-slide");
    carouselCurrentIndex = 0; // Reset index
    carouselSlideWidth = 0;

    if (carouselSlides.length > 0) {
      carouselSlideWidth = mainTrack.parentElement.offsetWidth;
      showCarouselSlide(0);
    } 
    
    // This is a clean way to remove old listeners
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn); 
    
    // Attach listeners
    newPrevBtn.addEventListener("click", () => {
      if (!carouselSlides || carouselSlides.length <= 1) return;
      const newIndex =
        carouselCurrentIndex > 0
          ? carouselCurrentIndex - 1
          : carouselSlides.length - 1;
      showCarouselSlide(newIndex);
    });

    newNextBtn.addEventListener("click", () => {
      if (!carouselSlides || carouselSlides.length <= 1) return;
      const newIndex =
        carouselCurrentIndex < carouselSlides.length - 1
          ? carouselCurrentIndex + 1
          : 0;
      showCarouselSlide(newIndex);
    });

    // Update on resize
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Min pixels user must swipe

    // These listeners are now added to the *new* mainTrack, so they won't stack up
    mainTrack.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true } // Improves scrolling performance
    );

    mainTrack.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (carouselSlides.length <= 1) return; // Don't swipe if 1 slide

      // 1. Swiped Left (Go to Next)
      if (touchEndX < touchStartX - swipeThreshold) {
        const newIndex =
          carouselCurrentIndex < carouselSlides.length - 1
            ? carouselCurrentIndex + 1
            : 0;
        showCarouselSlide(newIndex);
      }
      // 2. Swiped Right (Go to Previous)
      else if (touchEndX > touchStartX + swipeThreshold) {
        const newIndex =
          carouselCurrentIndex > 0
            ? carouselCurrentIndex - 1
            : carouselSlides.length - 1;
        showCarouselSlide(newIndex);
      }
      // Reset values (for small taps that aren't swipes)
      touchStartX = 0;
      touchEndX = 0;
    }

    window.addEventListener("resize", () => {
      if (carouselSlides.length > 0) {
        carouselSlideWidth = mainTrack.parentElement.offsetWidth;
        showCarouselSlide(carouselCurrentIndex);
      }
    });
  }

  function showCarouselSlide(index) {
    if (carouselSlides.length === 0) return;

    // FIX: Changed 'featuredTrack' to 'mainTrack'
    mainTrack.style.transform = `translateX(-${index * carouselSlideWidth}px)`;
    carouselCurrentIndex = index;
  }

  /**
   * Initializes the auto-scrolling strip.
   */
  function initScrollStrip() {
    if (!scrollTrack) return;

    // Clear old animation styles
    scrollTrack.style.animation = "none";

    // Need a slight delay to allow browser to clear track
    setTimeout(() => {
      const originalItems = Array.from(scrollTrack.children);
      if (originalItems.length === 0) return;

      let originalSetWidth = 0;
      originalItems.forEach((item) => {
        const style = window.getComputedStyle(item);
        originalSetWidth += item.offsetWidth + parseFloat(style.marginRight);
      });

      if (originalSetWidth === 0) return; // Stop if images haven't loaded

      const containerWidth = document.getElementById(
        "gallery-strip-container"
      ).offsetWidth;
      const setsNeeded = Math.max(
        2,
        Math.ceil(containerWidth / originalSetWidth) + 1
      );

      // Clone the *original set* that many times
      for (let i = 0; i < setsNeeded; i++) {
        originalItems.forEach((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          scrollTrack.appendChild(clone);
        });
      }

      // Inject the keyframe rule dynamically
      const styleSheetId = "gallery-scroll-animation";
      let styleSheet = document.getElementById(styleSheetId);
      if (styleSheet) {
        styleSheet.remove(); // Remove old one to recalculate
      }

      styleSheet = document.createElement("style");
      styleSheet.id = styleSheetId;
      styleSheet.type = "text/css";
      styleSheet.innerText = `
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${originalSetWidth}px); }
        }
        `;
      document.head.appendChild(styleSheet);

      const duration = originalSetWidth / 60; // Speed: 60 pixels per second
      scrollTrack.style.animation = `scroll ${duration}s linear infinite`;
    }, 10); // 10ms delay
  }

  /**
   * Creates the lightbox HTML and attaches all listeners.
   */
  function initLightbox() {
    if (!lightbox) return;

    // Create lightbox structure once
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close close-btn" id="lightboxClose">&times;</button>
        <div class="lightbox-nav">
          <button class="lightbox-btn" id="lightboxPrevBtn"><i class="fas fa-chevron-left"></i></button>
          <button class="lightbox-btn" id="lightboxNextBtn"><i class="fas fa-chevron-right"></i></button>
        </div>
        <img id="lightboxImage" src="" alt="">
        <div class="lightbox-caption">
          <h3 id="lightboxTitle"></h3>
          <p id="lightboxSubtitle"></p>
        </div>
      </div>
    `;

    // Add Event Listeners
    document
      .getElementById("lightboxClose")
      .addEventListener("click", closeLightbox);
    document
      .getElementById("lightboxPrevBtn")
      .addEventListener("click", () => navigateLightbox(-1));
    document
      .getElementById("lightboxNextBtn")
      .addEventListener("click", () => navigateLightbox(1));

    // Open lightbox from *any* card
    document.body.addEventListener("click", (e) => {
      const card = e.target.closest(".training-card, .training-card-small");
      if (card) {
        const originalIndex = parseInt(card.dataset.index, 10);
        openLightbox(originalIndex);
      }
    });

    // Keyboard nav
    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("active")) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navigateLightbox(-1);
        if (e.key === "ArrowRight") navigateLightbox(1);
      }
    });

    // Close on overlay click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // --- 7. LIGHTBOX HELPER FUNCTIONS ---

  function openLightbox(originalDataIndex) {
    // Save the index from the *original* allData array
    currentLightboxIndex = originalDataIndex;
    const item = allData[originalDataIndex];
    if (!item) return;

    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxSubtitle = document.getElementById("lightboxSubtitle");

    lightboxImage.classList.add("changing");

    setTimeout(() => {
      lightboxImage.src = item.image;
      lightboxImage.alt = item.title;
      lightboxTitle.textContent = item.title;
      lightboxSubtitle.textContent = item.subtitle;
      setTimeout(() => {
        lightboxImage.classList.remove("changing");
      }, 50);
    }, 250);

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  /**
   * Navigates the lightbox based on the *currently filtered* list.
   */
  function navigateLightbox(direction) {
    // Find where the *current* lightbox item is in the *filtered* list
    const currentItem = allData[currentLightboxIndex];
    let filteredIndex = filteredData.indexOf(currentItem);

    let newFilteredIndex;
    if (filteredIndex === -1) {
      // Item not in filtered list (e.g., clicked from scroll strip)
      // find closest item in filtered list to navigate from
      let closest = -1;
      for (let i = 0; i < filteredData.length; i++) {
        const originalIdx = allData.indexOf(filteredData[i]);
        if (direction > 0 && originalIdx > currentLightboxIndex) {
          closest = i;
          break;
        }
        if (direction < 0 && originalIdx < currentLightboxIndex) {
          closest = i;
          // keep searching for the one *closest* (largest index)
        }
      }

      if (closest !== -1) {
        newFilteredIndex = closest;
      } else {
        // if no "closest" found, just loop
        newFilteredIndex = direction > 0 ? 0 : filteredData.length - 1;
      }
    } else {
      // Item is in the filtered list, navigate from its position
      newFilteredIndex = filteredIndex + direction;
    }

    // Loop navigation
    if (newFilteredIndex < 0) {
      newFilteredIndex = filteredData.length - 1;
    } else if (newFilteredIndex >= filteredData.length) {
      newFilteredIndex = 0;
    }

    // Get the new item from the filtered list
    const newItem = filteredData[newFilteredIndex];
    if (!newItem) return;

    // Find its original index to pass to openLightbox
    const originalIndex = allData.indexOf(newItem);
    openLightbox(originalIndex);
  }

  // --- 8. INITIALIZE EVERYTHING ON LOAD ---
  // Ensure we are on a page that has the "ourWork" section
  if (document.getElementById("ourWork")) {
    populateGalleries();
    initFilter();
    initFeaturedCarousel();
    initScrollStrip();
    initLightbox();
  }
});
