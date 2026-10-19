import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHeartbeat, faBrain, faUser, faImage, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import FOTO from '../../assets/images/marcus.png';
import SpotlightCard from '../common/SpotlightCard';
import './Apresentacao.css';

const Apresentacao = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'journey'>('about');

  const skills = [
    { name: 'Web Development', level: 95, icon: faCode },
    { name: 'Biomedical knowledge', level: 60, icon: faHeartbeat },
    { name: 'Machine Learning', level: 50, icon: faBrain },
    { name: 'Hardware', level: 80, icon: faMicrochip },
    { name: 'Graphical User Interface (GUI)', level: 95, icon: faUser },
  ];

  const highlights = [
    {
      icon: faCode,
      title: 'Algorithms and Data Structures',
      desc: 'Main optimization structures and techniques.',
    },
    {
      icon: faHeartbeat,
      title: 'Human Body',
      desc: 'Knowledge in the main areas of medicine.',
    },
    {
      icon: faImage,
      title: 'Image Processing',
      desc: 'Biomedical image analysis and image manipulation.',
    },
  ];

  const timeline = [
    {
      year: '2025',
      title: 'Development Intern - ESTEIO S.A.',
      desc: 'Development of desktop program for processing ADS 80/100 data.',
    },
    {
      year: '2024',
      title: 'IT Intern - Erasto Gaertner Hospital',
      desc: 'Develop solutions for radiotherapy scheduling and automation systems.',
    },
    {
      year: '2024',
      title: 'SisLAMIR Developer - Lamir Institute',
      desc: 'Develop a system to manage the institute\'s internal administration.',
    },
    {
      year: '2024',
      title: 'Bachelor\'s Degree in Biomedical Informatics',
      desc: 'Bachelor\'s degree at UFPR on the Polytechnic campus (in progress).',
    },
  ];

  return (
    <section className="apresentacao-container">
      <div className="apresentacao-content">
        {/* Coluna de Perfil e Estatísticas */}
        <div className="profile-section">
          <div className="photo-container">
            <div className="photo-frame">
              <div className="photo-glow" />
              <img src={FOTO} alt="Marcus Neto" className="profile-photo" />
            </div>
          </div>

          <div className="profile-info">
            <h2 className="profile-name">Marcus Neto</h2>
            <p className="profile-title">Developer & Student in Biomedical Informatics</p>

            <div className="social-stats">
              <SpotlightCard className="stat-card" tiltMaxAngle={5}>
                <div className="stat">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Projects</span>
                </div>
              </SpotlightCard>

              <SpotlightCard className="stat-card" tiltMaxAngle={5}>
                <div className="stat">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Exp Years</span>
                </div>
              </SpotlightCard>

              <SpotlightCard className="stat-card" tiltMaxAngle={5}>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Dedicated</span>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* Coluna de Conteúdo Interativo com Abas */}
        <div className="content-section">
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About Me
                {activeTab === 'about' && <motion.div layoutId="activeTabBadge" className="active-tab-indicator" />}
              </button>
              <button
                className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
                {activeTab === 'skills' && <motion.div layoutId="activeTabBadge" className="active-tab-indicator" />}
              </button>
              <button
                className={`tab ${activeTab === 'journey' ? 'active' : ''}`}
                onClick={() => setActiveTab('journey')}
              >
                Journey
                {activeTab === 'journey' && <motion.div layoutId="activeTabBadge" className="active-tab-indicator" />}
              </button>
            </div>

            <div className="tab-content">
              <AnimatePresence mode="wait">
                {activeTab === 'about' && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="about-content"
                  >
                    <h3 className="tab-title">Transforming Healthcare with Technology</h3>
                    <p>
                      I'm a Biomedical Informatics undergraduate student at the Federal University of Paraná (UFPR), currently in my fourth semester. I have a strong passion for health and technology, and I believe the intersection between these fields is essential to transforming the way we manage our lives and promote well-being.
                    </p>
                    <p>
                      The Biomedical Informatics program combines fundamentals of scientific computing, data science, and software engineering with knowledge of biomedicine and health sciences. This prepares me to analyze, develop, and apply technological solutions capable of supporting diagnostics, optimizing clinical processes, and creating tools that positively impact society.
                    </p>

                    <div className="highlight-cards">
                      {highlights.map((item, idx) => (
                        <SpotlightCard key={idx} className="highlight-card" tiltMaxAngle={7}>
                          <div className="highlight-card-body">
                            <div className="highlight-icon-wrapper">
                              <FontAwesomeIcon icon={item.icon} />
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                          </div>
                        </SpotlightCard>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'skills' && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="skills-content"
                  >
                    <h3 className="tab-title">Technical Skills</h3>
                    <div className="skills-grid">
                      {skills.map((skill) => (
                        <div key={skill.name} className="skill-item">
                          <div className="skill-header">
                            <div className="skill-icon-badge">
                              <FontAwesomeIcon icon={skill.icon} className="skill-icon" />
                            </div>
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-percent">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <motion.div
                              className="skill-progress"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'journey' && (
                  <motion.div
                    key="journey"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="journey-content"
                  >
                    <h3 className="tab-title">My Technological Journey</h3>
                    <div className="timeline">
                      <div className="timeline-track" />
                      {timeline.map((item, index) => (
                        <div key={index} className="timeline-item">
                          <div className="timeline-marker">
                            <span className="timeline-year">{item.year}</span>
                            <div className="timeline-dot" />
                          </div>
                          <SpotlightCard className="timeline-card" tiltMaxAngle={4}>
                            <div className="timeline-card-inner">
                              <h4>{item.title}</h4>
                              <p>{item.desc}</p>
                            </div>
                          </SpotlightCard>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apresentacao;