
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  brand: string;
  isNew?: boolean;
  onSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'Cubo' | 'Flange' | 'Espelho de Roda' | 'Transmissão' | 'Freios' | 'Rodas' | 'Acessórios' | 'Motor';
export type Manufacturer = 'Honda' | 'Yamaha' | 'Suzuki' | 'Kawasaki';
