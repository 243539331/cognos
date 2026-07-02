# 01 — Visión y alcance

## Problema

El deterioro cognitivo (desde el deterioro cognitivo leve —DCL/MCI— hasta las demencias) afecta de forma desproporcionada a poblaciones vulnerables: la detección tardía es la norma donde no hay acceso a neurólogos, geriatras o neuropsicólogos, y las terapias de estimulación cognitiva son costosas o inexistentes fuera de las grandes ciudades. En América Latina la prevalencia de demencia crece más rápido que en países de ingresos altos, con sistemas de salud con poca capacidad de respuesta.

## Visión

Un portal web gratuito, en español, que permita a personas, cuidadores y profesionales comunitarios de salud:

1. Aplicar **tamizajes cognitivos validados y autoadministrables o asistidos**.
2. Recibir un **perfil cognitivo comprensible** con orientación sobre próximos pasos (incluida la derivación a valoración clínica).
3. Acceder a un **plan de ejercicios de estimulación cognitiva** personalizado, basado en evidencia y adaptado al perfil.
4. Consultar un **tablero de progreso** longitudinal, cuantitativo y cualitativo, compartible con profesionales de salud.

## Usuarios (personas)

| Perfil | Necesidad principal |
|---|---|
| **Persona con quejas cognitivas** (autónoma) | Autoevaluarse, ejercitarse, entender su evolución |
| **Cuidador / familiar** | Aplicar evaluaciones asistidas, registrar observaciones cualitativas, seguir el progreso |
| **Profesional comunitario / terapeuta voluntario** | Gestionar varios usuarios, aplicar instrumentos, ajustar planes, exportar reportes |
| **Administrador de la organización** | Gestión de contenidos, instrumentos, métricas agregadas para patrocinadores |

## Qué ES y qué NO ES

| ES | NO ES |
|---|---|
| Herramienta de **tamizaje** y estimulación cognitiva | Herramienta de **diagnóstico médico** |
| Complemento del sistema de salud (deriva y comparte reportes) | Sustituto de la valoración clínica |
| Plataforma sin ánimo de lucro financiada por patrocinios | Producto comercial o de suscripción |
| Registro longitudinal de la función cognitiva | Historia clínica oficial |

> ⚠️ **Regla de oro**: la palabra "diagnóstico" no se usa de cara al usuario. Se habla de "resultados de tamizaje", "perfil cognitivo" y "orientación". Esto es tanto una decisión ética como regulatoria (ver [02 — Regulación y ética](02-investigacion/regulacion-etica.md)).

## Alcance funcional (módulos)

1. **Evaluación**: catálogo de instrumentos de tamizaje digitalizados (con licencias verificadas), aplicación guiada (auto o asistida), puntuación automática con reglas de corte por edad/escolaridad cuando el instrumento lo requiera.
2. **Perfil y orientación**: síntesis por dominios cognitivos (memoria, atención, lenguaje, función ejecutiva, visuoespacial, orientación), semáforo de riesgo y recomendaciones de derivación.
3. **Plan de estimulación**: biblioteca de ejercicios clasificados por dominio y dificultad; motor de recomendación basado en el perfil; sesiones con dificultad adaptativa.
4. **Tablero de progreso**: series de tiempo de puntajes y desempeño en ejercicios; registro cualitativo estructurado (observaciones de cuidadores con escalas simples + texto libre); reportes exportables (PDF) para llevar al médico.
5. **Gestión**: cuentas y vínculos persona–cuidador–profesional, consentimiento informado, administración de contenidos.

## Restricciones de diseño

- **Costo de operación cercano a cero** (infraestructura donada o de nivel gratuito; ver arquitectura).
- **Funciona en teléfonos de gama baja y conexiones intermitentes** (PWA, poco JavaScript, contenidos ligeros, tolerancia offline en ejercicios).
- **Español primero**, con estructura preparada para otras lenguas (incluidas lenguas indígenas a futuro).
- **Aplicable de forma asistida**: en poblaciones vulnerables, muchas veces quien opera el portal es el cuidador o un agente comunitario, no la persona evaluada.
