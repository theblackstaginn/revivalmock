(() => {
  "use strict";

  const ITEM_COUNT = 14;

  const grid = document.getElementById("grid");
  if (!grid) return;

  // Build gallery tiles (browse-only)
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

  if (!modal || !modalImg) return;

  const openModal = (src, title) => {
    modalImg.src = src;
    modalImg.alt = title || "Gallery item";
    if (modalTitle) modalTitle.textContent = title || "Gallery Item";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    openModal(tile.getAttribute("data-src"), tile.getAttribute("data-title"));
  });

  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();