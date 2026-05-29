import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  // Two-Way Data Binding con [(ngModel)]
  usuario: string = '';
  password: string = '';

  // Mensajes de error y estado
  errorMsg: string = '';
  mostrarError: boolean = false;
  loginBloqueado: boolean = false;
  loginExitoso: boolean = false;

  constructor(public authService: AuthService) {}

  // Arreglo para renderizar los puntos de intentos con *ngFor
  get puntosIntentos(): boolean[] {
    const puntos: boolean[] = [];
    for (let i = 0; i < this.authService.getMaxAttempts(); i++) {
      puntos.push(i < this.authService.getFailedAttempts());
    }
    return puntos;
  }

  get intentosRestantes(): number {
    return this.authService.getMaxAttempts() - this.authService.getFailedAttempts();
  }

  onLogin(): void {
    // Validación antes de enviar
    if (!this.usuario.trim() || !this.password.trim()) {
      this.errorMsg = 'Por favor completa todos los campos.';
      this.mostrarError = true;
      return;
    }

    const resultado = this.authService.login(this.usuario, this.password);

    if (resultado === 'ok') {
      // Si Login correcto, el servicio redirige automáticamente a /dashboard
      this.loginExitoso = true;
      this.mostrarError = false;
      this.loginBloqueado = false;

    } else if (resultado === 'fail') {
      // Credenciales incorrectas, aún tiene intentos
      const restantes = this.intentosRestantes;
      this.errorMsg = `Credenciales incorrectas. Te quedan ${restantes} intento${restantes === 1 ? '' : 's'}.`;
      this.mostrarError = true;
      this.password = ''; // Limpiar el campo de contraseña

    } else if (resultado === 'blocked') {
      // Cuando Agotó los 3 intentos, el servicio redirige automáticamente a /home
      this.loginBloqueado = true;
      this.mostrarError = false;
    }
  }
}
