(() => {
  "use strict";

  const ITEM_COUNT = 14;
  const grid = document.getElementById("grid");

  const frag = document.createDocumentFragment();

  for (let i = 1; i <= ITEM_COUNT; i++) {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.dataset.src = `./item-${i}.jpg`;
    btn.dataset.title = `Gallery Item ${i}`;

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = `./item-${i}.jpg`;
    img.alt = `Gallery Item ${i}`;

    btn.appendChild(img);
    frag.appendChild(btn);
  }

  grid.appendChild(frag);

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");

  const openModal = (src, title) => {
    modalImg.src = src;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.setAttribute("aria-hidden","true");
    modalImg.src = "";
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", e => {
    const tile = e.target.closest(".tile");
    if (!tile) return;
    openModal(tile.dataset.src, tile.dataset.title);
  });

  modal.addEventListener("click", e => {
    if (e.target.dataset.close !== undefined) closeModal();
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();