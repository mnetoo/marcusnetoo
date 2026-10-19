import { useEffect, useRef } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import './App.css';
import Home from './pages/home/home';
import About from './pages/about/about';
import Portfolio from './pages/portfolio/portfolio';
import Contact from './pages/contact/contact';

import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor';
import Loader from './components/common/Loader';

// Componente para transição de rotas
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/portfolio"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Portfolio />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Contact />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Desativar animação do canvas se o usuário preferir movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = `rgba(${138 + Math.random() * 30}, ${43 + Math.random() * 50}, ${226 + Math.random() * 29}, ${0.25 + Math.random() * 0.25})`;
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const count = window.innerWidth < 768 ? 45 : 85;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvas));
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.08 * (1 - distance / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas);
        particle.draw(ctx);
      });

      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="app">
        <Loader />
        <CustomCursor />
        <div className="noise-overlay" />
        <canvas ref={canvasRef} className="background-canvas" />

        <div className="app-content">
          <Router>
            <AnimatedRoutes />
          </Router>
        </div>
      </div>
    </SmoothScroll>
  );
}

export default App;