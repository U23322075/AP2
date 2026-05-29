import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  // Two-Way Binding: buscador y filtro de categoría
  textoBusqueda: string = '';
  categoriaSeleccionada: string = '';
  categorias: string[] = [];

  cargando: boolean = true;
  error: boolean = false;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.categorias = [...new Set(data.map(p => p.categoria))];
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  // Filtro combinado: buscador + categoría
  filtrar(): void {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase()
        .includes(this.textoBusqueda.toLowerCase());
      const coincideCategoria = this.categoriaSeleccionada
        ? p.categoria === this.categoriaSeleccionada
        : true;
      return coincideNombre && coincideCategoria;
    });
  }

  limpiarFiltros(): void {
    this.textoBusqueda = '';
    this.categoriaSeleccionada = '';
    this.productosFiltrados = this.productos;
  }

  calcularPrecioOferta(precio: number, descuento: number): number {
    return precio - (precio * descuento / 100);
  }
}
