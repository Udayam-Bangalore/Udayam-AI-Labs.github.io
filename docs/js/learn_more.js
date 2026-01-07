document.addEventListener("DOMContentLoaded", () => {
  const courseData = {
    "beginners": {
      title: "AI Mastery Course 2025 for Beginners",
      description: "Master AI from the basics to the latest breakthroughs, and stay ahead in the fast-evolving world of AI in 2025.",
      rating: "⭐⭐⭐⭐ 4.4 (18 ratings) • 41 students enrolled",
      meta: "Created by Talent looom, Sarthak Sathu • Last updated 05/25",
      image: "https://img-c.udemycdn.com/course/240x135/6418257_5e36_2.jpg",
      price: "&#8377;399",
      originalPrice: "&#8377;799",
      discount: "50% OFF",
      stats: [
        { value: "2.5 hrs", label: "On-demand video" },
        { value: "42", label: "Assignments" },
        { value: '<i class="fa-solid fa-mobile"></i>', label: "Access on mobile and TV" },
        { value: "∞", label: "Full lifetime access" },
        { value: '<i class="fa-solid fa-certificate"></i>', label: "Certifications" }
      ],
      whatYouLearn: [
        "Distinguish between AI types and understand their real-world applications across industries",
        "Master the complete AI project lifecycle from data exploration to model deployment",
        "Understand supervised, unsupervised, and reinforcement learning approaches",
        "Build and evaluate neural networks, CNNs, and transformers for advanced AI applications",
        "Apply performance metrics to assess model accuracy, precision, recall, and F1 scores",
        "Navigate ethical considerations and develop responsible AI implementation strategies",
        "Analyze AI applications in healthcare, sports analytics, and cybersecurity",
        "Create AI solutions through hands-on labs and a comprehensive capstone project",
        "Master prompt engineering techniques for effective communication with large language models",
        "Develop in-demand, future-proof AI skills that enhance your career prospects"
      ],
      curriculum: [
        { title: "1. Introduction", meta: "2 lectures • 5min" },
        { title: "2. AI Unveiled: A journey into the future", meta: "6 lectures • 27min" },
        { title: "3. Inside the AI Engine: Unraveling How It Works", meta: "5 lectures • 25min" },
        { title: "4. Exploring the ML Family: A Tour of Model Types and Variations", meta: "8 lectures • 16min" },
        { title: "5. Beyond Machine Learning: The Deep Learning Revolution", meta: "5 lectures • 9min" },
        { title: "6. Is My Model on Point?", meta: "4 lectures • 14min" },
        { title: "7. Analyzing Real-World Scenarios", meta: "4 lectures • 27min" },
        { title: "8. Capstone project", meta: "1 lectures • 10min" },
        { title: "9. Foundations of AI Ethics and Prompt Engineering", meta: "2 lectures • 18min" },
        { title: "10. Conclusion", meta: "1 lecture • 1min" }
      ],
      requirements: [
        "No prior experience with AI or programming is needed, but an eagerness to learn and explore new technologies is a plus!"
      ]
    },
    "experts": {
      title: "AI Mastery Course 2025 for Experts",
      description: "Advanced techniques in Generative AI, LLM Fine-tuning, and Large Scale Deployment.",
      rating: "⭐⭐⭐⭐⭐ 4.8 (31 ratings) • 120 students enrolled",
      meta: "Created by Udayam AI Labs • Last updated 06/25",
      image: "https://img-c.udemycdn.com/course/240x135/6418257_5e36_2.jpg",
      price: "&#8377;999",
      originalPrice: "&#8377;1999",
      discount: "50% OFF",
      stats: [
        { value: "12 hrs", label: "Advanced video content" },
        { value: "15", label: "Capstone Projects" },
        { value: '<i class="fa-solid fa-mobile"></i>', label: "Access on mobile and TV" },
        { value: "∞", label: "Full lifetime access" },
        { value: '<i class="fa-solid fa-certificate"></i>', label: "Expert Certification" }
      ],
      whatYouLearn: [
        "Fine-tune Large Language Models (LLMs) on custom datasets",
        "Architect scalable AI systems using Kubernetes and Ray",
        "Implement RAG (Retrieval Augmented Generation) pipelines",
        "Advanced Computer Vision with Transformers",
        "Ethical AI and Bias Mitigation strategies",
        "Optimize AI models for edge devices"
      ],
      curriculum: [
        { title: "1. Advanced LLM Architectures", meta: "5 lectures • 2hr" },
        { title: "2. Fine-tuning Strategies (LoRA, QLoRA)", meta: "8 lectures • 3hr" },
        { title: "3. RAG Systems Implementation", meta: "6 lectures • 2.5hr" },
        { title: "4. Scalable Deployment with Kubernetes", meta: "10 lectures • 4hr" },
        { title: "5. AI Ethics and Safety", meta: "4 lectures • 1.5hr" }
      ],
      requirements: [
        "Strong Python programming skills",
        "Experience with PyTorch or TensorFlow",
        "Basic understanding of Deep Learning concepts",
        "Familiarity with cloud platforms (AWS/GCP/Azure)"
      ]
    }
  };

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function loadCourseDetails() {
    const courseId = getQueryParam("course") || "beginners"; // Default to beginners
    const data = courseData[courseId];

    if (!data) {
      console.error("Course not found:", courseId);
      return;
    }

    // Update Text Content
    document.getElementById("course-title").textContent = data.title;
    document.title = data.title + " - Udayam AI Labs";
    document.getElementById("course-description").textContent = data.description;
    document.getElementById("course-rating").textContent = data.rating;
    document.getElementById("course-meta").textContent = data.meta;
    document.getElementById("course-price").innerHTML = data.price;
    document.getElementById("course-original-price").innerHTML = data.originalPrice;
    document.getElementById("course-discount").textContent = data.discount;
    
    // Update Image
    document.getElementById("course-image").src = data.image; 

    // Update Stats
    const statsContainer = document.getElementById("course-stats");
    statsContainer.innerHTML = data.stats.map(stat => `
      <div class="stat-item">
        <div class="stat-number">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join("");

    // Update What You'll Learn
    const learnContainer = document.getElementById("what-you-learn-list");
    learnContainer.innerHTML = data.whatYouLearn.map(item => `
      <div class="learn-item">
        <span class="check-icon">✓</span>
        <span>${item}</span>
      </div>
    `).join("");

    // Update Curriculum
    const curriculumContainer = document.getElementById("curriculum-list");
    curriculumContainer.innerHTML = data.curriculum.map(item => `
      <div class="curriculum-item">
        <div class="curriculum-header">
          <h3>${item.title}</h3>
          <span class="section-meta">${item.meta}</span>
        </div>
      </div>
    `).join("");

    // Update Requirements
    const reqContainer = document.getElementById("requirements-list");
    reqContainer.innerHTML = data.requirements.map(item => `
      <li>${item}</li>
    `).join("");
  }

  loadCourseDetails();
});
