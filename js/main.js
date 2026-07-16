// Aggiorna l'anno nel footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Grafici: apertura/chiusura della finestra di ingrandimento
document.addEventListener("DOMContentLoaded", () => {
  // Rimpicciolisce (se serve) il grafico ingrandito perché stia sempre
  // interamente a schermo, senza dover scorrere. Il grafico a barre
  // "Riviste e Quotidiani" (modal-riviste-2, molto lungo) è escluso di
  // proposito: per quello la barra di scorrimento resta, come richiesto.
  function fitModalChart(modal) {
    if (modal.dataset.noAutofit === "true") return;
    if (!modal.classList.contains("open")) return;

    const embed = modal.querySelector(".flourish-embed");
    if (!embed) return;

    const contentHeight = embed.getBoundingClientRect().height;
    const available = window.innerHeight * 0.85 - 70; // margine per padding e pulsante chiudi

    if (contentHeight > available && available > 150) {
      const scale = available / contentHeight;
      embed.style.transformOrigin = "top center";
      embed.style.transform = `scale(${scale})`;
      // collassa lo spazio vuoto lasciato dallo scale, che non riduce
      // da solo l'ingombro dell'elemento nel flusso della pagina
      embed.style.marginBottom = `${-(contentHeight - contentHeight * scale)}px`;
    }
  }

  function openModal(modal) {
    const embed = modal.querySelector(".flourish-embed");
    if (embed) {
      embed.style.transform = "";
      embed.style.marginBottom = "";
    }

    modal.classList.add("open");
    // forza Flourish a ricalcolare le dimensioni ora che il grafico è visibile
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    // aspetta che Flourish finisca di disegnare il grafico prima di misurarlo
    setTimeout(() => fitModalChart(modal), 700);
  }

  function closeModal(modal) {
    modal.classList.remove("open");
  }

  document.querySelectorAll(".chart-expand-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById(btn.dataset.modal);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll(".chart-modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".chart-modal"));
    });
  });

  document.querySelectorAll(".chart-modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".chart-modal.open").forEach(closeModal);
    }
  });
});
