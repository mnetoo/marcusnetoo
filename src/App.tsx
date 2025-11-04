import { useEffect, useRef } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,       // usado para exemplo / debugging
  useLocation // só para debug
} from 'react-router-dom';

import Home from './pages/home/home';
import About from './pages/about/about';
import Portfolio from './pages/portfolio/portfolio';
import Contact from './pages/contact/contact';

/** Componente auxiliar só para mostrar o hash atual no console (debug) */
function LocationDebugger() {
  const loc = useLocation();
  useEffect(() => {
    console.log('location (react-router):', loc);
    console.log('window.location.hash:', window.location.hash);
  }, [loc]);
  return null;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; color: string;
      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${138 + Math.random() * 50}, ${43 + Math.random() * 50}, ${226 + Math.random() * 30}, ${0.3 + Math.random() * 0.3})`;
      }
      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) particles.push(new Particle(canvas));

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.1 * (1 - distance / 150)})`;
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
      particles.forEach(p => { p.update(canvas); p.draw(ctx); });
      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas" />
      <div className="app-content">
        {/* HashRouter sem basename */}
        <Router>
          <LocationDebugger /> {/* remove depois de debug */}
          {/* EXEMPLO DE NAV: use Link/ NavLink do react-router (não <a href="...">) */}
          <nav style={{position: 'fixed', top: 8, left: 8, zIndex: 1000}}>
            <Link to="/">Home</Link> {' | '}
            <Link to="/about">About</Link> {' | '}
            <Link to="/portfolio">Portfolio</Link> {' | '}
            <Link to="/contact">Contact</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;