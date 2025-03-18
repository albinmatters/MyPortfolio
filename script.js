const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const dotCount = 100;
const mouse = { x: null, y: null, radius: 150 };

// Create dots with random positions and velocities
for (let i = 0; i < dotCount; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

// Update mouse position on mouse move
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Draw dots and lines
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
        // Move dots
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Reverse direction if dots hit edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Draw dots
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        // Connect nearby dots
        dots.forEach(otherDot => {
            const distance = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);
            if (distance < 120) {
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(otherDot.x, otherDot.y);
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
                ctx.stroke();
            }
        });

        // Connect dots to mouse if close enough
        const distanceToMouse = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
        if (distanceToMouse < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
            ctx.stroke();
        }
    });

    requestAnimationFrame(draw);
}

draw();
