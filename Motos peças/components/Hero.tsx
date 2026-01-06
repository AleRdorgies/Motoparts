
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative h-[400px] md:h-[550px] flex items-center justify-center bg-black overflow-hidden border-b-4 border-brand">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-metal-900 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="inline-block bg-brand/10 border border-brand/30 text-brand px-4 py-1 mb-6 clip-btn font-tech text-xs uppercase tracking-[0.3em]">
          Linha 2025 Disponível
        </div>
        <h1 className="text-4xl md:text-8xl font-display font-bold text-white tracking-tighter mb-4 leading-none">
          QUALIDADE EM <span className="text-brand">CADA CURVA</span>
        </h1>
        <p className="text-gray-400 text-base md:text-xl mb-10 tracking-wider font-tech uppercase max-w-2xl mx-auto">
          As melhores marcas para Transmissão, Freios e Cubos com entrega em todo o Brasil.
        </p>
        <button 
          onClick={onCtaClick}
          className="bg-brand hover:bg-white hover:text-black text-black font-display font-bold text-xl md:text-2xl py-4 px-12 clip-bevel transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-brand/20"
        >
          EXPLORAR CATÁLOGO <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
        </button>
      </div>

      <div className="absolute bottom-6 left-6 hidden xl:flex items-center gap-4 text-[10px] font-tech text-gray-600 uppercase tracking-[0.4em]">
        <span className="w-16 h-[1px] bg-brand"></span>
        <span>Peças Originais e Importadas</span>
      </div>
    </section>
  );
};

export default Hero;
