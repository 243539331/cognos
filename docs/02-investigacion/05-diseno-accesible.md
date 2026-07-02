# 5 — Diseño accesible: base de evidencia

> Este documento aporta la **evidencia** que respalda las decisiones de [04-diseño-ux-accesibilidad](../04-diseno-ux-accesibilidad.md). El diseño para adultos mayores con deterioro cognitivo tiene recetas concretas y estudiadas — no hay que improvisar.

## 5.1 Los elementos de diseño esenciales (revisión sistemática 2025)

📄 **Fuente citada, verificación interrumpida** — revisión sistemática de diseño de apps móviles *age-friendly* (PMC12350549): 1.556 registros revisados, **132 estudios incluidos**, adultos 60+, junio 2014–marzo 2025.

**Elementos de diseño identificados como esenciales**:
> *"simplified navigation, enlarged text and touch targets, voice interaction, and error-tolerant interfaces"*

| Elemento (evidencia) | Cómo se aplica en Cognos |
|---|---|
| **Navegación simplificada** | Una tarea por pantalla; botón "Continuar" grande; "Volver" siempre en el mismo lugar |
| **Texto y objetos táctiles ampliados** | Tipografía ≥ 18–20 px; objetivos ≥ 44×44 px |
| **Interacción por voz** | Instrucciones en audio + botón "escuchar de nuevo"; explorar entrada por voz |
| **Interfaces tolerantes al error** | Sin castigo por error; guardado automático; reintentos amables |

Estos cuatro elementos ya están recogidos en el documento de diseño; esta revisión los **valida con evidencia**.

## 5.2 Diseñar CON los usuarios: diseño participativo

📄 **Fuente citada, verificación interrumpida** (PMC12350549):

- El **diseño participativo** (co-crear directamente con usuarios mayores) **mejora de forma medible la usabilidad y la satisfacción**.
  > *"Participatory design methods enhanced usability and satisfaction, demonstrating the importance of co-designing applications with older users."*

**Implicación fuerte para el plan**: hay que **involucrar a la población diana vulnerable en el diseño ANTES de codificar**. Esto encaja con la Fase 0/1 (piloto con organización comunitaria): las primeras pantallas deben probarse con usuarios reales, no solo diseñarse en abstracto.

## 5.3 Los problemas que persisten (y que debemos vigilar)

📄 **Fuente citada, verificación interrumpida** (PMC12350549):

- Pese a las estrategias conocidas, **la sobrecarga cognitiva, la falta de alfabetización digital y las barreras de accesibilidad siguen siendo desafíos no resueltos** para los usuarios mayores.
  > *"challenges like cognitive overload, lack of digital literacy, and accessibility barriers persist."*

**Riesgos directos para Cognos** (mitigaciones):

| Riesgo persistente | Mitigación en el plan |
|---|---|
| Sobrecarga cognitiva | Radical: una tarea por pantalla, mínimo texto, sin densidad para la persona evaluada |
| Falta de alfabetización digital | **Modo asistido de primera clase** (cuidador/agente comunitario opera); autenticación sin contraseñas |
| Barreras de accesibilidad | WCAG 2.2 AA + guía W3C COGA como piso |

## 5.4 El vacío que Cognos ayuda a llenar

📄 **Fuente citada, verificación interrumpida** (PMC12350549): la revisión señala como **vacíos de investigación** poco desarrollados: personalización con IA, estudios de usabilidad a largo plazo, y **aplicaciones culturalmente inclusivas**.

**Implicación**: un portal **en español, culturalmente adaptado para población hispana vulnerable**, atiende precisamente el vacío de "aplicaciones culturalmente inclusivas" — con poca evidencia previa sobre la que apoyarse. Esto es a la vez una **oportunidad** (contribución original, atractiva para patrocinadores e investigación) y una **responsabilidad** (documentar y compartir lo aprendido).

## 5.5 Estándares normativos de referencia

🔎 **Dato de contexto** (fetch bloqueado por el proxy, pero fuentes canónicas conocidas):

- **W3C COGA — *Making Content Usable for People with Cognitive and Learning Disabilities*** (w3.org/TR/coga-usable): guía canónica que complementa WCAG con objetivos y patrones para personas con dificultades de memoria, atención y resolución de problemas, cubriendo explícitamente el **deterioro cognitivo asociado al envejecimiento y el DCL**.
- **WAI Cognitive Accessibility** (w3.org/WAI/cognitive): portal de accesibilidad cognitiva del W3C.

Estos son la referencia normativa citada en [04-diseño-ux](../04-diseno-ux-accesibilidad.md).

### Los 8 objetivos de COGA y patrones concretos (2ª ronda) ✅

