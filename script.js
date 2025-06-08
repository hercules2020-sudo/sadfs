const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const name = document.getElementById("name");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

name.addEventListener("click", () => {
  const rect = name.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  createExplosion(x, y);
  name.style.display = "none";
});

function createExplosion(x, y) {
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 4 + 1,
      speedX: Math.random() * 6 - 3,
      speedY: Math.random() * 6 - 3,
      color: `hsl(${Math.random() * 60 + 300}, 100%, 70%)`, // tons de rosa/lilás
      life: 100
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
