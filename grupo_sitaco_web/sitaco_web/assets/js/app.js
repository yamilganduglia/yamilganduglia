// Grupo SITACO - JS (interacciones + formulario con AJAX)
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Año
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú mobile
  const toggle = $("[data-nav-toggle]");
  const nav = $("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    $$("#[data-nav] a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Filtro de servicios
  const chips = $$(".chip");
  const cards = $$("[data-cards] .card");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-selected", String(c === chip));
      });

      const filter = chip.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.cat;
        const show = filter === "all" || filter === cat;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Carousel
  const carousel = $("[data-carousel]");
  if (carousel) {
    const track = $("[data-track]", carousel);
    const prev = $("[data-prev]", carousel);
    const next = $("[data-next]", carousel);

    const scrollByOne = (dir) => {
      const w = carousel.clientWidth;
      track.scrollBy({ left: dir * w, behavior: "smooth" });
    };

    prev?.addEventListener("click", () => scrollByOne(-1));
    next?.addEventListener("click", () => scrollByOne(1));
  }

  // FAQ accordion
  const faq = $("[data-faq]");
  if (faq) {
    $$(".faq__q", faq).forEach(btn => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        // cerrar otros
        $$(".faq__q", faq).forEach(other => other.setAttribute("aria-expanded", "false"));
        btn.setAttribute("aria-expanded", String(!expanded));
      });
    });
  }

  // Toast
  const toast = $(".toast");
  const showToast = (msg, ok = true) => {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = msg;
    toast.style.borderColor = ok ? "rgba(242,193,78,.45)" : "rgba(255,126,120,.55)";
    toast.style.boxShadow = ok ? "0 10px 30px rgba(0,0,0,.35)" : "0 10px 30px rgba(255,126,120,.18)";
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => (toast.hidden = true), 4200);
  };

  // Formulario con validación + envío a PHP
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validación nativa
      if (!form.checkValidity()) {
        form.reportValidity();
        showToast("Revisá los datos del formulario.", false);
        return;
      }

      const btn = $("button[type='submit']", form);
      const prevText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Enviando…";

      try {
        const formData = new FormData(form);

        // IMPORTANTE:
        // - Si lo subís a un hosting con PHP, dejá el endpoint tal como está.
        // - Si querés usar otra ruta, cambiala acá.
        const res = await fetch("api/save_contact.php", {
          method: "POST",
          body: formData
        });

        const data = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data.message || "No se pudo guardar la consulta.");
        }

        form.reset();
        showToast("¡Consulta enviada! Te respondemos a la brevedad.", true);
      } catch (err) {
        showToast("Error: " + err.message, false);
      } finally {
        btn.disabled = false;
        btn.textContent = prevText;
      }
    });
  }
})();
