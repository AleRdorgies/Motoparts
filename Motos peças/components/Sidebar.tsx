
import React from 'react';

interface SidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onCategoryChange, selectedBrand, onBrandChange }) => {
  const categories = [
    'Cubo', 
    'Flange', 
    'Espelho de Roda', 
    'Transmissão', 
    'Freios', 
    'Rodas', 
    'Acessórios', 
    'Motor'
  ];
  const manufacturers = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
      <div className="bg-[#141414] border border-gray-800 p-6 clip-mech">
        <h2 className="font-display text-2xl text-white uppercase flex items-center gap-3 mb-8">
          <i className="fa-solid fa-sliders text-brand text-sm"></i> Filtragem
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="font-tech text-gray-500 font-bold uppercase tracking-widest mb-6 text-xs flex items-center justify-between">
              Categorias
              <span className="w-12 h-[1px] bg-gray-800"></span>
            </h3>
            <ul className="space-y-4">
              <li 
                className={`flex items-center gap-3 cursor-pointer group transition-all ${selectedCategory === null ? 'text-brand' : 'text-[#607d8b] hover:text-white'}`}
                onClick={() => onCategoryChange(null)}
              >
                <div className={`w-5 h-5 border flex items-center justify-center transition ${selectedCategory === null ? 'border-brand bg-brand text-black shadow-lg shadow-brand/20' : 'border-gray-700 bg-black group-hover:border-gray-500'}`}>
                  {selectedCategory === null && <i className="fa-solid fa-check text-[10px]"></i>}
                </div>
                <span className="font-tech uppercase text-sm tracking-wide">Todos os Produtos</span>
              </li>
              {categories.map(cat => (
                <li 
                  key={cat}
                  className={`flex items-center gap-3 cursor-pointer group transition-all ${selectedCategory === cat ? 'text-brand' : 'text-[#607d8b] hover:text-white'}`}
                  onClick={() => onCategoryChange(cat)}
                >
                  <div className={`w-5 h-5 border flex items-center justify-center transition ${selectedCategory === cat ? 'border-brand bg-brand text-black shadow-lg shadow-brand/20' : 'border-gray-700 bg-black group-hover:border-gray-500'}`}>
                    {selectedCategory === cat && <i className="fa-solid fa-check text-[10px]"></i>}
                  </div>
                  <span className="font-tech uppercase text-sm tracking-wide">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-tech text-gray-500 font-bold uppercase tracking-widest mb-6 text-xs flex items-center justify-between">
              Fabricante
              <span className="w-12 h-[1px] bg-gray-800"></span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => onBrandChange(null)}
                className={`text-[10px] font-tech uppercase py-2 px-3 border clip-btn transition-all ${selectedBrand === null ? 'bg-brand border-brand text-black font-bold shadow-lg shadow-brand/10' : 'bg-black border-gray-800 text-[#607d8b] hover:border-gray-600 hover:text-white'}`}
              >
                Todas
              </button>
              {manufacturers.map(brand => (
                <button 
                  key={brand}
                  onClick={() => onBrandChange(brand)}
                  className={`text-[10px] font-tech uppercase py-2 px-3 border clip-btn transition-all ${selectedBrand === brand ? 'bg-brand border-brand text-black font-bold shadow-lg shadow-brand/10' : 'bg-black border-gray-800 text-[#607d8b] hover:border-gray-600 hover:text-white'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
           <div className="bg-brand/5 border border-brand/20 p-4 clip-btn text-center">
            <i className="fa-solid fa-shield-halved text-brand text-2xl mb-3"></i>
            <h4 className="font-display text-white text-sm">Garantia Total</h4>
            <p className="text-[10px] text-gray-500 font-tech uppercase mt-1">90 dias contra defeitos</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
