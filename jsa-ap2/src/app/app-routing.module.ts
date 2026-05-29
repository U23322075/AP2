import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Redirección por defecto al home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rutas públicas
  { path: 'home',      component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ofertas',   component: OfertasComponent },
  { path: 'tienda',    component: TiendaComponent },
  { path: 'contacto',  component: ContactoComponent },
  { path: 'mi-cuenta', component: MiCuentaComponent },
  { path: 'login',     component: LoginComponent },

  // Rutas protegiads - requiere autenticación (AuthGuard)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // Ruta 404
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
