# Grupo SITACO - Web + Base de datos (HTML/CSS/JS + PHP/MySQL)

## Qué incluye
- Landing responsive (one-page) con paleta inspirada en tus flyers.
- Interacciones con JavaScript:
  - Menú mobile
  - Filtro de servicios
  - Galería tipo carrusel (swipe en celular)
  - FAQ acordeón
  - Validación + envío AJAX del formulario
- API en PHP (PDO) para guardar consultas en MySQL.
- SQL listo para crear base y tabla.

## Estructura
- index.html
- assets/
  - css/style.css
  - js/app.js
  - img/ (tus imágenes ya copiadas acá)
- api/
  - config.php
  - save_contact.php
- sql/schema.sql

## Cómo correrlo en local (rápido)
> Necesitás PHP + MySQL (XAMPP/WAMP/Laragon sirve perfecto).

1) Copiá esta carpeta dentro de tu servidor web:
   - XAMPP: `htdocs/sitaco_web/`
2) En MySQL, ejecutá `sql/schema.sql` (por phpMyAdmin o consola).
3) Editá `api/config.php` con tu usuario/clave.
4) Abrí en el navegador:
   - http://localhost/sitaco_web/

## Cómo probar que guarda en la DB
En phpMyAdmin:
- Base: sitaco_db
- Tabla: consultas
Deberías ver los registros al enviar el formulario.

## Personalización rápida
- Cambiar textos: `index.html`
- Cambiar colores: `assets/css/style.css` (variables `--gold`, `--coral`, `--bg`, etc.)
- Reemplazar imágenes: `assets/img/` (mantené los nombres o actualizá las rutas en `index.html`)

Si querés, te armo:
- panel admin (login) para ver/descargar consultas
- mapa (Google Maps) con la zona de trabajo
- versión multi-página (Inicio / Servicios / Contacto)
