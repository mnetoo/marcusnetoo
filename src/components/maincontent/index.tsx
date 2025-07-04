import './style.css';
import profileImage from '../../assets/images/marcus.png';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-left">

        <h1>Marcus Neto</h1>
        <p>Biomedical Informatic & Back-end Developer</p>

        <div className="cta-buttons">
          <button className="button primary-button"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'Currículo.pdf';
              link.download = 'Curriculo.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>Download CV 
          </button>
        </div>
      </div>
      <div className="hero-right">
        <div className="image-frame">
          <img src={profileImage} alt="marcus" />
        </div>
      </div>
    </section>
  );
};

export default Hero;