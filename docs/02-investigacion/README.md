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

> **Nota metodológica**: la investigación se hizo en **tres rondas**. La ronda 1 (24 fuentes, 63 afirmaciones) sentó las bases; su síntesis automática se interrumpió por límite de sesión y se sintetizó a mano. La ronda 2 (26 fuentes, **22 afirmaciones confirmadas 3-0**) cerró los vacíos sobre licencias, instrumentos en español, regulación, financiación, accesibilidad y terapias. La ronda 3 (28 fuentes, **25 afirmaciones confirmadas 3-0**) cerró los seis vacíos restantes: copyright de cada instrumento, INVIMA/Ley 1581, financiadores (Google/Cloudflare/OPS), CST digital-individual y CST-ES, y recursos de lenguaje llano en español. Ver [`fuentes.md`](fuentes.md) para la bibliografía completa con evaluación de calidad. Varias fuentes primarias (w3.org, PMC, Elsevier, AWS, NICE, INVIMA, RAE) bloquean el fetch automático (403); esas citas se confirmaron vía snippets de búsqueda concordantes.

## Índice

1. [Instrumentos de evaluación y sus licencias](01-instrumentos-evaluacion.md) — **el hallazgo más importante para el diseño**
2. [Evidencia científica del entrenamiento cognitivo digital](02-evidencia-cientifica.md)
3. [Plataformas existentes y lecciones aprendidas](03-plataformas-existentes.md)
4. [Regulación, ética y privacidad de datos](04-regulacion-etica.md)
5. [Diseño accesible: base de evidencia](05-diseno-accesible.md)
6. [Financiación y patrocinios en Latinoamérica](06-financiacion-patrocinios.md)
7. [Fuentes (bibliografía)](fuentes.md)

## Resumen ejecutivo — 12 conclusiones que cambian el plan

1. **La licencia de los instrumentos es una restricción de diseño de primer orden, no un detalle legal.** El **MMSE está protegido por copyright** (licencia exclusiva a PAR, cobro por copia) y el **MoCA se volvió propietario en 2019** (exige entrenamiento y certificación pagados). Un portal sin ánimo de lucro **no debería digitalizarlos sin licencia escrita**. (Ver §1.)

2. **Para baja alfabetización, el Fototest (± AD8) es probablemente el mejor punto de partida** ✅: validado en español, **independiente de la lectoescritura**, ~2,8 min, mejor utilidad poblacional (aROC 0,851; 0,875 con el AD8 respondido por el cuidador). Es más apto que el propio Mini-Cog para nuestra población. (Confirmar copyright con autores.)

3. **El Mini-Cog es utilizable por una ONG** ✅: su licencia permite **uso no comercial gratuito**, sin modificar el instrumento y conservando la atribución. Robusto en baja escolaridad (83% vs. 81% del MMSE) y validado en español. Buena alternativa/complemento del Fototest.

   ⚠️ **Matiz de la 3ª ronda**: **ningún** instrumento en español (Fototest, Eurotest, T@M, AD8) es de dominio público — permiten uso clínico no comercial, pero **digitalizarlos requiere permiso escrito del autor** (el Fototest tiene cláusula "SinObraDerivada"). El **GPCOG** y el **Mini-Cog** son las vías de menor fricción legal. (Ver §1.4.)

4. **La evidencia respalda el entrenamiento cognitivo en Deterioro Cognitivo Leve (DCL/MCI), no en demencia establecida.** Meta-análisis: efecto moderado en DCL (g=0.35 ✅); en demencia el efecto es débil y depende de realidad virtual/consolas (✅). **El público diana primario del portal debe ser DCL.**

5. **La Terapia de Estimulación Cognitiva (CST) es el marco terapéutico de referencia** ✅: **única intervención no farmacológica recomendada por NICE** para la cognición en demencia leve-moderada, coste-efectiva, **delegable a no especialistas (task-shifting)** y ya **adaptada a entornos de bajos recursos y baja alfabetización** (Tanzania). Es el modelo a seguir para el módulo de terapias — con un aval que ningún "brain game" comercial tiene.

6. **Lumosity fue multada con US$2 millones por la FTC (2016) por publicidad engañosa** sobre "brain training". Lección cautelar central: **jamás afirmar que los ejercicios previenen o revierten el deterioro**; hablar de estimulación y mantenimiento. Respetar también la voz escéptica de Cochrane (evidencia de calidad limitada).

7. **"Tamizaje, no diagnóstico" es también la estrategia regulatoria correcta** ✅. En UE, México y Argentina el criterio decisivo es el **"propósito médico previsto"**: una herramienta de **bienestar/orientación no diagnóstica queda FUERA de la categoría de dispositivo médico**. La "regla de oro" del proyecto coincide con lo que lo mantiene sin regular.

8. **Detectar deterioro a escala tiene riesgos éticos reales**: un positivo temprano no predice de forma fiable la demencia, y la detección digital puede **agravar desigualdades** por sesgo de datos y brecha digital. Todo positivo debe venir con **vía de derivación y acompañamiento**.

9. **Los datos cognitivos son datos sensibles de salud** (ej. Colombia, Ley 1581): exigen **consentimiento previo y expreso**, cifrado y mínima recolección. Una ONG pequeña probablemente está exenta del registro de bases de datos, pero sigue sujeta a la ley.

10. **Diseñar con y para adultos mayores tiene recetas concretas** ✅: navegación simplificada, texto y objetos táctiles grandes, interacción por voz, interfaces tolerantes al error; y **W3C COGA** aporta patrones comprobables (no depender de la memoria, lenguaje literal, presente/voz activa, vocabulario común). **Diseño participativo**: co-crear con usuarios mejora medible­mente la usabilidad.

11. **Existen plataformas de referencia en español de las que aprender** (NeuronUP, Gradior): Gradior entrega entrenamiento **sin intervención diaria de un profesional** y con informes — el modelo exacto para bajo personal. NeuronUP aporta el multi-canal (incl. lápiz y papel).

12. **Hay financiación e infraestructura para esto.** El **BID/BID Lab** financia soluciones para la población mayor vulnerable de LatAm (US$300k–2M históricos). Y el costo de operación puede bajar a ~0 con **AWS Nonprofit Credit Program** (US$1.000 vía TechSoup) y **Microsoft for Nonprofits** ✅ — ambos exigen **tener figura jurídica de ONG**, otra razón para constituirla en Fase 0.
