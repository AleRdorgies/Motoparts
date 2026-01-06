
import { Product } from './types';

const baseImages = [
  "https://images.unsplash.com/photo-1568285746736-2182c4da0664?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626451638202-0e227a97754f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530026602330-22c710375681?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981033-f5e2ddd9c572?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591290619808-147321e058f4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449495169669-7b118f960237?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=600&auto=format&fit=crop"
];

const productPresets = [
  { name: "Cubo Traseiro Titan 150", category: "Cubo" },
  { name: "Flange da Coroa Sport", category: "Flange" },
  { name: "Espelho de Roda Reforçado", category: "Espelho de Roda" },
  { name: "Disco de Freio Twister", category: "Freios" },
  { name: "Manete Esportivo Ajustável", category: "Acessórios" },
  { name: "Kit Relação Aço 1045", category: "Transmissão" },
  { name: "Amortecedor Pro-Link", category: "Motor" },
  { name: "Protetor de Motor CG", category: "Acessórios" },
  { name: "Cubo Dianteiro Scud", category: "Cubo" },
  { name: "Flange de Alumínio Billet", category: "Flange" },
];

const brands = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'];

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => {
    const preset = productPresets[i % productPresets.length];
    const basePrice = 50 + Math.random() * 850;
    const hasDiscount = Math.random() > 0.7;
    
    const productImages = [
      baseImages[i % baseImages.length],
      baseImages[(i + 1) % baseImages.length],
      baseImages[(i + 2) % baseImages.length],
      baseImages[(i + 3) % baseImages.length],
    ];

    return {
      id: i + 1,
      name: `${preset.name} - Mod ${100 + i}`,
      category: preset.category,
      price: basePrice,
      oldPrice: hasDiscount ? basePrice * 1.25 : undefined,
      image: productImages[0],
      images: productImages,
      brand: brands[i % brands.length],
      isNew: Math.random() > 0.8,
      onSale: hasDiscount
    };
  });
};
