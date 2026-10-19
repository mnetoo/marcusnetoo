import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import MagneticButton from '../common/MagneticButton';
import './Footer.css';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand" onClick={() => navigate('/')}>
            <div className="footer-logo-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <span className="footer-logo-text">Marcus Neto</span>
          </div>

          <nav className="footer-nav">
            <MagneticButton strength={0.2}>
              <a onClick={() => navigate('/')} className="footer-link">Home</a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a onClick={() => navigate('/about')} className="footer-link">About</a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a onClick={() => navigate('/portfolio')} className="footer-link">Portfolio</a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a onClick={() => navigate('/contact')} className="footer-link">Contact</a>
            </MagneticButton>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Marcus Neto. Combining computing technology with healthcare innovation.
          </p>
          <div className="footer-tag">
            <span>UFPR • Biomedical Informatics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
