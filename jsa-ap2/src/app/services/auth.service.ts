import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Credenciales simuladas
  private readonly VALID_USER = 'admin';
  private readonly VALID_PASS = '1234';
  private readonly MAX_ATTEMPTS = 3;

  // Contador de intentos fallidos en memoria (se resetea al recargar)
  private failedAttempts = 0;

  constructor(private router: Router) {}

  /**
   * Intenta hacer login con las credenciales dadas.
   * Retorna: 'ok' | 'fail' | 'blocked'
   */
  login(usuario: string, password: string): 'ok' | 'fail' | 'blocked' {
    if (usuario === this.VALID_USER && password === this.VALID_PASS) {
      // Cuando las credenciales son correctas, entonces guardar en localStorage
      const userData = {
        usuario: usuario,
        nombre: 'Administrador',
        email: 'admin@tienda.com',
        loginDate: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(userData));
      this.failedAttempts = 0; // resetear contador
      this.router.navigate(['/dashboard']);
      return 'ok';
    }

    // Credenciales incorrectas
    this.failedAttempts++;

    if (this.failedAttempts >= this.MAX_ATTEMPTS) {
      // 3 intentos fallidos para resetear y redirigir al home
      this.failedAttempts = 0;
      this.router.navigate(['/home']);
      return 'blocked';
    }

    return 'fail';
  }

  /**
   * Cierra sesión eliminando el localStorage y redirigiendo al home
   */
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  /**
   * Verifica si hay una sesión activa en localStorage
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  /**
   * Devuelve los datos del usuario logueado
   */
  getCurrentUser(): any {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  /**
   * Devuelve cuántos intentos fallidos lleva el usuario
   */
  getFailedAttempts(): number {
    return this.failedAttempts;
  }

  /**
   * Devuelve el máximo de intentos permitidos
   */
  getMaxAttempts(): number {
    return this.MAX_ATTEMPTS;
  }
}
