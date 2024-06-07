export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  imageUrl: string; // Nova kolona za URL slike
  category: string;
}
