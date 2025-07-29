// Fondo animado con partículas
function createAnimatedBackground() {
    // Crear el canvas para el fondo
    const canvas = document.createElement('canvas');
    canvas.id = 'animated-background';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.7';
    document.body.prepend(canvas);
    
    // Configuración del canvas
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Configuración de las partículas
    const particles = [];
    const particleCount = window.innerWidth * 0.15;
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            angle: 0,
            angleSpeed: Math.random() * 0.02 - 0.01
        });
    }
    
    // Función para dibujar las partículas
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.angle);
            
            // Forma de la partícula (puedes cambiarla)
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            
            // Forma de estrella
            const spikes = 5;
            const outerRadius = particle.size;
            const innerRadius = particle.size * 0.5;
            let rot = Math.PI / 2 * 3;
            let x = 0;
            let y = 0;
            const step = Math.PI / spikes;
            
            ctx.beginPath();
            ctx.moveTo(0, 0 - outerRadius);
            
            for (let i = 0; i < spikes; i++) {
                x = Math.cos(rot) * outerRadius;
                y = Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;
                
                x = Math.cos(rot) * innerRadius;
                y = Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            
            ctx.lineTo(0, 0 - outerRadius);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
            
            // Actualizar posición
            particle.angle += particle.angleSpeed;
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Rebotar en los bordes
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // Conectar partículas cercanas
            for (let j = 0; j < particles.length; j++) {
                const dx = particle.x - particles[j].x;
                const dy = particle.y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance/100) * 50 + 10).toString(16).padStart(2, '0')}`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    // Iniciar animación
    drawParticles();
    
    // Redimensionar canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Llamar a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', createAnimatedBackground);