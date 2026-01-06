
import React from 'react';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer className="bg-black border-t-4 border-brand py-16 mt-20">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-gear text-brand text-3xl"></i>
              <span className="font-display text-2xl font-bold text-white">MOTO<span className="text-brand">PARTS</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-sans">
              Engenharia de precisão para sua moto. Atendemos entusiastas e profissionais com o que há de mais moderno em componentes mecânicos e acessórios de performance.
            </p>
            <div className="flex gap-3">
              {['instagram', 'youtube', 'facebook', 'whatsapp'].map(social => (
                <a key={social} href="#" className="w-12 h-12 bg-[#111] border border-gray-800 flex items-center justify-center text-gray-500 hover:text-brand hover:border-brand transition-all clip-btn hover:-translate-y-1">
                  <i className={`fa-brands fa-${social} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-white text-xl mb-8 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand"></span> Links Rápidos
            </h4>
            <ul className="space-y-4 text-sm text-gray-500 font-tech uppercase tracking-[0.1em]">
              <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[8px] text-brand"></i> Rastrear Pedido</a></li>
              <li><button onClick={() => onOpenPolicy('privacy')} className="hover:text-brand transition-colors flex items-center gap-2 text-left w-full"><i className="fa-solid fa-chevron-right text-[8px] text-brand"></i> Política de Privacidade</button></li>
              <li><button onClick={() => onOpenPolicy('terms')} className="hover:text-brand transition-colors flex items-center gap-2 text-left w-full"><i className="fa-solid fa-chevron-right text-[8px] text-brand"></i> Termos de Uso</button></li>
              <li><a href="#" className="hover:text-brand transition-colors flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[8px] text-brand"></i> FAQ / Suporte</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-xl mb-8 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand"></span> Atendimento
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <i className="fa-solid fa-headset text-brand text-xl"></i>
                <div>
                  <p className="text-xs text-gray-400 font-tech uppercase mb-1">Central de Vendas</p>
                  <p className="text-white font-bold font-tech text-lg">(11) 4002-8922</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <i className="fa-solid fa-envelope text-brand text-xl"></i>
                <div>
                  <p className="text-xs text-gray-400 font-tech uppercase mb-1">E-mail Comercial</p>
                  <p className="text-white font-bold font-tech">vendas@motoparts.com.br</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-metal-900 border border-gray-800 p-8 clip-mech">
            <h4 className="font-display text-white text-lg mb-4">Newsletter</h4>
            <p className="text-xs text-gray-500 font-tech uppercase mb-6">Receba ofertas exclusivas de performance.</p>
            <div className="space-y-3">
              <input type="email" placeholder="Seu melhor e-mail" className="w-full bg-black border border-gray-800 p-3 text-white font-tech focus:border-brand outline-none clip-btn text-xs" />
              <button className="w-full bg-brand text-black font-display font-bold py-3 clip-bevel hover:bg-white transition">INSCREVER</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-tech text-gray-600 text-[10px] uppercase tracking-[0.3em] text-center md:text-left">
            &copy; 2025 MotoParts Global Store. <span className="text-gray-800">|</span> CNPJ: 00.000.000/0001-00 <span className="text-gray-800">|</span> São Paulo - BR
          </p>
          <div className="flex items-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition duration-500">
            <i className="fa-brands fa-cc-visa text-3xl"></i>
            <i className="fa-brands fa-cc-mastercard text-3xl"></i>
            <i className="fa-brands fa-pix text-2xl"></i>
            <i className="fa-solid fa-barcode text-3xl"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
