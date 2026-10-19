import "./contact.css";
import Header from "../../components/Header/Header";
import Contato from "../../components/Contato/Contato";
import Footer from "../../components/Footer/Footer";

const Contact = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main>
        <Contato />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;