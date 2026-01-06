
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onViewDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = product.images || [product.image];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <article className="group bg-[#161616] border border-gray-800 hover:border-brand/50 transition-all duration-500 clip-mech flex flex-col relative product-card-shadow h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
        {/* Etiquetas */}
        {product.onSale && (
          <div className="absolute top-3 left-3 bg-brand text-black font-tech font-bold px-3 py-1 z-20 clip-btn text-[10px] uppercase shadow-lg pointer-events-none">
            SALE
          </div>
        )}
        {product.isNew && !product.onSale && (
          <div className="absolute top-3 left-3 bg-white text-black font-tech font-bold px-3 py-1 z-20 clip-btn text-[10px] uppercase shadow-lg pointer-events-none">
            NOVO
          </div>
        )}

        {/* Carrossel de Imagens */}
        <div className="relative w-full h-full cursor-pointer" onClick={onViewDetails}>
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`${product.name} view ${idx + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === currentIdx ? 'opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-110' : 'opacity-0'}`}
              loading="lazy"
            />
          ))}
        </div>

        {/* Controles do Carrossel */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <button 
                onClick={prevImage}
                className="w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-brand hover:text-black transition-colors pointer-events-auto"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>
              <button 
                onClick={nextImage}
                className="w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-brand hover:text-black transition-colors pointer-events-auto"
              >
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1 transition-all duration-300 ${idx === currentIdx ? 'w-4 bg-brand' : 'w-1 bg-white/30'}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Ações Rápidas */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black to-transparent flex flex-col gap-2 z-20">
          <button 
            onClick={onViewDetails}
            className="w-full bg-white/10 backdrop-blur-md text-white font-display font-bold uppercase py-2 clip-btn hover:bg-white hover:text-black transition-colors text-xs flex items-center justify-center gap-2 border border-white/20"
          >
            VER DETALHES <i className="fa-solid fa-eye"></i>
          </button>
          <button 
            onClick={onAddToCart}
            className="w-full bg-brand text-black font-display font-bold uppercase py-3 clip-bevel hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            COMPRAR <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9px] font-tech text-gray-500 uppercase tracking-[0.2em]">{product.category}</span>
          <span className="text-[9px] font-tech text-brand/70 uppercase font-bold">{product.brand}</span>
        </div>
        
        <h3 
          onClick={onViewDetails}
          className="font-tech text-lg font-semibold text-white leading-snug mb-4 group-hover:text-brand transition-colors cursor-pointer"
        >
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[11px] text-gray-600 line-through font-tech">
                R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            )}
            <span className="text-2xl font-display font-bold text-white group-hover:text-brand transition-colors">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <button className="text-gray-700 hover:text-brand transition-colors p-2">
            <i className="fa-regular fa-bookmark"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
