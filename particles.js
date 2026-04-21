// ============================================
// FLOATING PARTICLES / LEAVES EFFECT
// ============================================

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 20 + 10;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 + 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 4 - 2;
        this.wobble = Math.random() * 0.02 - 0.01;
        this.wobbleAmount = Math.random() * 2;
    }

    update() {
        this.x += this.velocityX + this.wobbleAmount * Math.sin(this.wobble);
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;
        this.wobble += 0.01;

        // Reset particle when it goes off screen
        if (this.y > this.canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * this.canvas.width;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        if (this.x > this.canvas.width) {
            this.x = -this.size;
        } else if (this.x < -this.size) {
            this.x = this.canvas.width;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        // Draw leaf emoji using canvas text
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('🍃', 0, 0);

        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particlesContainer');
        if (!this.canvas) {
            console.log('Particles container not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = window.innerWidth > 768 ? 15 : 8;

        this.resize();
        this.initParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleSystem();
    });
} else {
    new ParticleSystem();
}