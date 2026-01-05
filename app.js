(() => {
  "use strict";

  const ITEM_COUNT = 14;

  const grid = document.getElementById("grid");
  if (!grid) return;

  // Build gallery tiles (no prices, no "buy" language)
  const frag = document.createDocumentFragment();

  for (let i = 1; i <= ITEM_COUNT; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile";
    btn.setAttribute("data-src", `./item-${i}.jpg`);
    btn.setAttribute("data-title", `Gallery Item ${i}`);

    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = `Gallery Item ${i}`;
    img.src = `./item-${i}.jpg`;

    btn.appendChild(img);
    frag.appendChild(btn);
  }

  grid.appendChild(frag);

  // Modal
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");

  const openModal = (src, title) => {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = title || "Gallery item";
    if (modalTitle) modalTitle.textContent = title || "Gallery Item";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal || !modalImg) return;
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    openModal(tile.getAttribute("data-src"), tile.getAttribute("data-title"));
  });

  if (modal){
    modal.addEventListener("click", (e) => {
      if (e.target.matches("[data-close]")) closeModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();