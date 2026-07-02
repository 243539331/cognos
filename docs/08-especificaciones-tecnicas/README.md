# 08 — Especificaciones técnicas (andamiaje, sin construir la app)

> Puente entre el plan y el futuro código. Aquí se definen los **contratos de datos** (esquemas) y los **wireframes de accesibilidad** que guiarán la implementación. **No es código de aplicación**: son especificaciones que un profesional clínico puede revisar y que el equipo técnico implementará después.

## Principio rector

El contenido clínico (instrumentos y ejercicios) vive como **datos declarativos versionados**, no como código (ver [arquitectura §"Definición declarativa"](../03-arquitectura.md)). Ventajas:

- **Auditoría clínica sin leer código**: el asesor revisa un YAML/JSON legible.
- **Versión inmutable**: cada evaluación guarda con qué versión se aplicó → comparabilidad longitudinal.
- **Licencia embebida y bloqueante**: sin un bloque de licencia verificada, el instrumento **no se puede publicar**.
- **Adaptación cultural como datos**: traducir/ajustar es editar datos, no reprogramar.

## Contenido

| Documento | Qué define |
|---|---|
| [Esquema de instrumento](esquema-instrumento.md) | Estructura de un instrumento de tamizaje: ítems, puntuación, cortes por edad/escolaridad, bandas de resultado, metadatos de licencia |
| [Esquema de ejercicio](esquema-ejercicio.md) | Estructura de un ejercicio de estimulación: dominio, nivel, dificultad adaptativa, accesibilidad |
| [Wireframes de accesibilidad](wireframes-accesibilidad.md) | Flujos y pantallas clave descritos con criterios COGA/UNE 153101 |

## ⚠️ Nota de copyright en los ejemplos

Los ejemplos de este directorio usan **contenido de marcador de posición (placeholder)**, **no** reproducen los ítems reales de ningún instrumento con copyright (Fototest, AD8, T@M, Mini-Cog, etc.). La investigación confirmó que esos instrumentos **no son de dominio público** (ver [§1.4](../02-investigacion/01-instrumentos-evaluacion.md)). Los ítems reales solo se cargarán **tras obtener permiso escrito** del titular, y se mantendrán fuera del control de versiones público si la licencia así lo exige.
