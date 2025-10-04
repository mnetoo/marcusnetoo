import React, { useState } from 'react';
import './Contato.css';
import { faWhatsapp, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emailjs from 'emailjs-com';

const Contato: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  const [likes, setLikes] = useState(72);
  const [liked, setLiked] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showPopupMessage = (message: string, type: 'success' | 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const serviceID = 'service_922cyw7';
      const templateID = 'template_89bui7v';
      const userID = 'lGaamDvOsG2q9vrwf';

      // Envio real do email
      await emailjs.send(serviceID, templateID, {
        from_name: formData.nome,
        from_email: formData.email,
        message: formData.mensagem,
        to_email: 'marcusnetoo@outlook.com'
      }, userID);

      // Sucesso
      showPopupMessage('Message sent successfully! I will be in touch soon.', 'success');
      setFormData({ nome: '', email: '', mensagem: '' });
      
    } catch (error) {
      // Erro - fallback para simulação
      console.log('EmailJS not configured, using simulation');
      
      // Se quiser ver o erro real, descomente a linha abaixo:
      showPopupMessage('Error sending message. Please try again.', 'error');
    } finally {
      setEnviando(false);
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const contatos = [
    {
      plataforma: 'WhatsApp',
      icone: faWhatsapp,
      link: 'https://wa.me/41995917386',
      texto: '+55 (41) 99591-7386'
    },
    {
      plataforma: 'Instagram',
      icone: faInstagram,
      link: 'https://www.instagram.com/marcus.netoo?igsh=NWg2dWppOHJpbTBt&utm_source=qr',
      texto: '@marcus.netoo'
    },
    {
      plataforma: 'LinkedIn',
      icone: faLinkedin,
      link: 'https://www.linkedin.com/in/marcus-neto-a83319306/',
      texto: 'MarcusNeto'
    },
    {
      plataforma: 'Personal Email',
      icone: faEnvelope,
      link: 'mailto:marcusnetoo@outlook.com',
      texto: 'marcusnetoo@outlook.com'
    },
    {
      plataforma: 'University Email',
      icone: faEnvelope,
      link: 'mailto:marcusneto@ufpr.com',
      texto: 'marcusneto@ufpr.com'
    }
  ];

  return (
    <section className="contato-container" id="contato">
      <div className="contato-content">
        <h2 className="contato-title">Talk to me</h2>
        <p className="contato-subtitle">
          Let's talk! Get in touch through social media or send a direct message.
        </p>

        <div className="contato-grid">
          {/* Contact Links */}
          <div className="contato-links-section">
            <h3 className="section-title">Connect With Me</h3>
            <div className="links-grid">
              {contatos.map((contato, index) => (
                <a
                  key={index}
                  href={contato.link}
                  className="contato-link-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="link-icone">
                    <FontAwesomeIcon icon={contato.icone} />
                  </div>
                  <div className="link-info">
                    <span className="link-plataforma">{contato.plataforma}</span>
                    <span className="link-texto">{contato.texto}</span>
                  </div>
                  <div className="link-arrow">→</div>
                </a>
              ))}
            </div>

            {/* Likes Section */}
            <div className="likes-section">
              <h3 className="section-title">Did you like my work?</h3>
              <div className="likes-container">
                <button 
                  className={`like-btn ${liked ? 'liked' : ''}`}
                  onClick={handleLike}
                >
                  <span className="like-icone">❤️</span>
                  <span className="like-texto">
                    {liked ? 'Liked!' : 'Like'}
                  </span>
                </button>
                <div className="likes-contador">
                  <span className="likes-numero">{likes}</span>
                  <span className="likes-label">likes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="form-section">
            <h3 className="section-title">Send a Message</h3>
            <form className="contato-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensagem" className="form-label">Your Message</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="form-textarea"
                  required
                  rows={5}
                  placeholder="Tell me about your project or question..."
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={enviando}
              >
                {enviando ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Popup de Notificação */}
      {showPopup && (
        <div className={`popup-overlay ${showPopup ? 'show' : ''}`}>
          <div className={`popup-container ${popupType}`}>
            <div className="popup-header">
              <div className="popup-icon">
                {popupType === 'success' ? '✓' : '✕'}
              </div>
              <button className="popup-close" onClick={closePopup}>
                ×
              </button>
            </div>
            <div className="popup-content">
              <h3 className="popup-title">
                {popupType === 'success' ? 'Success!' : 'Error!'}
              </h3>
              <p className="popup-message">{popupMessage}</p>
            </div>
            <div className="popup-progress">
              <div className="popup-progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contato;