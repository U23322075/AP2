import { Component } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html'
})
export class TiendaComponent {
  horarios = [
    { dia: 'Lunes a Viernes', hora: '9:00 AM - 7:00 PM' },
    { dia: 'Sábados',         hora: '9:00 AM - 5:00 PM' },
    { dia: 'Domingos',        hora: '10:00 AM - 3:00 PM' }
  ];
}
