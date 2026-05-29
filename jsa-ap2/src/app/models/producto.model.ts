export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
  oferta: boolean;
  descuento: number;
  descripcion: string;
}
