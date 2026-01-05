(() => {
  "use strict";

  // --- CONFIG: set item count to match your root ---
  const ITEM_COUNT = 14;

  // Optional captions (kept generic for mockup)
  const captions = Array.from({ length: ITEM_COUNT }, (_, i) => ({
    title: `Featured Item ${i + 1}`,
    note: "Tap to view"
  }));

  const grid = document.getElementById("grid");

  // Inject tiles
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= ITEM_COUNT; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile";
    btn.setAttribute("data-src", `./item-${i}.jpg`);
    btn.setAttribute("data-title", captions[i - 1].title);

    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = captions[i - 1].title;
    img.src = `./item-${i}.jpg`;

    const cap = document.createElement("div");
    cap.className = "cap";
    cap.innerHTML = `${captions[i - 1].title}<span>${captions[i - 1].note}</span>`;

    btn.appendChild(img);
    btn.appendChild(cap);
    frag.appendChild(btn);
  }
  grid.appendChild(frag);

  // Modal wiring
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");

  const openModal = (src, title) => {
    modalImg.src = src;
    modalImg.alt = title || "Item preview";
    modalTitle.textContent = title || "Item";
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