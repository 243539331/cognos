# 05 — Modelo de datos (conceptual)

> Nivel conceptual: entidades y relaciones, no un esquema SQL final. Los datos cognitivos son **datos sensibles de salud** — cada decisión de modelado tiene una contraparte de privacidad.

## Entidades principales

```
Usuario (cuenta) ──< Vinculo >── Usuario
   │                 (rol: cuidador|profesional,
   │                  estado: propuesto|consentido|revocado)
   │
   ├──< Consentimiento (versión del texto, fecha, alcance, revocación)
   │
   ├──< Evaluacion
   │       ├── instrumento_id + version   (inmutable)
   │       ├── modo (auto | asistida por vinculo_id)
   │       ├── respuestas (JSONB, por ítem, con tiempos)
   │       ├── puntajes (por dominio + total + banda resultado)
   │       └── contexto (fecha, dispositivo, interrupciones)
   │
   ├──< PlanEstimulacion
   │       ├── generado_desde: evaluacion_id
   │       ├── objetivos por dominio
   │       └──< SesionEjercicio
   │               ├── ejercicio_id + version + nivel
   │               ├── desempeño (aciertos, tiempos, completada)
   │               └── sincronizada_offline: bool
   │
   ├──< ObservacionCualitativa (autor: vinculo, escalas + texto libre, fecha)
   │
   └──< AccesoAuditado (quién vio qué y cuándo)

Catálogo (independiente de usuarios):
   Instrumento ──< VersionInstrumento (items, reglas, cortes, licencia, estado editorial)
   Ejercicio   ──< VersionEjercicio  (dominio, nivel, assets, estado editorial)
```

## Decisiones de modelado clave

1. **Versionado inmutable de contenidos**: una evaluación referencia `instrumento@version`. Si el instrumento cambia, las evaluaciones históricas siguen siendo interpretables y comparables. Ídem ejercicios.
2. **Respuestas crudas + puntajes derivados**: se guardan las respuestas por ítem (JSONB) y los puntajes calculados. Si una regla de puntuación tenía un error, se puede repuntuar sin perder datos.
3. **Perfil demográfico mínimo necesario**: edad (o año de nacimiento), escolaridad y lengua — porque los puntos de corte de los instrumentos los requieren. Todo lo demás es opcional.
4. **Seudonimización**: la cuenta funciona con alias. Nombre real, documento y contacto viven en una tabla separada, cifrada a nivel de aplicación, y solo si la persona los aporta.
5. **El vínculo es la unidad de permiso**: nadie ve datos de otra persona sin un vínculo consentido y vigente; cada lectura queda en `AccesoAuditado`.
6. **Cualitativo estructurado**: las observaciones de cuidadores usan escalas fijas + texto libre, lo que permite graficarlas junto a lo cuantitativo.
7. **Borrado real**: el derecho al olvido se implementa con borrado físico de identificables y, si la persona lo pide, de todo el historial. Los agregados anónimos para reportes a patrocinadores se calculan sin re-identificación posible.

## Métricas agregadas (para patrocinadores y mejora)

Se calculan sobre datos anonimizados y agregados (k-anonimato mínimo, p. ej. nunca reportar grupos < 20 personas):

- Personas activas, evaluaciones aplicadas, adherencia a planes.
- Distribución de bandas de resultado por región/edad (sin identificar).
- Tasas de derivación sugerida.

> Estas métricas son el "retorno social" que se reporta a patrocinadores — diseñarlas desde el inicio evita improvisar después con datos que no se recolectaron.
