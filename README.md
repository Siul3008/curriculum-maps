# Mallas curriculares interactivas

La interfaz y los datos de las carreras están separados:

- `index.html`: estructura general de la página.
- `styles.css`: apariencia.
- `script.js`: interacción, progreso y conexiones.
- `careers.js`: catálogo de carreras, semestres y cursos.
- `sw.js`: archivos disponibles sin conexión.

## Agregar una carrera

Añade una nueva propiedad dentro de `CAREERS` en `careers.js`. Cada carrera necesita:

- `name`: nombre mostrado en el selector.
- `title` y `description`: textos del encabezado.
- `legendLabels`: nombres de las áreas.
- `semesters`: lista de semestres.

Cada curso usa este formato:

```js
{
  id: "codigo-unico",
  code: "IC0000",
  name: "Nombre del curso",
  credits: 3,
  area: "prog",
  req: ["id-prerrequisito"],
  coreq: ["id-correquisito"]
}
```

`req` y `coreq` son opcionales. El selector y la malla se generan automáticamente con el catálogo; no hace falta editar el HTML ni la lógica.

## Publicar una actualización

Cuando cambies datos, estilos o funcionamiento, aumenta la versión de `CACHE_NAME` en `sw.js` (por ejemplo, de `malla-tec-v5` a `malla-tec-v6`). Al detectar la nueva versión, la página mostrará un aviso para actualizar. El progreso del usuario se guarda aparte en el navegador y no se elimina durante este proceso.
