const TRAIL_COUNT = 18;
const trail = [];

for (let i = 0; i < TRAIL_COUNT; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    background: radial-gradient(circle, rgba(184,158,240,0.9), rgba(139,111,212,0.5));
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  trail.forEach((dot, i) => {
    const prev = trail[i - 1];
    if (i > 0) {
      dot.x = prev.x + (dot.x - prev.x) * 0.4;
      dot.y = prev.y + (dot.y - prev.y) * 0.4;
    } else {
      dot.x = mouseX;
      dot.y = mouseY;
    }
    const size = (1 - i / TRAIL_COUNT) * 14 + 2;
    const opacity = (1 - i / TRAIL_COUNT) * 0.65;
    dot.el.style.width   = size + 'px';
    dot.el.style.height  = size + 'px';
    dot.el.style.opacity = opacity;
    dot.el.style.left    = dot.x + 'px';
    dot.el.style.top     = dot.y + 'px';
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.addEventListener('mouseleave', () => trail.forEach(d => d.el.style.opacity = 0));