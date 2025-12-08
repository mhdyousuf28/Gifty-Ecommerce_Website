document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    
    const ctx = canvas.getContext("2d");
    const particles = [];
    const possibleEmoji = ["❤️"];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function addParticle(x, y) {
        particles.push({
            x,
            y,
            velocityX: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            velocityY: 1 + Math.random(),
            lifeSpan: Math.floor(Math.random() * 60 + 80),
            initialLifeSpan: Math.floor(Math.random() * 60 + 80),
            emoji: possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
        });
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.lifeSpan--;

            ctx.font = "20px Arial";
            ctx.fillText(particle.emoji, particle.x, particle.y);

            if (particle.lifeSpan < 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(updateParticles);
    }

    document.addEventListener("mousemove", (event) => {
        addParticle(event.clientX, event.clientY);
    });

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    updateParticles();
});

