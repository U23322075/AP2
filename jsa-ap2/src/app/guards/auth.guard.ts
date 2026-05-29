import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificar si hay sesión activa
    if (this.authService.isAuthenticated()) {
      return true; // ✅ Sesión activa → acceso permitido
    }

    // Sin sesión va a redirigir al Home
    this.router.navigate(['/']);
    return false;
  }
}
