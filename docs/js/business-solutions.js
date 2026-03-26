document.addEventListener("DOMContentLoaded", () => {
  const businessData = [
    {
      title: "Alandi Vivah Sanstha",
      description: "Indian matormonial website",
      tags: ["WordPress"],
      category: "web",
      image: "assets/images/gallery/alandi-vivah-sanstha.webp",
      link: "https://courtmarriagealandi.com",
      imgStyle: "object-fit: contain; background-color: #e6f2ff;"
    },
    {
      title: "Custom Mobile App",
      description: "Intelligent mobile applications enhanced with AI capabilities.",
      tags: ["Flutter", "AI"],
      category: "app",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" // Placeholder
    },
    {
      title: "Custom GPT Integration",
      description: "Automating customer support with custom GPT models.",
      tags: ["Python", "OpenAI"],
      category: "ai",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" // Placeholder
    }
  ];

  const gridContainer = document.getElementById("business-grid");
  const filterContainer = document.getElementById("business-filter-container");
  const filterIndicator = document.getElementById("business-filter-indicator");
  const filterButtons = filterContainer ? filterContainer.querySelectorAll(".filter-btn") : [];

  function renderCards(filter = "all") {
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    const filteredData = filter === "all" 
      ? businessData 
      : businessData.filter(item => item.category === filter);

    if (filteredData.length === 0) {
      gridContainer.innerHTML = "<p>No projects found for this category.</p>";
      return;
    }

    filteredData.forEach(item => {
      const card = document.createElement("div");
      card.className = "training-card";
      // Add a slight animation effect
      card.style.animation = "fadeInUp 0.5s ease forwards";
      
      card.innerHTML = `
        <div class="training-card-image">
          <img src="${item.image}" alt="${item.title}" style="${item.imgStyle || ''}">
          <span class="institution-badge" style="background: var(--primary-color);">${item.tags[0]}</span>
        </div>
        <div class="training-card-content">
          <h3 class="training-card-title">${item.title}</h3>
          <p class="service-desc">${item.description}</p>
        </div>
      `;
      
      if (item.link) {
        card.style.cursor = "pointer";
        card.onclick = () => window.open(item.link, "_blank");
      }
      
      gridContainer.appendChild(card);
    });
  }

  function moveIndicator(target) {
    if (!target || !filterIndicator || !filterContainer) return;
    const containerRect = filterContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const left = targetRect.left - containerRect.left;
    const width = targetRect.width;
    
    filterIndicator.style.left = `${left}px`;
    filterIndicator.style.width = `${width}px`;
    
    filterButtons.forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");
  }

  if (filterContainer && filterButtons.length > 0) {
    console.log("Business Solutions: Initializing filters...");
    // Initial render
    renderCards("all");
    
    // Initial indicator position
    const activeBtn = filterContainer.querySelector('.filter-btn.active') || filterButtons[0];
    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
        moveIndicator(activeBtn);
        console.log("Business Solutions: Indicator moved to", activeBtn.innerText);
    });

    // Event listeners
    filterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        console.log("Business Solutions: Filter clicked", e.currentTarget.dataset.filter);
        const target = e.currentTarget;
        const filter = target.dataset.filter;
        moveIndicator(target);
        renderCards(filter);
      });
    });

    // Handle resize
    window.addEventListener("resize", () => {
      const currentActive = filterContainer.querySelector(".filter-btn.active");
      if (currentActive) moveIndicator(currentActive);
    });
  } else {
      console.error("Business Solutions: Filter container or buttons not found!");
  }
});
