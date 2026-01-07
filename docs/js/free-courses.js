class GestorCOURSES {
  constructor() {
    this.actualCourse = null;
    this.actualVideo = 0;
    this.viewedVideos = new Set();
    this.globalProgress =
      JSON.parse(localStorage.getItem("coursesProgress")) || {};
    this.player = null;
    this.progressInterval = null;
    this.vCompletedManually = new Set();

    this.initialize();
  }

  initialize() {
    this.showCourses();
    this.configEventListeners();
  }
  // create free courses cards
  showCourses() {
    const grid = document.getElementById("free-courses-container");
    grid.innerHTML = "";

    Object.values(COURSES).forEach((course) => {
      const progress = this.globalProgress[course.id] || {
        viewedVideos: 0,
        totalVideos: course.courseVideos.length,
      };
      const percentage =
        progress.totalVideos > 0
          ? (progress.viewedVideos / progress.totalVideos) * 100
          : 0;

      const freeCoursecard = document.createElement("div");

      freeCoursecard.className = "free-course-card";
      freeCoursecard.innerHTML = `
          <!-- cover -->
            <div class="course-cover">
              <!-- image -->
              <img src="${course.courseImage}" alt="${course.courseTitle}">
            </div>
            <!-- course info and smt btn --> 
            <div class="card-content">
              <!-- title -->
              <h3 class="card-title">${course.courseTitle}
              </h3>
              <div class="free-course-details">
                <div class="course-info">
                  <!-- duration -->
                  <span class="course-info-item">
                    <i class="fa-solid fa-clock"></i>${course.courseDuration}
                  </span>
                  <!-- language -->
                  <span class="course-info-item">
                    <i class="fa-solid fa-language"></i>${course.language}
                  </span>
                </div>
                  <!-- advance percentage -->
                  <div class="free-course-progress-container">
                    <div class="free-course-progress-bar" style="width: ${percentage}%"></div>
                  </div>
                  <!-- viewed videos -->
                  <span class="viewed-videos">
                    <i class="fa-solid fa-eye"></i>
                  ${progress.viewedVideos || 0} / ${progress.totalVideos}
                  </span>
              </div>
            </div>`;

      freeCoursecard.addEventListener("click", () =>
        this.openPlayer(course.id)
      );
      grid.appendChild(freeCoursecard);
    });
  }

  // close video modal window
  configEventListeners() {
    // close modal windows
    document
      .querySelectorAll("#close-free-course-btn")
      .forEach((freeCloseBtn) => {
        freeCloseBtn.addEventListener("click", (e) => {
          this.destroyPlayer();
          e.target.closest(".free-courses-modal-window").style.display = "none";
          document.body.style.overflow = "";
        });
      });

    // close modal windows when the user clicks off
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("free-courses-modal-window")) {
        this.destroyPlayer();
        e.target.style.display = "none";
        document.body.style.overflow = "";
      }
    });
    // stops player when the user clicks off window
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.player && this.player.pauseVideo) {
        this.player.pauseVideo();
      }
    });
  }

  openPlayer(courseId) {
    this.actualCourse = COURSES[courseId];
    this.actualVideo = 0;
    this.viewedVideos = new Set();

    // load saved progress
    const savedProgress = this.globalProgress[courseId];
    if (savedProgress && savedProgress.views) {
      this.viewedVideos = new Set(savedProgress.views);
    }

    this.showPlayer();
    document.getElementById("videoModal").style.display = "flex";
    document.body.style.overflow = "hidden"; // stop scroll propagation
  }

  showPlayer() {
    const container = document.getElementById("videoPlayerContainer");
    const curso = this.actualCourse;

    container.innerHTML = `
      <div class="vpc-header">
        <!-- title and status -->
        <div class="vpc-info">
          <h2 class="vpcTitle">${curso.courseTitle}</h2>
          <div class="progress-container-global vpc-progress">
            <div class="progress-bar-global" id="progresoCurso"></div>
          </div>
          <p id="estadoProgreso">Progress: 0%</p>
        </div>
        <button class="globalBtn btnGradient download-certificate-btn btn" id="btnCertificado" disabled><i class="fa-solid fa-medal"></i>Get Certificate</button>
      </div>
        
      <div class="video-container">
        <div class="video-principal">
          <div id="videoPrincipal"></div>
        </div>
        <div class="playlist" id="playlist"></div>
      </div>`;

    this.cargarPlaylist();
    this.initializeYouTubePlayer();
    this.actualizarProgreso();
    this.configurarBotones();
  }

  initializeYouTubePlayer() {
    if (!window.YT) {
      console.warn("YouTube API no cargada");
      return;
    }
    setTimeout(() => {
      this.crearReproductor();
    }, 100);
  }

  crearReproductor() {
    if (!this.actualCourse) return;

    const video = this.actualCourse.courseVideos[this.actualVideo];

    try {
      this.player = new YT.Player("videoPrincipal", {
        height: "100%",
        width: "100%",
        videoId: video.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          showinfo: 0,
        },
        events: {
          onReady: this.onPlayerReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this),
          onError: this.onPlayerError.bind(this),
        },
      });
    } catch (error) {
      console.error("Error creating player:", error);
    }
  }

  onPlayerReady(event) {
    console.log("Reproductor de YouTube listo");
    this.iniciarSeguimientoProgreso();
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.ENDED:
        console.log("Video terminado naturalmente");
        this.marcarVideoComoVisto("automatico");
        break;
      case YT.PlayerState.PLAYING:
        console.log("Reproduciendo video");
        break;
      case YT.PlayerState.PAUSED:
        console.log("Video pausado");
        break;
      case YT.PlayerState.BUFFERING:
        console.log("Video cargando");
        break;
    }
  }

  onPlayerError(event) {
    console.error("Error en el reproductor de YouTube:", event.data);
    this.mostrarNotificacion(
      /* error */
      '<span style="color: rgba(247, 6, 54, 0.8);"><i class="fa-regular fa-circle-xmark" style="margin: 0 8px;"></i>Video not found</span>'
    );
  }

  iniciarSeguimientoProgreso() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    this.progressInterval = setInterval(() => {
      if (
        this.player &&
        this.player.getCurrentTime &&
        this.player.getDuration
      ) {
        try {
          const tiempoActual = this.player.getCurrentTime();
          const duracion = this.player.getDuration();

          if (duracion > 0 && tiempoActual / duracion > 0.95) {
            this.marcarVideoComoVisto("automatico");
            clearInterval(this.progressInterval);
          }
        } catch (error) {
          console.warn("Error verificando progreso:", error);
        }
      }
    }, 3000);
  }

  destroyPlayer() {
    console.log("Destruyendo reproductor...");

    // Limpiar intervalo de progreso
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }

    // Destruir el reproductor de YouTube completamente
    if (this.player) {
      try {
        if (this.player.stopVideo) {
          this.player.stopVideo();
        }
        if (this.player.destroy) {
          this.player.destroy();
        }
      } catch (error) {
        console.warn("Error destruyendo reproductor:", error);
      }
      this.player = null;
    }

    // Limpiar el contenedor del video
    const videoContainer = document.getElementById("videoPrincipal");
    if (videoContainer) {
      videoContainer.innerHTML = "";
    }

    console.log("Reproductor destruido completamente");
  }

  pausarReproductor() {
    if (this.player && this.player.pauseVideo) {
      try {
        this.player.pauseVideo();
        this.mostrarNotificacion("⏸️ Video pausado");
      } catch (error) {
        console.warn("Error pausando video:", error);
      }
    }
  }

  cambiarVideo(index) {
    console.log(`Cambiando a video índice: ${index}`);

    // Destruir el reproductor actual
    this.destroyPlayer();

    // Cambiar el índice del video actual
    this.actualVideo = index;

    // Recargar el reproductor con el nuevo video
    setTimeout(() => {
      this.crearReproductor();
      this.cargarPlaylist();
    }, 300);
  }

  cargarPlaylist() {
    const playlist = document.getElementById("playlist");
    if (!playlist) return;

    playlist.innerHTML = "";

    this.actualCourse.courseVideos.forEach((video, index) => {
      const miniatura = document.createElement("div");
      miniatura.className = `video-miniatura ${
        index === this.actualVideo ? "activo" : ""
      } ${this.viewedVideos.has(video.id) ? "completado" : ""}`;

      miniatura.innerHTML = `
        <img src="${video.youtubeImage}" alt="${
        video.title
      }" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&h=60&fit=crop'">
        <div class="info">
            <div class="course-title">${video.title}</div>
        </div>
        <div class="acciones-video">
            ${
              !this.viewedVideos.has(video.id)
                ? `<button class="btn-completar" title="Marcar como completado">
                <i class="fa-regular fa-circle-check"></i></button>`
                : '<span class="completado-check"><i class="fa-solid fa-circle-check"></i></span>'
            }
        </div>
      `;

      // Agregar al DOM primero
      playlist.appendChild(miniatura);

      // Event listener para el botón completar
      const btnCompletar = miniatura.querySelector(".btn-completar");
      if (btnCompletar) {
        btnCompletar.onclick = (e) => {
          e.stopPropagation();
          this.completarVideoManualmente(video.id);
        };
      }

      // Event listener para cambiar video (click en toda la miniatura)
      miniatura.onclick = (e) => {
        // No cambiar si clickeaste el botón
        if (e.target.closest(".btn-completar")) {
          return;
        }

        // No cambiar si ya es el video actual
        if (index === this.actualVideo) {
          console.log("Ya es el video actual");
          return;
        }

        // Cambiar de video
        console.log(`Click en miniatura ${index}: ${video.title}`);
        this.cambiarVideo(index);
      };
    });
  }

  completarVideoManualmente(videoId) {
    if (!this.viewedVideos.has(videoId)) {
      this.vCompletedManually.add(videoId);
      this.viewedVideos.add(videoId);
      this.guardarProgreso();
      this.actualizarProgreso();
      this.cargarPlaylist();

      this.mostrarNotificacion(
        '<span style="color: rgba(13, 151, 47, 0.8);"><i class="fa-regular fa-circle-check" style="margin: 0 8px;"></i>Marked as View</span>'
      );
    }
  }

  marcarVideoComoVisto(tipo = "automatico") {
    const videoId = this.actualCourse.courseVideos[this.actualVideo].id;

    if (!this.viewedVideos.has(videoId)) {
      this.viewedVideos.add(videoId);
      if (tipo === "manual") {
        this.vCompletedManually.add(videoId);
      }

      this.guardarProgreso();
      this.actualizarProgreso();
      this.cargarPlaylist();

      const mensaje =
        tipo === "automatico"
          ? '<span style="color: rgba(13, 151, 47, 0.8);"><i class="fa-solid fa-circle-check" style="margin: 0 8px"></i>¡Video Completed!</span>'
          : '<span style="color: rgba(13, 151, 47, 0.8);"><i class="fa-solid fa-circle-check" style="margin: 0 8px"></i>Marked as View</span>';

      this.mostrarNotificacion(mensaje);

      // Avanzar automáticamente solo si fue completado naturalmente
      if (
        tipo === "automatico" &&
        this.actualVideo < this.actualCourse.courseVideos.length - 1
      ) {
        setTimeout(() => {
          this.cambiarVideo(this.actualVideo + 1);
        }, 2000);
      }
    }
  }

  guardarProgreso() {
    if (!this.actualCourse) return;

    this.globalProgress[this.actualCourse.id] = {
      viewedVideos: this.viewedVideos.size,
      totalVideos: this.actualCourse.courseVideos.length,
      views: Array.from(this.viewedVideos),
      ultimaActualizacion: new Date().toISOString(),
    };

    localStorage.setItem(
      "coursesProgress",
      JSON.stringify(this.globalProgress)
    );
    this.showCourses();
  }

  actualizarProgreso() {
    const progresoBarra = document.getElementById("progresoCurso");
    const estadoProgreso = document.getElementById("estadoProgreso");

    if (!progresoBarra || !estadoProgreso || !this.actualCourse) return;

    const totalVideos = this.actualCourse.courseVideos.length;
    const videosCompletados = this.viewedVideos.size;
    const porcentaje = (videosCompletados / totalVideos) * 100;

    progresoBarra.style.width = `${porcentaje}%`;
    estadoProgreso.textContent = `Progress: ${Math.round(
      porcentaje
    )}% (${videosCompletados}/${totalVideos} videos)`;

    const btnCertificado = document.getElementById("btnCertificado");
    if (btnCertificado && porcentaje === 100) {
      btnCertificado.disabled = false;
      btnCertificado.classList.add("completado");
    }
  }

  configurarBotones() {
    const btnCertificado = document.getElementById("btnCertificado");
    if (btnCertificado) {
      btnCertificado.addEventListener("click", () => {
        if (!btnCertificado.disabled) {
          this.mostrarFormularioCertificado();
        }
      });
    }
  }

  mostrarFormularioCertificado() {
    /* pausar video: */
    if (this.player && this.player.pauseVideo) {
      this.player.pauseVideo();
    }

    const container = document.getElementById("certificateContainer");
    container.innerHTML = `
    <div class="certificate-form-content">
      <h2 class="demo-modal-title"><i class="fa-solid fa-trophy" style="margin: 0 8px"></i>Congratulations</h2>
      <p class="brochure-modal-description">You have successfully completed the course, obtain your certificate for free.</p>
      <div id="downloadCertificateForm">     
        <div class="label-input">
          <label for="studentName"><i class="fa-solid fa-user"></i></label>
          <input type="text" id="studentName" name="name" placeholder="Your Full Name" required>
        </div>
      </div>
      <!-- buttons -->
      <div class="certificate-actions">
        <button class="globalBtn btnGradient download-certificate-btn btn" onclick="window.gestor.descargarCertificadoPNG()"><i class="fa-solid fa-download"></i> Download PNG</button>
        <button class="globalBtn btn" onclick="window.gestor. descargarCertificadoPDF()"><i class="fa-solid fa-print"></i> Print</button>
      </div>

    </div>`;

    document.getElementById("studentName").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.descargarCertificadoPNG();
      }
    });
    document.getElementById("certificateModal").style.display = "flex";
  }

  /* DOWNLOAD IN PNG */
  descargarCertificadoPNG() {
    const name = document.getElementById("studentName").value.trim();

    if (!name) {
      this.mostrarNotificacion(
        /* error */
        '<span style="color: rgba(247, 6, 54, 0.8);"><i class="fa-regular fa-circle-xmark" style="margin: 0 8px;"></i>Please type your name</span>'
      );
      return;
    }

    const date = new Date().toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const iDCertificate = `CERT-${Date.now()}`;

    const container = document.createElement("div");
    container.innerHTML = `
      <div class="certificateContent" id="printableCertificate" style="
      background: #fff; 
      border: solid 1px rgba(13, 0, 255, 0.1);
      width: 640px;  /* Ancho pequeño como deseas */
      height: 478px;  /* Alto proporcional */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      box-sizing: border-box;
    ">

        <div class="mainContent" style="
        border-radius: 4px;
        border: double 4px rgba(13, 0, 255, 0.2);
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        box-sizing: border-box;
      ">
          <div class="certificateHeader" style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem;
        ">
            <img src="./assets/images/udayam-ai-labs-navbar-logo.png" class="certificateLogo" style="width: 210px; object-fit: contain;">
            <div class="certificateID" style="font-size: .8rem; color: var(--text-light);">ID: ${iDCertificate}</div>
          </div>
          <div class="certificateBody" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: .64rem;
          padding: 1rem;
          flex-grow: 1;
        ">
            <h3 class="certificateID" style="font-size: 1rem; color: var(--text-light);">Certificate of Completition:</h3>
            <h3 class="certificateTitle" style="font-size: 1.82rem; font-weight: 600; line-height: 1.3; color: #333; text-transform: capitalize;">${this.actualCourse.courseTitle}</h3>
            <h3 class="certificateID" style="font-size: 1rem; color: var(--text-light);">Issued To:</h3>
            <div class="studentName" style="font-size: 1.72rem; font-weight: 600; color: #333; text-transform: capitalize;">${name}</div>
            <p class="certificateDate" style="font-size: .96rem; font-weight: 400; color: var(--text-light);">Date: ${date}</p>
            <p class="certificateDuration" style="font-size: .96rem; font-weight: 400; color: var(--text-light);">Duration: ${this.actualCourse.courseDuration}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    setTimeout(() => {
      this.mostrarNotificacion(
        '<span style="color: rgba(13, 151, 47, 0.8);"><i class="fa-regular fa-circle-check" style="margin:0 8px"></i>Certificate Generated</span>'
      );
    }, 1000);

    if (window.html2canvas) {
      html2canvas(container.querySelector(".certificateContent"), {
        scale: 2,
        background: "#fff",
        width: 640,
        height: 480,
        userCORS: true,
        allowTaint: false,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `cert-${this.actualCourse.id}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        setTimeout(() => {
          this.mostrarNotificacion(
            '<span style="color: rgba(13, 151, 47, 0.8);"><i class="fa-solid fa-image" style="margin: 0 8px"></i>Downloaded as PNG</span>'
          );
        }, 1000);
        setTimeout(() => {
          document.body.removeChild(container);
          // Close modal
          document
            .querySelectorAll(".free-courses-modal-window")
            .forEach((modal) => {
              modal.style.display = "none";
              document.body.style.overflow = "";
            });
        }, 3000);
      });
    } else {
      setTimeout(() => {
        this.mostrarNotificacion(
          '<span style="color: rgba(247, 6, 54, 0.8);"><i class="fa-regular fa-circle-xmark"style="margin: 0 8px"></i> html canvas unavailable</span>'
        );
      }, 1000);
    }
  }
  /* DOWNLOAD IN PDF  */
  descargarCertificadoPDF() {
    const name = document.getElementById("studentName").value.trim();

    if (!name) {
      this.mostrarNotificacion(
        '<span style="color: rgba(247, 6, 54, 0.8);"><i class="fa-regular fa-circle-xmark" style="margin: 0 8px;"></i>Please type your name</span>'
      );
      return;
    }

    const date = new Date().toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const iDCertificate = `CERT-${Date.now()}`;

    const container = document.createElement("div");
    container.innerHTML = `
      <div class="certificateContent" id="printableCertificate" style="
      background: #fff; 
      border: solid 1px rgba(13, 0, 255, 0.1);
      width: 640px;  /* Ancho pequeño como deseas */
      height: 478px;  /* Alto proporcional */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      box-sizing: border-box;
    ">

        <div class="mainContent" style="
        border-radius: 4px;
        border: double 4px rgba(13, 0, 255, 0.2);
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        box-sizing: border-box;
      ">
          <div class="certificateHeader" style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem;
        ">
            <img src="./assets/images/udayam-ai-labs-navbar-logo.png" class="certificateLogo" style="width: 210px; object-fit: contain;">
            <div class="certificateID" style="font-size: .8rem; color: var(--text-light);">ID: ${iDCertificate}</div>
          </div>
          <div class="certificateBody" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: .64rem;
          padding: 1rem;
          flex-grow: 1;
        ">
            <h3 class="certificateID" style="font-size: 1rem; color: var(--text-light);">Certificate of Completition:</h3>
            <h3 class="certificateTitle" style="font-size: 1.82rem; font-weight: 600; line-height: 1.3; color: #333; text-transform: capitalize;">${this.actualCourse.courseTitle}</h3>
            <h3 class="certificateID" style="font-size: 1rem; color: var(--text-light);">Issued To:</h3>
            <div class="studentName" style="font-size: 1.72rem; font-weight: 600; color: #333; text-transform: capitalize;">${name}</div>
            <p class="certificateDate" style="font-size: .96rem; font-weight: 400; color: var(--text-light);">Date: ${date}</p>
            <p class="certificateDuration" style="font-size: .96rem; font-weight: 400; color: var(--text-light);">Duration: ${this.actualCourse.courseDuration}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    if (window.html2canvas && window.jspdf) {
      html2canvas(container.querySelector(".certificateContent"), {
        scale: 2,
        background: "#fff",
        width: 640,
        height: 480,
        useCORS: true,
        allowTaint: false,
      }).then((canvas) => {
        // Generar PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: [169.3, 127],
        });
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 0, 0, 169.3, 127);
        pdf.save(`certificate-${name}-${this.actualCourse.id}.pdf`);

        setTimeout(() => {
          this.mostrarNotificacion(
            '<span style="color: rgba(13, 151, 47, 0.8);"><i class="fa-solid fa-file-pdf" style="margin: 0 8px"></i>Downloaded as PDF</span>'
          );
        }, 1000);

        // Cerrar modal y limpiar
        setTimeout(() => {
          document.body.removeChild(container);
          document
            .querySelectorAll(".free-courses-modal-window")
            .forEach((modal) => {
              modal.style.display = "none";
              document.body.style.overflow = "";
            });
        }, 3000);
      });
    } else {
      setTimeout(() => {
        this.mostrarNotificacion(
          '<span style="color: rgba(247, 6, 54, 0.8);"><i class="fa-regular fa-circle-xmark"style="margin: 0 8px"></i>Required libraries missing</span>'
        );
      }, 1000);
    }
  }

  mostrarNotificacion(mensaje) {
    const notif = document.createElement("div");
    notif.className = "notification";
    notif.innerHTML = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.remove();
    }, 3000);
  }
}

// Exponer globalmente para que funcionen los onclick del HTML
window.gestor = null;

// Inicialización después de que la API de YouTube esté lista
function onYouTubeIframeAPIReady() {
  console.log("YouTube API lista");
  if (!window.gestor) {
    window.gestor = new GestorCOURSES();
  }
}

// Fallback si YouTube API ya está cargada
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM cargado");

  setTimeout(() => {
    if (window.YT && window.YT.Player && !window.gestor) {
      console.log("Inicializando gestor desde DOMContentLoaded");
      window.gestor = new GestorCOURSES();
    }
  }, 1000);
});
