import './Banner.css';
import { faDownload, faCode, faServer, faDatabase, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';

import Curriculo from '../../assets/docs/Currículo.pdf';

const Banner = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);

useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas para ocupar toda a tela
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Partículas para background animado
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
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(${138 + Math.random() * 50}, ${43 + Math.random() * 50}, ${226 + Math.random() * 30}, ${0.3 + Math.random() * 0.3})`;
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
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(canvas));
    }

    // Linhas de conexão entre partículas
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

        particles.forEach(particle => {
            particle.update(canvas);
            particle.draw(ctx);
        });

        connectParticles();
        requestAnimationFrame(animate);
    };

    animate();

        // Animação de digitação para o nome
        const name = "Marcus Neto";
        let i = 0;
        const typeWriter = () => {
            if (nameRef.current && i < name.length) {
                nameRef.current.innerHTML = name.substring(0, i + 1) + '<span class="cursor">|</span>';
                i++;
                setTimeout(typeWriter, 150);
            }
        };

        setTimeout(typeWriter, 1000);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const handleDownloadCV = () => {
        // Simular download do CV
        const link = document.createElement('a');
        link.href = Curriculo; // Altere para o caminho do seu CV
        link.download = 'Marcus_Currículo.pdf';
        link.click();
    };

    return (
        <section className="banner-container">
            <canvas ref={canvasRef} className="background-canvas" />
            
            <div className="banner-content">
                <div className="banner-text">
                    <div className="greeting">Hello, I am</div>
                    <h1 className="name" ref={nameRef}>
                        <span className="cursor">|</span>
                    </h1>
                    <h2 className="subtitle">
                        <span className="title-word">
                            <FontAwesomeIcon icon={faCode} className="title-icon" />
                            C/C++ Builder Developer
                        </span>
                        <span className="title-separator"> & </span>
                        <span className="title-word">
                            <FontAwesomeIcon icon={faMicrochip} className="title-icon" />
                            Biomedical Informatics Student
                        </span>
                    </h2>
                    <p className="description">
                        Combining computing technology with healthcare innovation to create
                        solutions that make a difference. Specializing in software development,
                        medical data analysis, and artificial intelligence applied to healthcare.
                    </p>
                    
                    <div className="banner-buttons">
                        <button className="download-btn" onClick={handleDownloadCV}>
                            <FontAwesomeIcon icon={faDownload} />
                            Download CV
                        </button>
                        <a href="https://wa.me/41995917386" target="_blank">
                            <button className="contact-btn">
                                Let's talk
                            </button>
                        </a>
                    </div>
                </div>

                <div className="banner-visuals">
                    <div className="floating-icons">
                        <div className="icon-orb">
                            <FontAwesomeIcon icon={faCode} />
                        </div>
                        <div className="icon-orb">
                            <FontAwesomeIcon icon={faServer} />
                        </div>
                        <div className="icon-orb">
                            <FontAwesomeIcon icon={faDatabase} />
                        </div>
                        <div className="icon-orb">
                            <FontAwesomeIcon icon={faMicrochip} />
                        </div>
                    </div>
                    
                    <div className="code-window">
                        <div className="window-header">
                            <div className="window-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="code-content">
                            <div className="code-line">
                                <span className="code-comment">// Innovation in Technology & Health</span>
                            </div>
                            <div className="code-line">
                                <span className="code-keyword">const</span> dev = <span className="code-bracket">{'{'}</span>
                            </div>
                            <div className="code-line">
                                &nbsp;&nbsp;name: <span className="code-string">"Marcus Neto"</span>,
                            </div>
                            <div className="code-line">
                                &nbsp;&nbsp;stack: <span className="code-array">[</span><span className="code-string">"React"</span>, <span className="code-string">"Python"</span>, <span className="code-string">"C/C++"</span><span className="code-array">]</span>,
                            </div>
                            <div className="code-line">
                                &nbsp;&nbsp;focus: <span className="code-string">"Health Technology"</span>
                            </div>
                            <div className="code-line">
                                <span className="code-bracket">{'}'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-wheel"></div>
            </div>
        </section>
    );
};

export default Banner;