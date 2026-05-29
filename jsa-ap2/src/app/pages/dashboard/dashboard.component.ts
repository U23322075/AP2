import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  // Datos del usuario logueado
  usuario: any = null;

  // Estadísticas calculadas desde la API
  totalProductos: number = 0;
  totalOfertas: number = 0;
  stockBajo: number = 0;
  valorInventario: number = 0;
  productos: Producto[] = [];
  fechaHoy: Date = new Date();

  constructor(
    private authService: AuthService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    // Obtener datos del usuario
    this.usuario = this.authService.getCurrentUser();

    // Obtener productos desde JSON Server para calcular estadísticas
    this.productosService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        this.totalProductos = data.length;
        this.totalOfertas = data.filter(p => p.oferta).length;
        this.stockBajo = data.filter(p => p.stock <= 10).length;
        this.valorInventario = data.reduce((acc, p) => acc + (p.precio * p.stock), 0);
      },
      error: (err) => {
        console.error('Error al cargar productos (¿JSON Server está corriendo?):', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
