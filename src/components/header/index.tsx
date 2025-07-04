import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (

        <div>
            <header className="header-container"> 
                <FontAwesomeIcon icon={faCode} />
                <nav className="main-nav">
                    <a onClick={() => navigate('/')}>Home</a>
                    <a onClick={() => navigate('/about')}>About</a>
                    <a onClick={() => navigate('/portfolio')}>Portfolio</a>
                    <a onClick={() => navigate('/contact')}>Contact</a>
                </nav>
                <div className="menu-icon"></div>
            </header>
        </div>
    );

};

export default Header;