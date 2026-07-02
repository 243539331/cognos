# Cognos — Portal de apoyo para personas con deterioro cognitivo

**Cognos** es un proyecto **sin ánimo de lucro** cuyo objetivo es poner al alcance de poblaciones vulnerables —que no pueden acceder a servicios terapéuticos especializados— herramientas digitales para:

1. **Evaluar** (tamizaje) distintos dominios y tipos de deterioro cognitivo mediante instrumentos validados.
2. **Orientar**: entregar un perfil cognitivo y una orientación clara (no un diagnóstico médico) que indique cuándo buscar valoración profesional.
3. **Ejercitar**: proponer ejercicios y terapias de estimulación cognitiva personalizados según el perfil de la persona.
4. **Seguir el progreso**: un tablero con la evolución cuantitativa (puntajes, tiempos, adherencia) y cualitativa (observaciones de cuidadores y profesionales).

El proyecto se sostiene mediante **patrocinios y alianzas** (fundaciones, programas de nube para ONG, universidades, entidades de salud pública), no mediante cobro a los usuarios.

## Estado actual

📋 **Fase de planeación** — todavía no hay código. Este repositorio contiene la investigación, la arquitectura y el diseño que servirán de base para la implementación.

## Documentación

| Documento | Contenido |
|---|---|
| [01 — Visión y alcance](docs/01-vision-y-alcance.md) | Problema, usuarios, principios, qué es y qué NO es el portal |
| [02 — Investigación](docs/02-investigacion/) | Instrumentos de evaluación, evidencia científica, plataformas existentes, regulación y ética, financiación |
| [03 — Arquitectura](docs/03-arquitectura.md) | Módulos, stack propuesto, infraestructura de bajo costo |
| [04 — Diseño, UX y accesibilidad](docs/04-diseno-ux-accesibilidad.md) | Accesibilidad cognitiva, diseño para adultos mayores, multilingüismo |
| [05 — Modelo de datos](docs/05-modelo-datos.md) | Entidades principales, privacidad y consentimiento |
| [06 — Hoja de ruta](docs/06-hoja-de-ruta.md) | Fases de implementación y criterios de éxito |

## Principios rectores

- **Primero, no dañar**: el portal hace *tamizaje y orientación*, nunca emite diagnósticos médicos. Todo resultado se acompaña de la recomendación de valoración profesional cuando corresponde.
- **Evidencia**: solo se implementan instrumentos y terapias con respaldo científico y licencias claras.
- **Accesibilidad radical**: diseñado para adultos mayores, baja alfabetización digital y conectividad limitada.
- **Privacidad por diseño**: los datos cognitivos son datos sensibles de salud; se tratan con el máximo estándar aplicable.
- **Abierto**: código y documentación abiertos para que otras organizaciones puedan replicarlo.
