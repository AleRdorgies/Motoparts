
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('motoparts-cookies-accepted');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('motoparts-cookies-accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[200] md:left-auto md:w-[450px] animate-slide-in">
      <div className="bg-[#161616] border-2 border-brand p-6 clip-mech shadow-2xl relative">
        <div className="flex items-start gap-4">
          <div className="bg-brand/10 p-3 clip-btn border border-brand/20">
            <i className="fa-solid fa-cookie-bite text-brand text-2xl"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-display text-white text-lg mb-2">PRIVACIDADE E COOKIES</h4>
            <p className="text-gray-400 text-xs font-sans leading-relaxed mb-6">
              Nós utilizamos cookies para personalizar sua experiência, analisar tráfego e garantir a segurança das suas transações. Ao continuar navegando, você concorda com nossa política de dados.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={acceptCookies}
                className="flex-1 bg-brand text-black font-display font-bold py-2 px-6 clip-btn hover:bg-white transition-all uppercase text-sm"
              >
                ACEITAR TUDO
              </button>
              <button 
                onClick={acceptCookies}
                className="flex-1 bg-transparent border border-gray-700 text-gray-500 font-display font-bold py-2 px-6 clip-btn hover:text-white hover:border-gray-500 transition-all uppercase text-sm"
              >
                CONFIGURAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
