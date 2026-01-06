
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-metal-900 border-l border-gray-800 h-full flex flex-col shadow-2xl animate-slide-in">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#161616]">
          <h2 className="font-display text-2xl text-white">MEU <span className="text-brand">CARRINHO</span></h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors h-10 w-10 flex items-center justify-center border border-gray-800 clip-btn">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800">
                <i className="fa-solid fa-cart-shopping text-4xl text-gray-800"></i>
              </div>
              <p className="text-gray-500 font-tech uppercase tracking-widest text-sm mb-8">Nenhuma peça adicionada</p>
              <button 
                onClick={onClose}
                className="bg-brand text-black px-10 py-3 font-display font-bold uppercase clip-bevel hover:scale-105 transition"
              >
                Voltar à Loja
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-black/40 border border-gray-800 clip-btn group">
                <div className="w-20 h-20 bg-metal-800 flex-shrink-0 clip-btn overflow-hidden border border-gray-700">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white text-xs font-bold uppercase tracking-wide line-clamp-1">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                      <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-metal-900 border border-gray-700 px-3 py-1 clip-btn">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="text-gray-500 hover:text-brand"><i className="fa-solid fa-minus text-[10px]"></i></button>
                      <span className="text-white text-xs font-tech font-bold min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="text-gray-500 hover:text-brand"><i className="fa-solid fa-plus text-[10px]"></i></button>
                    </div>
                    <span className="text-brand font-display text-lg font-bold">
                      R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-[#161616] border-t border-gray-800 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 uppercase font-tech tracking-[0.3em] text-xs">Subtotal</span>
            <span className="text-3xl font-display font-bold text-white">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          
          <div className="space-y-3">
            <button 
              disabled={items.length === 0}
              className="w-full bg-brand hover:bg-brand-hover text-black font-display font-bold py-4 text-xl clip-bevel transition-all active:scale-95 disabled:opacity-20 disabled:grayscale"
            >
              FINALIZAR COMPRA
            </button>
            <p className="text-[9px] text-gray-600 text-center font-tech uppercase tracking-widest">
              Frete calculado na próxima etapa • Pagamento Seguro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
