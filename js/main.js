/* Nav: add hairline when scrolled ------------------------------------ */
const nav = document.querySelector(".nav");
const onScroll = () => nav && nav.classList.toggle("is-stuck", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Mobile menu toggle -------------------------------------------------- */
const burger = document.querySelector(".burger");
const links = document.querySelector(".nav__links");
if (burger && links) {
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

/* Scroll reveal ------------------------------------------------------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* Portrait presentation boards --------------------------------------- */
/* Teaching pages show full presentation boards. A portrait board rendered
   full-width becomes oversized, so lay portrait boards out at two-column
   scale: pair adjacent ones side by side, and cap any lone one's width.   */
function adjacentFigure(el, dir) {
  let s = el[dir];
  while (s) {
    if (s.nodeType === 1) return s.matches("figure.shot") ? s : null;
    s = s[dir];
  }
  return null;
}
function layoutPortraitBoards() {
  const portraitFigs = new Set();
  document.querySelectorAll("figure.shot img.board").forEach((img) => {
    const fig = img.closest("figure.shot");
    if (!fig || fig.closest(".grid, .board-grid, .board-pair")) return;
    if (!img.complete || !img.naturalWidth) return;
    if (img.naturalHeight > img.naturalWidth * 1.05) portraitFigs.add(fig);
  });
  portraitFigs.forEach((fig) => {
    if (fig.dataset.boardDone) return;
    const prev = adjacentFigure(fig, "previousElementSibling");
    if (prev && portraitFigs.has(prev)) return; // only start at the first of a run
    const run = [fig];
    let n = adjacentFigure(fig, "nextElementSibling");
    while (n && portraitFigs.has(n)) { run.push(n); n = adjacentFigure(n, "nextElementSibling"); }
    if (run.length >= 2) {
      const wrap = document.createElement("div");
      wrap.className = "board-pair";
      fig.parentNode.insertBefore(wrap, fig);
      run.forEach((f) => { wrap.appendChild(f); f.dataset.boardDone = "1"; });
    } else {
      fig.classList.add("shot--portrait");
      fig.dataset.boardDone = "1";
    }
  });
}
window.addEventListener("load", layoutPortraitBoards);
document.querySelectorAll("img.board").forEach((img) => img.addEventListener("load", layoutPortraitBoards));

/* Current year in footer --------------------------------------------- */
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
