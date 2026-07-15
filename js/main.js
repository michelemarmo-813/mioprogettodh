// Aggiorna l'anno nel footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Grafici: apertura/chiusura della finestra di ingrandimento
document.addEventListener("DOMContentLoaded", () => {
  function openModal(modal) {
    modal.classList.add("open");
    // forza Flourish a ricalcolare le dimensioni ora che il grafico è visibile
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
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
