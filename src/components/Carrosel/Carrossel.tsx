import './Carrossel.css';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faExternalLinkAlt, faCode } from '@fortawesome/free-solid-svg-icons';

import lamirImage from '../../assets/images/projects/lamir.png'
import theboysImage from '../../assets/images/projects/theboys.png';
import cepagImage from '../../assets/images/projects/sites.png';
import ADSImage from '../../assets/images/projects/ads.jpg';
import ADSImage2 from '../../assets/images/projects/ads2.jpg';

interface Projeto {
    id: number;
    titulo: string;
    descricao: string;
    tecnologias: string[];
    imagens: string[];
    linkPreview?: string;
    linkGitHub?: string;
}

const Carrossel = () => {
    const [projetoAtual, setProjetoAtual] = useState(0);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const projetos: Projeto[] = [
        {
            id: 1,
            titulo: "ADSProcSuite",
            descricao: "Desktop computer program for ADS (Airborne Digital Sensor) data processing, advanced image processing, photogammetry and aerial surveys.",
            tecnologias: ["C++ Builder", "Python", "RAD Studio", "Image Processing"],
            imagens: [ADSImage, ADSImage2],
            linkPreview: "https://mnetoo.github.io/ADSProcSuite/"
        },
        {
            id: 2,
            titulo: "The Boys - Programming I",
            descricao: "The Boys was the final work proposed in the Programming 1 discipline in the second semester of 2024. It has the implementation of several methods and data structures such as: Sets, priority queue (LEF), etc.",
            tecnologias: ["C", "Valgrind" ],
            imagens: [theboysImage],
            linkGitHub: "https://github.com/mnetoo/TheBoys"
        },
        {
            id: 3,
            titulo: "SisLAMIR - Instituto Lamir",
            descricao: "Develop a system to manage the institute's internal administration.",
            tecnologias: ["React", "Springboot", "SQL"],
            imagens: [lamirImage],
            linkPreview: "https://campusmap.ufpr.br/dev/LAMIR-SisLAMIR/login.php"
        },
        {
            id: 4,
            titulo: "Web Development",
            descricao: "Development of websites and online forms for students and interns to fill out.",
            tecnologias: ["React", "HTML", "JavaScript"],
            imagens: [cepagImage],
            linkPreview: "https://campusmap.ufpr.br/dev/CEPAG-SitePrincipal/"
        }
    ];

    const nextProjeto = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setProjetoAtual((prev) => (prev + 1) % projetos.length);
        setImagemAtual(0);
        setTimeout(() => setIsAnimating(false), 700); // Sincronizado com a transição do CSS
    }, [isAnimating, projetos.length]);

    const prevProjeto = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setProjetoAtual((prev) => (prev - 1 + projetos.length) % projetos.length);
        setImagemAtual(0);
        setTimeout(() => setIsAnimating(false), 700); // Sincronizado com a transição do CSS
    };

    const nextImagem = () => {
        setImagemAtual((prev) => (prev + 1) % projetos[projetoAtual].imagens.length);
    };

    const prevImagem = () => {
        setImagemAtual((prev) => (prev - 1 + projetos[projetoAtual].imagens.length) % projetos[projetoAtual].imagens.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextProjeto();
        }, 8000);
        return () => clearInterval(interval);
    }, [nextProjeto]);

    return (
        <section className="carrossel-container">
            <div className="carrossel-content">
                <h2 className="carrossel-title">Portfolio Projects</h2>
                <p className="carrossel-subtitle">Some of my projects developed throughout my undergraduate studies.</p>
                
                <div className="carrossel-wrapper">
                    {/* --- INÍCIO DA MUDANÇA PRINCIPAL --- */}
                    {/* Agora renderizamos todos os projetos, e o CSS cuida da posição de cada um */}
                    {projetos.map((projeto, index) => {
                        let positionClass = 'next'; // Posição padrão
                        if (index === projetoAtual) {
                            positionClass = 'active';
                        } else if (index === (projetoAtual - 1 + projetos.length) % projetos.length) {
                            positionClass = 'prev';
                        }

                        return (
                            <div key={projeto.id} className={`carrossel-card ${positionClass}`}>
                                <div className="card-3d-effect">
                                    <div className="project-image-section">
                                        <div className="image-container">
                                            <img 
                                                // A imagem exibida depende se o card está ativo ou não
                                                // Aqui, usamos o estado 'imagemAtual' apenas para o card ativo
                                                src={index === projetoAtual ? projeto.imagens[imagemAtual] : projeto.imagens[0]} 
                                                alt={projeto.titulo}
                                                className="project-image"
                                            />
                                            {index === projetoAtual && ( // Mostra a sobreposição apenas no card ativo
                                            <div className="image-overlay">
                                                <button className="nav-btn prev-img" onClick={prevImagem}>
                                                    <FontAwesomeIcon icon={faChevronLeft} />
                                                </button>
                                                <button className="nav-btn next-img" onClick={nextImagem}>
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </button>
                                                <div className="image-counter">
                                                    {imagemAtual + 1} / {projeto.imagens.length}
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="project-info">
                                        <h3 className="project-title">{projeto.titulo}</h3>
                                        <p className="project-description">{projeto.descricao}</p>
                                        
                                        <div className="technologies">
                                            {projeto.tecnologias.map((tech, techIndex) => (
                                                <span key={techIndex} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>

                                        <div className="project-links">
                                            {projeto.linkPreview && (
                                                <a href={projeto.linkPreview} target="_blank" rel="noopener noreferrer" className="project-link demo">
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                                                    View Project
                                                </a>
                                            )}
                                            {projeto.linkGitHub && (
                                                <a href={projeto.linkGitHub} target="_blank" rel="noopener noreferrer" className="project-link github">
                                                    <FontAwesomeIcon icon={faCode} />
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* --- FIM DA MUDANÇA PRINCIPAL --- */}

                    <button className="carrossel-nav prev" onClick={prevProjeto}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="carrossel-nav next" onClick={nextProjeto}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <div className="carrossel-dots">
                        {projetos.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === projetoAtual ? 'active' : ''}`}
                                onClick={() => {
                                    if (!isAnimating && index !== projetoAtual) {
                                        setIsAnimating(true);
                                        setProjetoAtual(index);
                                        setImagemAtual(0);
                                        setTimeout(() => setIsAnimating(false), 700);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="project-counter">
                    <span className="current-project">{projetoAtual + 1}</span>
                    <span className="total-projects">/{projetos.length}</span>
                </div>
            </div>
        </section>
    );
};

export default Carrossel;