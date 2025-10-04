import './Apresentacao.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHeartbeat, faBrain, faUser, faImage } from '@fortawesome/free-solid-svg-icons';
import FOTO from '../../assets/images/marcus.png';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons/faMicrochip';

const Apresentacao = () => {
    const [activeTab, setActiveTab] = useState('about');

    const skills = [
        { name: 'Web Development', level: 95, icon: faCode },
        { name: 'Biomedical knowledge', level: 60, icon: faHeartbeat },
        { name: 'Machine Learning', level: 50, icon: faBrain },
        { name: 'Hardware', level: 80, icon: faMicrochip },
        { name: 'Graphical User Interface (GUI)', level: 95, icon: faUser },
    ];

    return (
        <section className="apresentacao-container">
            <div className="apresentacao-content">
                <div className="profile-section">
                    <div className="photo-container">
                        <div className="photo-frame">
                            <div className="photo-placeholder">
                                <FontAwesomeIcon icon={faCode} className="photo-icon" />
                                    <div className="photo-placeholder">
                                        <img src={FOTO} alt="Marcus Neto" className="profile-photo" />
                                    </div>
                            </div>
                        </div>
                        <div className="photo-glow"></div>
                    </div>

                    <div className="profile-info">
                        <h2 className="profile-name">Marcus Neto</h2>
                        <p className="profile-title">Developer & Student in Biomedical Informatics</p>
                        
                        <div className="social-stats">
                            <div className="stat">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">2+</span>
                                <span className="stat-label">Exp Years</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Dedicated</span>
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
                                About Me
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
                                    <h3>Transforming Healthcare with Technology</h3>
                                    <p>
                                        I'm a Biomedical Informatics undergraduate student at the Federal University of Paraná (UFPR), currently in my fourth semester. I have a strong passion for health and technology, and I believe the intersection between these fields is essential to transforming the way we manage our lives and promote well-being.
                                    </p>
                                    <p>
                                        The Biomedical Informatics program combines fundamentals of scientific computing, data science, and software engineering with knowledge of biomedicine and health sciences. This prepares me to analyze, develop, and apply technological solutions capable of supporting diagnostics, optimizing clinical processes, and creating tools that positively impact society.
                                    </p>
                                    <div className="highlight-cards">
                                        <div className="highlight-card">
                                            <FontAwesomeIcon icon={faCode} />
                                            <h4>Algorithms and Data Structures</h4>
                                            <p>Main optimization structures and techniques.</p>
                                        </div>
                                        <div className="highlight-card">
                                            <FontAwesomeIcon icon={faHeartbeat} />
                                            <h4>Human Body</h4>
                                            <p>Knowledge in the main areas of medicine.</p>
                                        </div>
                                        <div className="highlight-card">
                                            <FontAwesomeIcon icon={faImage} />
                                            <h4>Image Processing</h4>
                                            <p>Biomedical image analysis and image manipulation.</p>
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
                                            <div className="timeline-year">2025</div>
                                            <div className="timeline-content">
                                                <h4>Development Intern - ESTEIO S.A.</h4>
                                                <p>Development of desktop program for processing ADS 80/100 data.</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-year">2024</div>
                                            <div className="timeline-content">
                                                <h4>IT Intern - Erasto Gaertner Hospital</h4>
                                                <p>Develop solutions for radiotherapy scheduling and automation systems.</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-year">2024</div>
                                            <div className="timeline-content">
                                                <h4>SisLAMIR Developer - Lamir Institute</h4>
                                                <p>Develop a system to manage the institute's internal administration.</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-year">2024</div>
                                            <div className="timeline-content">
                                                <h4>Bachelor's Degree in Biomedical Informatics</h4>
                                                <p>Bachelor's degree at UFPR on the Polytechnic campus (in progress).</p>
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