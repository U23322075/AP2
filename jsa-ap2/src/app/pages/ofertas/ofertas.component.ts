import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html'
})
export class OfertasComponent implements OnInit {

  ofertas: Producto[] = [];
  cargando: boolean = true;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getOfertas().subscribe({
      next: (data: Producto[]) => {
        this.ofertas = data;
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  calcularPrecioOferta(precio: number, descuento: number): number {
    return precio - (precio * descuento / 100);
  }

  calcularAhorro(precio: number, descuento: number): number {
    return precio * descuento / 100;
  }
}
