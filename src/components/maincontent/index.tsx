import './style.css';
import profileImage from '../../assets/images/marcus.png';
import curriculo from '../../assets/docs/Currículo.pdf';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-left">

        <h1>Marcus Neto</h1>
        <p>Biomedical Informatic & Back-end Developer</p>
        <div className="cta-buttons">
          <a href={curriculo} download="Curriculo.pdf">
            <button className="button primary-button">Download CV</button>
          </a>
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