# 02 — Investigación

Dossier de investigación que fundamenta las decisiones de producto, arquitectura y diseño del portal. Se elaboró con un arnés de búsqueda multi-fuente con verificación adversarial (varios agentes intentan *refutar* cada afirmación antes de aceptarla).

## Cómo leer este dossier — niveles de confianza

Cada afirmación relevante está etiquetada según su grado de verificación:

| Etiqueta | Significado |
|---|---|
| ✅ **Verificado (3-0)** | Confirmado por 3 revisores independientes que intentaron refutarlo y no pudieron. Alta confianza. |
| 📄 **Fuente citada (verificación pendiente)** | Extraído de una fuente primaria/secundaria con cita textual, pero la verificación adversarial no llegó a completarse (se agotó el presupuesto de sesión). Confianza media: la cita es real, conviene confirmarla contra el original antes de decisiones críticas. |
| ❌ **Refutado** | La revisión encontró que la afirmación no se sostiene como estaba redactada. |
| 🔎 **Dato de contexto** | Proveniente de resúmenes de búsqueda, no de lectura completa de la fuente. Tratar como pista a confirmar. |

> **Nota metodológica**: la síntesis final automática se interrumpió por límite de sesión. Este documento es una síntesis manual del material recolectado (63 afirmaciones extraídas de 24 fuentes). Las citas textuales y URLs son las que devolvió la investigación; ver [`fuentes.md`](fuentes.md) para la bibliografía completa con evaluación de calidad de cada fuente.

## Índice

1. [Instrumentos de evaluación y sus licencias](01-instrumentos-evaluacion.md) — **el hallazgo más importante para el diseño**
2. [Evidencia científica del entrenamiento cognitivo digital](02-evidencia-cientifica.md)
3. [Plataformas existentes y lecciones aprendidas](03-plataformas-existentes.md)
4. [Regulación, ética y privacidad de datos](04-regulacion-etica.md)
5. [Diseño accesible: base de evidencia](05-diseno-accesible.md)
6. [Financiación y patrocinios en Latinoamérica](06-financiacion-patrocinios.md)
7. [Fuentes (bibliografía)](fuentes.md)

## Resumen ejecutivo — 10 conclusiones que cambian el plan

1. **La licencia de los instrumentos es una restricción de diseño de primer orden, no un detalle legal.** El **MMSE está protegido por copyright** (licencia exclusiva a PAR, cobro por copia) y el **MoCA se volvió propietario en 2019** (exige entrenamiento y certificación pagados). Un portal sin ánimo de lucro **no debería digitalizarlos sin licencia escrita**. (Ver §1.)

2. **El Mini-Cog es el mejor candidato de arranque**: rápido, funciona incluso en personas con muy baja escolaridad (precisión 83% vs. 81% del MMSE ✅) y tiene versiones validadas en español. Su modelo de licencia es mucho más abierto que MMSE/MoCA (confirmar por escrito).

3. **La evidencia respalda el entrenamiento cognitivo en Deterioro Cognitivo Leve (DCL/MCI), no en demencia establecida.** Meta-análisis: efecto moderado en MCI (g=0.35 ✅); en demencia el efecto es débil y depende de realidad virtual/consolas, no de entrenamiento clásico (✅). **Consecuencia: el público diana primario del portal debe ser DCL, no demencia avanzada.**

4. **Hay una voz escéptica de peso (Cochrane) que debemos respetar.** La revisión Cochrane de referencia concluyó que la evidencia es de baja calidad para conclusiones firmes. El portal debe comunicar beneficios con prudencia y **nunca prometer prevenir la demencia**.

5. **Lumosity fue multada con US$2 millones por la FTC (2016) por publicidad engañosa** sobre "brain training". Es la lección cautelar central: **jamás afirmar que los ejercicios previenen o revierten el deterioro**; hablar de estimulación y mantenimiento.

6. **"Tamizaje, no diagnóstico" es también la postura de la literatura clínica**, que posiciona estos instrumentos como apoyo a la atención primaria. Confirma la "regla de oro" del proyecto (ver [01-vision](../01-vision-y-alcance.md)).

7. **Detectar deterioro a escala tiene riesgos éticos reales**: un positivo temprano no predice de forma fiable la demencia, y desplegar detección digital puede **agravar desigualdades** por sesgo de datos y brecha digital — justo la población que queremos ayudar. Todo positivo debe venir con vía de derivación y acompañamiento.

8. **Diseñar con y para adultos mayores tiene recetas concretas y basadas en evidencia**: navegación simplificada, texto y objetos táctiles grandes, interacción por voz, interfaces tolerantes al error, y **diseño participativo** (co-crear con los usuarios mejora medible­mente la usabilidad).

9. **Existen plataformas de referencia en español de las que aprender** (NeuronUP, Gradior): Gradior demuestra que un sistema puede entregar entrenamiento **sin intervención diaria de un profesional** y con informes de avance — el modelo exacto para bajo personal.

10. **Hay financiación regional para esto.** El **BID/BID Lab** ha financiado soluciones para la población mayor vulnerable de América Latina (montos históricos de US$300k–2M por proyecto), con la "economía plateada" como foco. Aunque esa convocatoria puntual cerró, marca un canal real y recurrente.
