import "./about.css";
import Header from "../../components/header";
import Apresentação from "../../components/aboutcontent";
import profileImage from '../../assets/images/marcus.png';

const About = () => {

  return (

   // 1. Contêiner principal que vai alinhar tudo
    <div className="page-wrapper">
      
      {/* 2. Div exclusivamente para a imagem de fundo */}
      <div 
        className="background-image-container" 
        style={{ backgroundImage: `url(${profileImage})` }}
      ></div>

      {/* 3. Contêiner para todo o seu conteúdo, que ficará SOBRE a imagem */}
      <div className="content-container">
        <Header />
        <Apresentação />
      </div>

    </div>

  );

};

export default About;
