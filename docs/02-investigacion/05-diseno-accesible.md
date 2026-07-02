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

Estos son la referencia normativa citada en [04-diseño-ux](../04-diseno-ux-accesibilidad.md). Recuperar el texto completo de COGA cuando el acceso lo permita, para derivar un checklist detallado.

## 5.6 Conexión con la evidencia de eficacia

Recordatorio de [02-evidencia-científica](02-evidencia-cientifica.md): existe una **tendencia a mayor beneficio cognitivo con más gamificación** (📄). Esto se combina con el principio de diseño de **no infantilizar**: la gamificación para adultos mayores debe ser **motivadora y respetuosa** (progresión, logros, narrativa adulta), no estética infantil. El equilibrio entre "lúdico" y "digno" es una decisión de diseño a probar con usuarios reales (§5.2).
