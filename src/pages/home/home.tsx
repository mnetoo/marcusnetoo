import "./home.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main>
        <Banner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;