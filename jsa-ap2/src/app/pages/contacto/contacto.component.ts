import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {

  // Two-Way Data Binding con [(ngModel)]
  nombre: string = '';
  email: string = '';
  asunto: string = '';
  mensaje: string = '';

  enviando: boolean = false;
  enviado: boolean = false;
  error: boolean = false;

  constructor(private productosService: ProductosService) {}

  enviar(): void {
    if (!this.nombre || !this.email || !this.mensaje) return;

    this.enviando = true;

    const datos = {
      nombre: this.nombre,
      email: this.email,
      asunto: this.asunto,
      mensaje: this.mensaje,
      fecha: new Date().toISOString()
    };

    this.productosService.enviarContacto(datos).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        this.limpiar();
      },
      error: () => {
        this.enviado = true;
        this.enviando = false;
        this.limpiar();
      }
    });
  }

  limpiar(): void {
    this.nombre = '';
    this.email = '';
    this.asunto = '';
    this.mensaje = '';
  }
}
