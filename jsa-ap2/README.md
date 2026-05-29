# ⚡ TechStore — AP2 JavaScript Avanzado | UTP

E-commerce desarrollado con Angular, Bootstrap y JSON Server.

## 🚀 Instalación y uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar JSON Server (base de datos simulada)
Abrir una terminal y ejecutar:
```bash
npm run server
```
Esto levanta la API en `http://localhost:3000`

### 3. Iniciar la aplicación Angular
Abrir **otra** terminal y ejecutar:
```bash
npm start
```
La app estará disponible en `http://localhost:4200`

---

## 🔐 Credenciales de login
| Campo | Valor |
|-------|-------|
| Usuario | `admin` |
| Contraseña | `1234` |

---

## 📋 Lógica de autenticación (punto clave AP2)

1. El usuario intenta acceder a `/dashboard`
2. El **AuthGuard** intercepta la navegación y verifica `localStorage.getItem('user')`
3. Si NO hay sesión → redirige automáticamente a `/login`
4. En `/login` el usuario tiene **3 intentos**:
   - Intento 1 fallido → mensaje de advertencia, quedan 2 intentos
   - Intento 2 fallido → mensaje de alerta, queda 1 intento
   - Intento 3 fallido → **redirección automática a `/home`**, contador reseteado
5. Si el login es correcto → guarda datos en `localStorage` y redirige a `/dashboard`

---

## 📁 Estructura del proyecto
```
src/app/
├── components/
│   ├── navbar/          # Navbar reutilizable
│   └── footer/          # Footer reutilizable
├── guards/
│   └── auth.guard.ts    # Protección de rutas
├── models/
│   └── producto.model.ts
├── pages/
│   ├── home/
│   ├── productos/       # Con buscador y filtro por categoría
│   ├── ofertas/
│   ├── tienda/
│   ├── contacto/        # Formulario con POST a JSON Server
│   ├── mi-cuenta/
│   ├── login/           # Lógica de 3 intentos
│   ├── dashboard/       # Ruta protegida con AuthGuard
│   └── not-found/       # Página 404 personalizada
├── services/
│   ├── auth.service.ts
│   └── productos.service.ts
├── app-routing.module.ts
└── app.module.ts
```

## ✅ Checklist AP2
- [x] Navbar y Footer reutilizables
- [x] 6 páginas mínimas + Login + Dashboard + 404
- [x] Angular Routing con AuthGuard
- [x] Redirección a /login si no hay sesión
- [x] 3 intentos → redirección a /home
- [x] Login con ngModel, validaciones y localStorage
- [x] Data Binding: interpolación, property, event, two-way
- [x] *ngFor y *ngIf
- [x] [ngClass] y [ngStyle]
- [x] Pipes: CurrencyPipe, DatePipe, UpperCasePipe, SlicePipe
- [x] Bootstrap: grid, cards, navbar, formularios, botones, tablas
- [x] JSON Server con db.json
- [x] Consumo REST con HttpClient y servicios Angular
- [x] Página de productos con buscador y filtro por categoría
- [x] Dashboard protegido con estadísticas
- [x] Responsive desktop y mobile
