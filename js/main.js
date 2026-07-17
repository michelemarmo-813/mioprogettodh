// Aggiorna l'anno nel footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Grafici Flourish: caricamento manuale (vedi window.Flourish.disable_autoload
// in grafici.html). Carichiamo subito solo i grafici visibili nella pagina;
// quelli dentro le modali "Ingrandisci" vengono caricati al volo, uno per
// uno, solo la prima volta che l'utente apre la relativa modale. Così la
// pagina non scarica/disegna 14 grafici fin da subito, ma solo quelli
// davvero mostrati.
function loadFlourish(el) {
  if (el.dataset.flourishLoaded) return;
  if (window.Flourish && typeof window.Flourish.loadEmbed === "function") {
    // dissolvenza invece di "scatto": Flourish disegna il grafico in due
    // passaggi (una prima bozza veloce, poi il ridisegno finale quando dati
    // e font sono pronti) — nascondiamo il grafico per una frazione di
    // secondo e lo facciamo riapparire con una piccola transizione, così
    // l'eventuale aggiustamento interno risulta meno brusco da vedere.
    // Se JavaScript è disabilitato questo codice non viene mai eseguito,
    // quindi l'immagine di fallback nel <noscript> resta sempre visibile.
    el.style.opacity = "0";
    el.style.transition = "opacity 0.35s ease";
    window.Flourish.loadEmbed(el);
    el.dataset.flourishLoaded = "true";
    window.setTimeout(() => {
      el.style.opacity = "1";
    }, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".flourish-embed").forEach((el) => {
    if (!el.closest(".chart-modal")) loadFlourish(el);
  });
});

// Grafici: apertura/chiusura della finestra di ingrandimento
document.addEventListener("DOMContentLoaded", () => {
  function openModal(modal) {
    modal.classList.add("open");
    // primo click su questa modale: carica ora il suo grafico Flourish
    modal.querySelectorAll(".flourish-embed").forEach(loadFlourish);
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
