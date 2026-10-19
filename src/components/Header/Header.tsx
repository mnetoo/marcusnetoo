import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MagneticButton from '../common/MagneticButton';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { number: '01.', label: 'Home', path: '/' },
    { number: '02.', label: 'About', path: '/about' },
    { number: '03.', label: 'Portfolio', path: '/portfolio' },
    { number: '04.', label: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-pill">
        <MagneticButton strength={0.25} onClick={() => handleNavigation('/')}>
          <div className="logo-section">
            <div className="logo-icon-wrapper">
              <FontAwesomeIcon icon={faCode} className="logo-icon" />
            </div>
            <span className="logo-text">Marcus Neto</span>
          </div>
        </MagneticButton>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <MagneticButton key={item.path} strength={0.2}>
                <a
                  onClick={() => handleNavigation(item.path)}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                  data-cursor-text={item.label}
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="nav-label">{item.label}</span>
                  {isActive && <span className="nav-active-pill" />}
                </a>
              </MagneticButton>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-trigger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-backdrop" onClick={toggleMenu} />
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <div className="logo-section" onClick={() => handleNavigation('/')}>
              <FontAwesomeIcon icon={faCode} className="logo-icon" />
              <span className="logo-text">Marcus Neto</span>
            </div>
            <button className="mobile-close-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <nav className="mobile-nav-links">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;