
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;
  const images = product.images || [product.image];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-5xl bg-[#121212] border border-gray-800 clip-mech shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-slide-up">
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/50 border border-gray-800 text-gray-400 hover:text-white hover:border-brand clip-btn transition-all"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Seção de Imagens (Galeria) */}
        <div className="w-full md:w-1/2 relative flex flex-col bg-black/40 border-r border-gray-800">
          <div className="relative flex-1 overflow-hidden">
            <img 
              src={images[activeImg]} 
              alt={product.name} 
              className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
            
            {product.onSale && (
              <div className="absolute top-6 left-6 bg-brand text-black font-tech font-bold px-4 py-1 clip-btn text-xs uppercase shadow-xl">
                OFERTA ESPECIAL
              </div>
            )}
          </div>
          
          {/* Miniaturas */}
          <div className="flex gap-2 p-4 bg-black/60 overflow-x-auto custom-scrollbar">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`w-16 h-16 flex-shrink-0 clip-btn border-2 transition-all ${activeImg === idx ? 'border-brand' : 'border-gray-800 opacity-50'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Seção de Conteúdo */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-tech text-brand uppercase tracking-[0.3em] font-bold">{product.brand}</span>
              <span className="w-8 h-[1px] bg-gray-800"></span>
              <span className="text-[10px] font-tech text-gray-500 uppercase tracking-[0.3em]">{product.category}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex text-brand text-[10px]">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
              <span className="text-[10px] text-gray-600 font-tech">(14 Avaliações)</span>
            </div>
          </div>

          <div className="space-y-6 mb-10 flex-grow">
            <p className="text-gray-400 font-sans text-sm leading-relaxed">
              Componente de alta precisão projetado para máxima performance em condições extremas. Fabricado com ligas metálicas de padrão OEM para garantir durabilidade e segurança total na sua pilotagem. Testado sob as mais rigorosas normas de qualidade para garantir o encaixe perfeito.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 border border-gray-800 p-3 clip-btn">
                <span className="block text-[9px] text-gray-500 uppercase font-tech tracking-widest mb-1">Compatibilidade</span>
                <span className="text-white font-tech text-xs font-bold uppercase">Universal / {product.brand}</span>
              </div>
              <div className="bg-black/40 border border-gray-800 p-3 clip-btn">
                <span className="block text-[9px] text-gray-500 uppercase font-tech tracking-widest mb-1">Garantia</span>
                <span className="text-white font-tech text-xs font-bold uppercase">90 Dias Direto</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
               <div className="flex flex-col">
                {product.oldPrice && (
                  <span className="text-sm text-gray-600 line-through font-tech">
                    De: R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                )}
                <div className="flex items-baseline gap-3">
                   <span className="text-4xl font-display font-bold text-brand">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-gray-500 font-tech uppercase tracking-widest">à vista no pix</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 bg-brand text-black font-display font-bold py-4 px-8 text-xl clip-bevel hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              ADICIONAR AO CARRINHO <i className="fa-solid fa-cart-plus"></i>
            </button>
            <button className="w-14 h-14 bg-black border border-gray-800 text-white hover:text-brand hover:border-brand clip-btn flex items-center justify-center transition-all">
              <i className="fa-regular fa-heart text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
