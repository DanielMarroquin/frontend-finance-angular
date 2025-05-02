# 📘 README - Financial Products App (Prueba Técnica)

## 📄 Descripción del sistema
Este sistema es una aplicación frontend desarrollada en Angular 16 que permite la gestión de productos financieros de un banco. Se ha desarrollado con una arquitectura escalable y profesional para facilitar su mantenimiento, extensibilidad y reutilización. Incluye funcionalidades como:

- Visualización de productos financieros (listado paginado y filtrado)
- Creación, edición y eliminación de productos
- Validaciones sincronizadas y asincrónicas (verificación de ID existente)
- Manejo visual de errores y formularios reactivos
- Uso de layouts estructurados para vistas reutilizables

---

## 🧪 Cobertura de pruebas
Las pruebas unitarias han sido implementadas usando **Jest** con cobertura mínima del 70% en:

- Servicios (`ProductService`)
- Componentes (`product-form`, `product-list`)
- Validaciones personalizadas

Ejecutar pruebas:
```bash
npm run test
```

Ver cobertura:
```bash
npm run test:coverage
```

Un resumen de la cobertura se generará en la carpeta `/coverage`, incluyendo un reporte visual en HTML.

---

## 🔧 Instrucciones para levantar el backend local
Para ejecutar correctamente el frontend, debes iniciar el servidor backend local con Node.js.

1. Solicita el archivo `repo-interview-main.zip` al equipo técnico.
2. Descomprime el archivo y navega a la carpeta:

```bash
cd repo-interview-main
npm install
npm run start:dev
```

3. El backend estará disponible en:
```
http://localhost:3002
```

Rutas disponibles:
- `GET /bp/products` → Obtener productos
- `POST /bp/products` → Crear nuevo producto
- `PUT /bp/products/:id` → Actualizar producto
- `DELETE /bp/products/:id` → Eliminar producto
- `GET /bp/products/verification/:id` → Verificar existencia de ID

---

## 💡 Notas de arquitectura

La aplicación sigue una arquitectura limpia y modular:

```plaintext
src/app
│
├── core/                  # Interceptors, guards, servicios globales
│   ├── interceptors/      # Interceptor HTTP para manejo de errores
│   └── services/          # Servicios singleton (ej: ProductService)
│
├── shared/                # Componentes, pipes y directivas reutilizables
│   └── components/        # Ej: modal, spinner, toasts
│
├── layouts/               # Estructura de layouts reutilizables
│   └── main-layout/       # Layout principal con navbar/footer
│
├── features/products/     # Módulo de productos financieros
│   ├── components/        # Componentes internos (card, menu, etc.)
│   ├── pages/             # product-list, product-form
│   ├── services/          # Lógica de negocio
│   ├── models/            # Interface Product
│   └── products.module.ts
│
├── utils/                 # Validadores personalizados, helpers
└── app-routing.module.ts
```

### Buenas prácticas aplicadas:
- ✅ Separación por dominios (feature-based architecture)
- ✅ Principios SOLID y Clean Code
- ✅ Lazy loading en rutas
- ✅ FormBuilder + ReactiveForms
- ✅ Manejo global de errores

---

## ✅ Screenshots del sistema

> Incluye aquí capturas de pantalla si deseas mejorar la presentación final del repositorio.

Ejemplo:
```
📸 /screenshots/product-list.png
📸 /screenshots/product-form.png
📸 /screenshots/modal-delete.png
```

Puedes agregar imágenes arrastrándolas a tu repositorio GitHub y enlazarlas aquí con Markdown:
```md
![Listado de productos](screenshots/product-list.png)
```

---

¿Deseas que continúe generando el código para los componentes y formularios a partir de esta base?
