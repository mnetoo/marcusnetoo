import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faExternalLinkAlt, faCode } from '@fortawesome/free-solid-svg-icons';
import SpotlightCard from '../common/SpotlightCard';
import MagneticButton from '../common/MagneticButton';
import './Carrossel.css';

import lamirImage from '../../assets/images/projects/lamir.png';
import theboysImage from '../../assets/images/projects/theboys.png';
import cepagImage from '../../assets/images/projects/sites.png';
import ADSImage from '../../assets/images/projects/ads.jpg';
import ADSImage2 from '../../assets/images/projects/ads2.jpg';
import BrainTumor1 from '../../assets/images/projects/Brain-Tumor/img1.png';
import BrainTumor2 from '../../assets/images/projects/Brain-Tumor/img2.png';
import InvestDash1 from '../../assets/images/projects/invest-dashboard/img1.png';
import InvestDash2 from '../../assets/images/projects/invest-dashboard/img2.png';
import InvestDash3 from '../../assets/images/projects/invest-dashboard/img3.png';

interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  imagens: string[];
  linkPreview?: string;
  linkGitHub?: string;
  bentoSpan?: string;
}

const Carrossel = () => {
  const projetos: Projeto[] = [
    {
      id: 1,
      titulo: "ADSProcSuite",
      descricao: "Desktop computer program for ADS (Airborne Digital Sensor) data processing, advanced image processing, photogammetry and aerial surveys.",
      tecnologias: ["C++ Builder", "Python", "RAD Studio", "Image Processing"],
      imagens: [ADSImage, ADSImage2],
      linkPreview: "https://mnetoo.github.io/ADSProcSuite/",
      bentoSpan: "lg:col-span-7",
    },
    {
      id: 2,
      titulo: "The Boys - Programming I",
      descricao: "The Boys was the final work proposed in the Programming 1 discipline in the second semester of 2024. It has the implementation of several methods and data structures such as: Sets, priority queue (LEF), etc.",
      tecnologias: ["C", "Valgrind"],
      imagens: [theboysImage],
      linkGitHub: "https://github.com/mnetoo/TheBoys",
      bentoSpan: "lg:col-span-5",
    },
    {
      id: 3,
      titulo: "SisLAMIR - Instituto Lamir",
      descricao: "Develop a system to manage the institute's internal administration.",
      tecnologias: ["React", "Springboot", "SQL"],
      imagens: [lamirImage],
      linkPreview: "https://campusmap.ufpr.br/dev/LAMIR-SisLAMIR/login.php",
      bentoSpan: "lg:col-span-5",
    },
    {
      id: 4,
      titulo: "Web Development",
      descricao: "Development of websites and online forms for students and interns to fill out.",
      tecnologias: ["React", "HTML", "JavaScript"],
      imagens: [cepagImage],
      linkPreview: "https://campusmap.ufpr.br/dev/CEPAG-SitePrincipal/",
      bentoSpan: "lg:col-span-7",
    },
    {
      id: 5,
      titulo: "NeuroSeg: Segmentation of Brain Tumors with U-Net",
      descricao: "Deep Learning project applied to the automatic detection and segmentation of gliomas in Magnetic Resonance Imaging (MRI) images.",
      tecnologias: ["Python", "TensorFlow", "U-Net"],
      imagens: [BrainTumor1, BrainTumor2],
      linkGitHub: "https://github.com/mnetoo/Brain-Tumor-Segmentation-UNet",
      bentoSpan: "lg:col-span-6",
    },
    {
      id: 6,
      titulo: "Invest Dashboard",
      descricao: "Invest Dash is an interactive web application developed for simplified analysis of financial assets. Through a clean and user-friendly interface, users can view price histories, percentage changes, and trends for any stock listed on Yahoo Finance.",
      tecnologias: ["Python", "Streamlit"],
      imagens: [InvestDash1, InvestDash2, InvestDash3],
      linkGitHub: "https://github.com/mnetoo/invest-dashboard",
      bentoSpan: "lg:col-span-6",
    },
  ];

  // Estado para controlar a imagem ativa de cada projeto individualmente
  const [activeImageMap, setActiveImageMap] = useState<{ [id: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const nextProjectImage = (id: number, length: number) => {
    setActiveImageMap((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % length,
    }));
  };

  const prevProjectImage = (id: number, length: number) => {
    setActiveImageMap((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + length) % length,
    }));
  };

  return (
    <section className="carrossel-container">
      <div className="carrossel-content">
        <div className="portfolio-header">
          <span className="portfolio-tag">// SHOWCASE</span>
          <h2 className="carrossel-title">Portfolio Projects</h2>
          <p className="carrossel-subtitle">
            Some of my projects developed throughout my undergraduate studies.
          </p>
        </div>

        {/* Bento Grid Moderno de Projetos */}
        <div className="bento-grid">
          {projetos.map((projeto) => {
            const currentImgIndex = activeImageMap[projeto.id] || 0;
            const hasMultipleImages = projeto.imagens.length > 1;

            return (
              <SpotlightCard
                key={projeto.id}
                className={`bento-card ${projeto.bentoSpan || 'lg:col-span-6'}`}
                tiltMaxAngle={4}
                dataCursorText="Ver"
              >
                <div className="bento-card-inner">
                  {/* Seção da Imagem com Galeria */}
                  <div className="project-media-wrapper">
                    <img
                      src={projeto.imagens[currentImgIndex]}
                      alt={projeto.titulo}
                      className="project-media-img"
                      loading="lazy"
                    />

                    {/* Controles da Galeria de Imagens (se houver mais de uma) */}
                    {hasMultipleImages && (
                      <div className="image-nav-controls">
                        <button
                          className="image-nav-btn prev"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevProjectImage(projeto.id, projeto.imagens.length);
                          }}
                          aria-label="Imagem anterior"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <div className="image-counter-pill">
                          {currentImgIndex + 1} / {projeto.imagens.length}
                        </div>

                        <button
                          className="image-nav-btn next"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextProjectImage(projeto.id, projeto.imagens.length);
                          }}
                          aria-label="Próxima imagem"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Informações do Projeto */}
                  <div className="project-details">
                    <div className="project-header">
                      <h3 className="project-title">{projeto.titulo}</h3>
                    </div>

                    <p className="project-description">{projeto.descricao}</p>

                    <div className="technologies">
                      {projeto.tecnologias.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-links">
                      {projeto.linkPreview && (
                        <MagneticButton strength={0.2}>
                          <a
                            href={projeto.linkPreview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link demo"
                            data-cursor-text="Abrir"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                            <span>View Project</span>
                          </a>
                        </MagneticButton>
                      )}

                      {projeto.linkGitHub && (
                        <MagneticButton strength={0.2}>
                          <a
                            href={projeto.linkGitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link github"
                            data-cursor-text="GitHub"
                          >
                            <FontAwesomeIcon icon={faCode} />
                            <span>GitHub</span>
                          </a>
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        <div className="project-counter-footer">
          <span className="current-project">{projetos.length}</span>
          <span className="total-projects"> Projetos em destaque</span>
        </div>
      </div>
    </section>
  );
};

export default Carrossel;