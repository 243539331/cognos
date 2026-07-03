# Contenido clínico (instrumentos y ejercicios)

Este directorio contiene los **datos declarativos** que el motor carga en tiempo de ejecución (ver `src/content/loader.ts` y `docs/08-especificaciones-tecnicas/`).

## ⚠️ Todo lo que hay aquí hoy es contenido de DEMOSTRACIÓN

Ningún instrumento de tamizaje en español investigado (Fototest, Eurotest, T@M, AD8, Mini-Cog) es de dominio público para digitalización sin permiso escrito del autor. Los manuales de CST tampoco. Ver:

- `docs/02-investigacion/01-instrumentos-evaluacion.md` — estado de licencia de cada instrumento
- `docs/02-investigacion/02-evidencia-cientifica.md` §2.6 — licencias de CST
- `docs/07-plan-maestro-fase-0.md` §3–4 — a quién contactar para obtener permiso

Los archivos `demo-*.yaml` usan contenido genérico u original, marcado explícitamente como **NO CLÍNICO**, solo para poder construir y probar el motor y las pantallas. **No usar como base clínica real.**

## Cómo se publican instrumentos/ejercicios reales

1. Obtener el permiso escrito del titular (ver plan maestro).
2. Crear el YAML siguiendo `docs/08-especificaciones-tecnicas/esquema-instrumento.md` o `esquema-ejercicio.md`.
3. Completar el bloque `licencia` con `permiso_digitalizacion: true` (o `permiso_uso: true`) y `verificada_por` con el nombre de quien confirmó el permiso.
4. El asesor clínico revisa el YAML (es legible sin tocar código).
5. Cambiar `estado: publicado` — el motor (`src/content/loader.ts`) **bloquea** cualquier contenido sin licencia verificada, sin importar el valor de `estado`.
