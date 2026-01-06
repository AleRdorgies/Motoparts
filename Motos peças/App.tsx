
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import PolicyModal from './components/PolicyModal';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import { generateProducts } from './mockData';
import { Product, CartItem } from './types';

const PRODUCTS_PER_PAGE = 12;

const App: React.FC = () => {
  const [allProducts] = useState<Product[]>(() => {
    try {
      const prods = generateProducts(100);
      return Array.isArray(prods) ? prods : [];
    } catch (e) {
      console.error("Falha ao gerar produtos:", e);
      return [];
    }
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('motoparts-cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Limpando cache do carrinho devido a erro de leitura:", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      localStorage.setItem('motoparts-cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Erro ao persistir carrinho:", e);
    }
  }, [cart]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      if (!p) return false;
      const nameMatch = p.name ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
      const brandMatch = selectedBrand ? p.brand === selectedBrand : true;
      return nameMatch && categoryMatch && brandMatch;
    });
  }, [allProducts, searchQuery, selectedCategory, selectedBrand]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-metal-900 flex flex-col selection:bg-brand selection:text-black">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + (item.quantity || 0), 0)} 
        cartTotal={cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <Hero onCtaClick={scrollToCatalog} />

      <main id="catalog" className="max-w-[1400px] mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 w-full">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
        />

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 bg-[#141414] p-6 border border-gray-800 clip-btn">
            <div className="flex flex-col">
               <span className="font-tech text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">Catálogo de Produtos</span>
               <span className="text-white font-tech">
                {filteredProducts.length > 0 ? (
                  <>Exibindo <strong className="text-brand text-xl">{filteredProducts.length}</strong> itens encontrados</>
                ) : (
                  <span className="text-red-500 uppercase font-bold tracking-widest">Busca sem resultados</span>
                )}
               </span>
            </div>
            
            <div className="flex items-center gap-4 mt-6 sm:mt-0">
              <label className="text-[10px] text-gray-600 uppercase font-tech tracking-widest">Ordenar:</label>
              <select className="bg-black border border-gray-800 text-white text-xs py-2 px-4 focus:border-brand outline-none font-tech clip-btn appearance-none cursor-pointer hover:border-gray-600 transition">
                <option>Relevância</option>
                <option>Menor Preço</option>
                <option>Maior Preço</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in">
              {paginatedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => addToCart(product)} 
                  onViewDetails={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-[#141414] border-2 border-dashed border-gray-800 clip-mech animate-slide-up">
              <div className="mb-8 relative inline-block">
                <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full"></div>
                <i className="fa-solid fa-magnifying-glass-minus text-6xl text-gray-800 relative z-10"></i>
              </div>
              <h3 className="text-white font-display text-3xl mb-4 tracking-tighter">ITEM NÃO ENCONTRADO</h3>
              <p className="text-gray-500 font-tech uppercase tracking-[0.2em] text-xs max-w-md mx-auto leading-relaxed">
                Nenhuma peça coincide com sua busca por "<span className="text-brand">{searchQuery || 'os filtros selecionados'}</span>". Tente resetar o painel para ver todo o estoque.
              </p>
              <button 
                onClick={resetFilters}
                className="mt-10 bg-brand text-black font-display font-bold px-10 py-4 clip-bevel hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-brand/10"
              >
                VER TUDO NOVAMENTE <i className="fa-solid fa-rotate-right ml-2 text-sm"></i>
              </button>
            </div>
          )}

          {totalPages > 1 && filteredProducts.length > 0 && (
            <div className="mt-20 flex justify-center items-center gap-3">
              <button 
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(p => p - 1);
                  scrollToCatalog();
                }}
                className="w-12 h-12 flex items-center justify-center bg-[#141414] border border-gray-800 text-gray-500 hover:border-brand hover:text-brand disabled:opacity-10 clip-btn transition"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      scrollToCatalog();
                    }}
                    className={`w-12 h-12 flex items-center justify-center clip-btn transition-all font-tech font-bold border ${currentPage === i + 1 ? 'bg-brand text-black border-brand' : 'bg-[#141414] text-gray-500 border-gray-800 hover:text-white'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button 
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(p => p + 1);
                  scrollToCatalog();
                }}
                className="w-12 h-12 flex items-center justify-center bg-[#141414] border border-gray-800 text-gray-500 hover:border-brand hover:text-brand disabled:opacity-10 clip-btn transition"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer onOpenPolicy={setActivePolicy} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={(id) => setCart(prev => prev.filter(i => i.id !== id))}
        onUpdateQty={(id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, (i.quantity || 1) + delta) } : i))}
      />

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
      />

      <PolicyModal 
        type={activePolicy} 
        onClose={() => setActivePolicy(null)} 
      />

      <CookieConsent />
    </div>
  );
};

export default App;
