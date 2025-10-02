import './Apresentacao.css';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHeartbeat, faBrain, faDesktop, faUser } from '@fortawesome/free-solid-svg-icons';

const Apresentacao = () => {
    const [activeTab, setActiveTab] = useState('about');
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

        // Partículas para background animado - MESMO SISTEMA DO BANNER
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

        // Linhas de conexão entre partículas - MESMO SISTEMA DO BANNER
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

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const skills = [
        { name: 'Web Development', level: 90, icon: faCode },
        { name: 'Biomedical knowledge', level: 50, icon: faHeartbeat },
        { name: 'Machine Learning', level: 40, icon: faBrain },
        { name: 'BackEnd', level: 88, icon: faDesktop },
        { name: 'Graphical User Interface (GUI)', level: 95, icon: faUser },
    ];

    return (
        <section className="apresentacao-container">
            <canvas ref={canvasRef} className="background-canvas" />
            
            <div className="apresentacao-content">
                <div className="profile-section">
                    <div className="photo-container">
                        <div className="photo-frame">
                            <div className="photo-placeholder">
                                <FontAwesomeIcon icon={faCode} className="photo-icon" />
                                <span>Sua Foto Aqui</span>
                            </div>
                        </div>
                        <div className="photo-glow"></div>
                    </div>

                    <div className="profile-info">
                        <h2 className="profile-name">Marcus Neto</h2>
                        <p className="profile-title">Desenvolvedor & Pesquisador em Informática Biomédica</p>
                        
                        <div className="social-stats">
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Projetos</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">3+</span>
                                <span className="stat-label">Anos Exp</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Dedicado</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <div className="tabs-container">
                        <div className="tabs">
                            <button 
                                className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                                onClick={() => setActiveTab('about')}
                            >
                                Aboute Me
                            </button>
                            <button 
                                className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
                                onClick={() => setActiveTab('skills')}
                            >
                                Skills
                            </button>
                            <button 
                                className={`tab ${activeTab === 'journey' ? 'active' : ''}`}
                                onClick={() => setActiveTab('journey')}
                            >
                                Journey
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'about' && (
                                <div className="about-content">
                                    <h3>Inovando na Intersecção entre Tecnologia e Saúde</h3>
                                    <p>
                                        Sou um desenvolvedor full stack apaixonado por criar soluções tecnológicas 
                                        que impactam positivamente a área da saúde. Com formação em Ciência da Computação 
                                        e especialização em Informática Biomédica, combino expertise técnica com 
                                        conhecimento em medicina para desenvolver aplicações inovadoras.
                                    </p>
                                    <div className="highlight-cards">
                                        <div className="highlight-card">
                                            <FontAwesomeIcon icon={faCode} />
                                            <h4>Desenvolvimento</h4>
                                            <p>Criação de sistemas robustos e escaláveis</p>
                                        </div>
                                        <div className="highlight-card">
                                            <FontAwesomeIcon icon={faHeartbeat} />
                                            <h4>Saúde Digital</h4>
                                            <p>Soluções para melhorar cuidados médicos</p>
                                        </div>
                                        <div className="highlight-card">
                                            <FontAwesomeIcon icon={faBrain} />
                                            <h4>IA & ML</h4>
                                            <p>Algoritmos inteligentes para diagnóstico</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="skills-content">
                                    <h3>Technical Skills</h3>
                                    <div className="skills-grid">
                                        {skills.map((skill) => (
                                            <div key={skill.name} className="skill-item">
                                                <div className="skill-header">
                                                    <FontAwesomeIcon icon={skill.icon} className="skill-icon" />
                                                    <span className="skill-name">{skill.name}</span>
                                                    <span className="skill-percent">{skill.level}%</span>
                                                </div>
                                                <div className="skill-bar">
                                                    <div 
                                                        className="skill-progress" 
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'journey' && (
                                <div className="journey-content">
                                    <h3>My Technological Journey</h3>
                                    <div className="timeline">
                                        <div className="timeline-item">
                                            <div className="timeline-year">2024</div>
                                            <div className="timeline-content">
                                                <h4>Pesquisador em IA Aplicada à Saúde</h4>
                                                <p>Desenvolvimento de algoritmos para diagnóstico médico assistido</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-year">2023</div>
                                            <div className="timeline-content">
                                                <h4>Desenvolvedor Full Stack Sênior</h4>
                                                <p>Criação de sistemas hospitalares integrados</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-year">2022</div>
                                            <div className="timeline-content">
                                                <h4>Especialização em Informática Biomédica</h4>
                                                <p>Foco em tecnologia para saúde e medicina</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-year">2021</div>
                                            <div className="timeline-content">
                                                <h4>Graduação em Ciência da Computação</h4>
                                                <p>Base sólida em desenvolvimento e algoritmos</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Apresentacao;