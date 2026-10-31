// Pointer tilt for figures: inside each [data-tilt-zone], the [data-tilt] element
// leans toward the pointer and springs back on leave. Off for touch and for
// reduced motion (--tilt-max is 0deg then).

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

for (const zone of document.querySelectorAll<HTMLElement>("[data-tilt-zone]")) {
  const tilt = zone.querySelector<HTMLElement>("[data-tilt]");
  if (!tilt) continue;
  let frame = 0;

  zone.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || reduceMotion.matches) return;
    const max = parseFloat(getComputedStyle(tilt).getPropertyValue("--tilt-max")) || 0;
    if (!max) return;
    const rect = zone.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      tilt.classList.add("is-tracking");
      tilt.style.setProperty("--ry", `${(x * 2 * max).toFixed(2)}deg`);
      tilt.style.setProperty("--rx", `${(-y * 2 * max).toFixed(2)}deg`);
    });
  });

  zone.addEventListener("pointerleave", () => {
    cancelAnimationFrame(frame);
    tilt.classList.remove("is-tracking");
    tilt.style.setProperty("--rx", "0deg");
    tilt.style.setProperty("--ry", "0deg");
  });
}
