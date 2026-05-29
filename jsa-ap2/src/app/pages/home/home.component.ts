import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  // Productos destacados para mostrar en el home
  productosDestacados: Producto[] = [];

  categorias = [
    { nombre: 'Tecnología', icono: 'fa-solid fa-desktop', ruta: '/productos' },
    { nombre: 'Periféricos', icono: 'fa-solid fa-computer-mouse', ruta: '/productos' },
    { nombre: 'Audio', icono: 'fa-solid fa-headphones', ruta: '/productos' },
    { nombre: 'Mobiliario', icono: 'fa-solid fa-chair', ruta: '/productos' },
    { nombre: 'Almacenamiento', icono: 'fa-solid fa-hdd', ruta: '/productos' }
  ];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data: Producto[]) => {
        // Mostrar solo los primeros 4 como destacados
        this.productosDestacados = data.slice(0, 4);
      },
      error: () => {
        // Si no carga, se muestra vacío
      }
    });
  }

  calcularPrecioOferta(precio: number, descuento: number): number {
    return precio - (precio * descuento / 100);
  }
}
