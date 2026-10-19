import "./portfolio.css";
import Header from "../../components/Header/Header";
import Carrossel from "../../components/Carrosel/Carrossel";
import Footer from "../../components/Footer/Footer";

const Portfolio = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main>
        <Carrossel />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;