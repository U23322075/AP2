import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // URL del JSON Server local (npm run server)
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // GET todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  // GET un producto por ID
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/productos/${id}`);
  }

  // GET solo productos en oferta
  getOfertas(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos?oferta=true`);
  }

  // GET productos por categoría
  getByCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos?categoria=${categoria}`);
  }

  // POST guardar mensaje de contacto
  enviarContacto(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contactos`, datos);
  }
}
