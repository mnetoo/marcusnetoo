import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <header className="header-container">
            <div className="header-content">
                <div className="logo-section" onClick={() => handleNavigation('/')}>
                    <FontAwesomeIcon icon={faCode} className="logo-icon" />
                    <span className="logo-text">Marcus Neto</span>
                </div>
                
                <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <a onClick={() => handleNavigation('/')} className="nav-link">
                        <span className="nav-number">01.</span> Home
                    </a>
                    <a onClick={() => handleNavigation('/about')} className="nav-link">
                        <span className="nav-number">02.</span> About
                    </a>
                    <a onClick={() => handleNavigation('/portfolio')} className="nav-link">
                        <span className="nav-number">03.</span> Portfolio
                    </a>
                    <a onClick={() => handleNavigation('/contact')} className="nav-link">
                        <span className="nav-number">04.</span> Contact
                    </a>
                </nav>

                <div className="menu-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
            </div>
        </header>
    );
};

export default Header;