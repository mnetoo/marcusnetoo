import { useEffect, useRef, lazy, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCode, faServer, faDatabase, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import Curriculo from '../../assets/docs/Currículo.pdf';
import MagneticButton from '../common/MagneticButton';
import SpotlightCard from '../common/SpotlightCard';
import './Banner.css';

const Hero3DScene = lazy(() => import('./Hero3DScene'));

const Banner = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const name = "Marcus Neto";
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeWriter = () => {
      if (nameRef.current && i < name.length) {
        nameRef.current.innerHTML = name.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        timer = setTimeout(typeWriter, 140);
      }
    };

    const startTimer = setTimeout(typeWriter, 800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = Curriculo;
    link.download = 'Marcus_Currículo.pdf';
    link.click();
  };

  return (
    <section className="banner-container">
      {/* Luz ambiente de fundo no topo */}
      <div className="banner-glow-spotlight" />

      <div className="banner-content">
        {/* Coluna de Texto e Apresentação Editorial */}
        <div className="banner-text">
          <div className="greeting-wrapper">
            <span className="greeting-pill">
              <span className="greeting-status-dot" />
              <span className="greeting">Hello, I am</span>
            </span>
          </div>

          <h1 className="name" ref={nameRef}>
            <span className="cursor">|</span>
          </h1>

          <div className="subtitle-container">
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
          </div>

          <p className="description">
            Combining computing technology with healthcare innovation to create
            solutions that make a difference. Specializing in software development,
            medical data analysis, and artificial intelligence applied to healthcare.
          </p>

          <div className="banner-buttons">
            <MagneticButton strength={0.25}>
              <button 
                className="download-btn" 
                onClick={handleDownloadCV}
                data-cursor-text="Download"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Download CV</span>
              </button>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a 
                href="https://wa.me/41995917386" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-btn-link"
                data-cursor-text="WhatsApp"
              >
                <button className="contact-btn">
                  Let's talk
                </button>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Coluna Visual: Cena 3D Biomédica + Janela de Código Holográfica */}
        <div className="banner-visuals">
          <div className="hero-3d-wrapper">
            <Suspense fallback={<div className="w-full h-full min-h-[380px] flex items-center justify-center"><div className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" /></div>}>
              <Hero3DScene />
            </Suspense>
          </div>

          {/* Orbes Flutuantes de Habilidades */}
          <div className="floating-icons">
            <MagneticButton strength={0.35}>
              <div className="icon-orb" title="Code">
                <FontAwesomeIcon icon={faCode} />
              </div>
            </MagneticButton>
            <MagneticButton strength={0.35}>
              <div className="icon-orb" title="Server">
                <FontAwesomeIcon icon={faServer} />
              </div>
            </MagneticButton>
            <MagneticButton strength={0.35}>
              <div className="icon-orb" title="Database">
                <FontAwesomeIcon icon={faDatabase} />
              </div>
            </MagneticButton>
            <MagneticButton strength={0.35}>
              <div className="icon-orb" title="Microchip">
                <FontAwesomeIcon icon={faMicrochip} />
              </div>
            </MagneticButton>
          </div>

          {/* Janela de Código em Estilo Terminal Mac com Spotlight 3D */}
          <SpotlightCard className="code-window-card" tiltMaxAngle={6}>
            <div className="code-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="window-title">developer.ts</span>
              </div>
              <div className="code-content">
                <div className="code-line">
                  <span className="code-comment">// Innovation in Technology & Health</span>
                </div>
                <div className="code-line">
                  <span className="code-keyword">const dev = </span>
                  <span className="code-bracket">{'{'}</span>
                </div>
                <div className="code-line indent">
                  <span className="code-property">name: </span>
                  <span className="code-string">"Marcus Neto"</span>,
                </div>
                <div className="code-line indent">
                  <span className="code-property">stack: </span>
                  <span className="code-array">[</span>
                  <span className="code-string">"React"</span>,{' '}
                  <span className="code-string">"Python"</span>,{' '}
                  <span className="code-string">"C/C++"</span>
                  <span className="code-array">]</span>,
                </div>
                <div className="code-line indent">
                  <span className="code-property">focus: </span>
                  <span className="code-string">"Health Technology"</span>
                </div>
                <div className="code-line">
                  <span className="code-bracket">{'}'}</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Indicador de Scroll Minimalista */}
      <div className="scroll-indicator">
        <span className="scroll-text">EXPLORAR</span>
        <div className="scroll-wheel" />
      </div>
    </section>
  );
};

export default Banner;