# Sitio Web CV Profesional

## Descripción del proyecto

Sitio web estático de una sola página (single-page) que funciona como CV profesional. Incluye información personal, foto, resumen profesional, formación académica, habilidades técnicas, proyectos realizados e información de contacto. Diseño responsive con layout de dos columnas en desktop (sidebar fija con scroll independiente) y una columna en móvil.

## Tecnologías utilizadas

- HTML5
- CSS3 (variables CSS, Flexbox, Grid, media queries)
- JavaScript (vanilla)
- Sin dependencias ni frameworks externos

## URL del sitio publicado en Azure

<!-- Reemplazar con la URL una vez desplegado en Azure -->
**URL:** _Pendiente de despliegue_

## Características

- **Diseño responsive**: Se adapta de móvil (320px) a desktop (1920px)
- **Single Page**: Todo el contenido se carga sin navegación entre páginas
- **Optimizado en rendimiento**: Carga rápida con recursos optimizados
- **Compatible con navegadores**: Funciona en Chrome, Firefox, Safari, Edge
- **Código limpio**: HTML, CSS y JavaScript puro sin dependencias

## Estructura del proyecto

```
professional-cv-website/
├── index.html              # Documento HTML principal
├── css/
│   ├── styles.css         # Hoja de estilos principal
│   └── styles.min.css     # Hoja de estilos minificada
├── js/
│   ├── script.js          # Mejoras en JavaScript
│   └── script.min.js      # JavaScript minificado
├── images/
│   └── profile.jpg        # Foto profesional
├── docs/                  # Documentación
├── .gitignore             # Exclusiones de Git
└── README.md              # Este archivo
```

## Desarrollo local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/bricenojuliana/NUTI_cloud-computing-project.git
   cd professional-cv-website
   ```

2. Abre `index.html` en tu navegador:
   ```bash
   # En macOS
   open index.html
   
   # En Linux
   xdg-open index.html
   
   # En Windows
   start index.html
   ```

3. O usa un servidor web local:
   ```bash
   python -m http.server 8000
   # o: npx http-server
   ```

4. Navega a `http://localhost:8000` en tu navegador

## Licencia

Este proyecto es de código abierto y está disponible para uso personal.