✅ **Verificado (3-0)**: la guía COGA se estructura en **8 objetivos de diseño**, cada uno con **patrones comprobables**. Los directamente aplicables a adultos mayores con memoria afectada y baja alfabetización:

| Patrón COGA | Regla concreta | Aplicación en Cognos |
|---|---|---|
| **Objetivo 6 — "No depender de la memoria"** | Los procesos no deben exigir recordar información entre pasos | Autenticación sin contraseñas; no pedir recordar datos de una pantalla anterior; recordatorios visibles |
| **"Usar palabras claras" (o3p01)** | Preferir las **~1500 palabras más comunes**; vocabulario que la gente con dificultades severas de lenguaje reconoce | Lenguaje llano; glosario visible; *(nota: la lista de 1500 es para inglés; **construir equivalente en español**)* |
| **"Lenguaje literal" (o3p04)** | Términos concretos y ejemplos; **no usar metáforas ni símiles** salvo que se expliquen | Instrucciones directas ("Toque el botón verde"), sin lenguaje figurado |
| **"Tiempo y voz simples" (o3p02)** | **Presente y voz activa** — *"particularmente importante para personas con problemas de memoria"* | Toda instrucción en presente activo: "Escuche las tres palabras" |

> ✅ Cita textual COGA: el lenguaje simple *"permite a una persona con demencia en etapa temprana gestionar sus propios asuntos"*.
>
> ⚠️ **Matices** (el patrón de 1500 palabras tuvo voto dividido 2-1): los patrones COGA son **guía no normativa**; la lista de 1500 palabras es específica del léxico inglés (**no existe equivalente listo en español** — habría que construirlo o aproximarlo); y "dificultad severa de lenguaje" no es idéntico a "adulto mayor de baja alfabetización". Los principios transfieren al español, pero **requieren adaptación local** y validación con usuarios (§5.2).

**Acción**: derivar de estos 8 objetivos un **checklist de accesibilidad cognitiva en español** como criterio de aceptación de cada pantalla.

### Recursos de lenguaje llano y lectura fácil en español — cierre del vacío (3ª ronda) ✅

El equivalente español a las "~1500 palabras comunes" de COGA y las guías de redacción **sí existen** y son accionables:

| Recurso | Qué aporta | Uso en Cognos |
|---|---|---|
| **RAE — Listas de frecuencia CREA** (corpus.rae.es/lfrecuencias.html) | Listas oficiales de las **1.000 / 5.000 / 10.000 formas más frecuentes** del español. Las 1.000 más frecuentes ≈ 66% del uso | **Vocabulario base** para decidir qué palabras son "sencillas" al redactar |
| **rivaquiroga/frecuencias-crea** (GitHub, CSV) | La lista CREA en formato **legible por máquina** | Construir un **verificador automático de "palabra frecuente vs. rara"** en el CMS del portal |
| **Norma UNE 153101:2018 EX — Lectura Fácil** | Primera norma técnica mundial de Lectura Fácil: palabras sencillas, frases cortas, ortotipografía, diseño, e **incluye validación cognitiva con "validadores"** (personas con dificultades de comprensión) | **Referencia normativa central** para el texto en español; adoptar su fase de validación con usuarios reales |
| **Plena inclusión** (España) | Org. de referencia en Lectura Fácil: materiales, **formación de validadores**, metodología UNE 153101/153102 | Aliado potencial y fuente de método para validar contenidos |
| **Olga Carreras — resumen UNE 153101 × WCAG** | Traduce la norma a recomendaciones concretas de redacción y pantalla, cruzándola con COGA/WCAG | Guía práctica para el equipo de desarrollo |

> **Distinción clave** (Observatorio Nebrija): **"lenguaje claro"** (población general, base de la ISO 24495) ≠ **"lectura fácil"** (UNE 153101, personas con dificultades de comprensión, con validación cognitiva). **Decisión de diseño**: usar **lenguaje claro** en la capa informativa general del portal y **lectura fácil (UNE 153101)** en los textos que ve la persona con deterioro cognitivo o baja alfabetización (evaluación, instrucciones de ejercicios).
>
> **Acción**: integrar la lista CREA (vía el repo CSV) como validador de vocabulario en el CMS, y adoptar la UNE 153101 + validación con usuarios como criterio editorial de los contenidos de cara a la persona.

## 5.6 Conexión con la evidencia de eficacia

Recordatorio de [02-evidencia-científica](02-evidencia-cientifica.md): existe una **tendencia a mayor beneficio cognitivo con más gamificación** (📄). Esto se combina con el principio de diseño de **no infantilizar**: la gamificación para adultos mayores debe ser **motivadora y respetuosa** (progresión, logros, narrativa adulta), no estética infantil. El equilibrio entre "lúdico" y "digno" es una decisión de diseño a probar con usuarios reales (§5.2).
