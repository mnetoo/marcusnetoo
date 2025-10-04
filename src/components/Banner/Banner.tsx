import './Banner.css';
import { faDownload, faCode, faServer, faDatabase, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';

import Curriculo from '../../assets/docs/Currículo.pdf';

const Banner = () => {
    const nameRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
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
    }, []);

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = Curriculo;
        link.download = 'Marcus_Currículo.pdf';
        link.click();
    };

    return (
        <section className="banner-container">
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
                        <a href="https://wa.me/41995917386" target="_blank" rel="noopener noreferrer">
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