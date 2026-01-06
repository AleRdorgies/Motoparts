
import React from 'react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, cartTotal, onOpenCart, searchQuery, onSearch }) => {
  return (
    <header className="sticky top-0 z-50 bg-metal-900/95 backdrop-blur border-b border-gray-800 shadow-xl">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 group flex-shrink-0">
          <i className="fa-solid fa-gear text-brand text-2xl group-hover:rotate-180 transition duration-700"></i>
          <span className="font-display text-xl font-bold tracking-tighter text-white">MOTO<span className="text-brand">PARTS</span></span>
        </a>

        <div className="flex-1 max-w-xl relative hidden sm:block">
          <input 
            type="text" 
            placeholder="Buscar peça, modelo ou código..." 
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 font-tech focus:border-brand focus:outline-none clip-btn text-sm"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand">
            <i className="fa-solid fa-search"></i>
          </button>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex flex-col items-end leading-tight">
            <span className="text-[10px] text-gray-500 font-tech uppercase tracking-widest">Total Carrinho</span>
            <span className="font-display font-bold text-brand">R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          
          <button 
            onClick={onOpenCart} 
            className="relative p-2 text-white hover:text-brand transition group flex items-center gap-3"
          >
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-tech uppercase text-xs font-bold hidden md:block">Carrinho</span>
          </button>
        </div>
      </div>
      
      {/* Busca Mobile */}
      <div className="sm:hidden p-2 bg-[#0a0a0a] border-t border-gray-800">
        <div className="relative">
           <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 font-tech focus:border-brand focus:outline-none clip-btn text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
