import "./about.css";
import Header from "../../components/Header/Header";
import Apresentação from "../../components/Apresentação/Apresentacao";
import Curso from "../../components/Curso/Curso";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main>
        <Apresentação />
        <Curso />
      </main>
      <Footer />
    </div>
  );
};

export default About;