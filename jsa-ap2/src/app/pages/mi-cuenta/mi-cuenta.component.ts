import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html'
})
export class MiCuentaComponent {
  constructor(public authService: AuthService) {}
}
