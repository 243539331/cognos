# 1 — Instrumentos de evaluación y sus licencias

> **Este es el hallazgo más decisivo de toda la investigación.** La elección de instrumento de tamizaje está condicionada por su licencia tanto como por su calidad psicométrica. Elegir mal aquí puede exponer al proyecto a costos por copia o a acciones legales por infracción de copyright.

## 1.1 El panorama de licencias (por qué esto importa tanto)

### MMSE — protegido por copyright, con cobro por copia ⚠️

📄 **Fuente citada** — *Monetizing the MMSE* (Newman & Feldman, análogo a la revisión de derecho de Stanford; PMC4160306):

- El MMSE se publicó en 1975, pero su copyright **no se hizo valer hasta ~2000-2001**, cuando los derechos pasaron a MiniMental LLC y se licenciaron **en exclusiva a Psychological Assessment Resources (PAR)**.
  > *"the MMSE was first published in 1975, and copyright was not asserted until the copyright was transferred twenty-five years later"*
- La aplicación del copyright impuso un **cobro por copia** (citado como ~US$1.36/copia; otras fuentes ~$1.23). Cada uso de la forma oficial conlleva un cargo.
  > *"The decision to enforce copyright on the MMSE and the imposition of a US$1.36 per copy charge has created a significant change in the landscape"*
- Copiar o distribuir el MMSE **expone a clínicos y desarrolladores a riesgo legal por infracción**.
- **Precedente crítico**: el *Sweet 16* (una prueba gratuita alternativa) fue **retirado permanentemente de internet en diciembre de 2011** tras alegar PAR que era una obra derivada que infringía el copyright del MMSE.
  > *"in December 2011, developers of the Sweet 16 permanently removed the cognitive impairment examination from the Internet"*
- Los autores recomiendan que los tests médicos se liberen a **dominio público / licencia abierta** para garantizar su disponibilidad.

**Implicación para Cognos**: **no digitalizar el MMSE** salvo licencia escrita con PAR. El precedente Sweet 16 muestra que incluso una versión derivada gratuita puede ser forzada a salir de línea.

### MoCA — se volvió propietario en 2019 ⚠️

🔎 **Dato de contexto** — comentario revisado por pares *"Monetizing the MoCA: What Now?"* (Borson et al., *Journal of the American Geriatrics Society*, 2019):

- Desde **septiembre de 2019** el MoCA exige **entrenamiento y certificación de pago** (~US$125, recertificación cada 2 años) gestionados por MoCA Test Inc.

**Implicación para Cognos**: el MoCA tiene excelente validación en español (🔎 varias validaciones en población española, sobre todo para DCL y demencias), **pero su modelo de certificación obligatoria de pago lo hace poco viable para un despliegue masivo gratuito y autoadministrado**. Reconsiderar solo si se consigue un acuerdo institucional que cubra la certificación de los operadores.

### Mini-Cog — el candidato más abierto y robusto ✅

El Mini-Cog (recuerdo de 3 palabras + test del reloj) combina tres ventajas decisivas para nuestra población:

- ✅ **Verificado (3-0)**: mostró **mayor precisión global de tamizaje que el MMSE (83% vs. 81%) incluso en personas con muy baja escolaridad**, con menor tiempo de aplicación — aunque conserva limitaciones ligadas al bajo nivel educativo.
  > *"the Mini-Cog showed greater screening accuracy than the MMSE (83% vs 81%), even in individuals with very low levels of schooling... also present limitations related to patients' low educational levels."*
  Fuente: revisión de versiones en español (PubMed 29753565).
- ✅ **Verificado (3-0)**: existen **versiones validadas en español** del Mini-Cog, el Test del Reloj y el MMSE, con datos psicométricos publicados.
- 🔎 El Mini-Cog se distribuye para uso clínico/educativo/investigación sin cargo por copia en su sitio oficial (mini-cog.com) — **confirmar los términos exactos por escrito** antes de digitalizar.

> ❌ **Refutado (1-2)**: la afirmación de que el Mini-Cog en español supera al MMSE con "99% sensibilidad y 93% especificidad vs. 91%/92%" para demencia moderada **no se sostuvo** en la verificación (probablemente cifra de un estudio puntual sobre-generalizada). No usar esas cifras.

## 1.2 La base de evidencia en español es delgada (advertencia)

📄 **Fuente citada** (PubMed 29753565): de una búsqueda en Medline desde 1953 con 262 estudios de MMSE, 46 del Test del Reloj y 30 del Mini-Cog, **solo 9, 5 y 4 respectivamente** eran validaciones en español que reportaran confiabilidad, validez, sensibilidad y especificidad.

**Implicación**: hay menos evidencia en español de la que parece. Conviene apoyarse en la asesoría clínica local para elegir puntos de corte por edad y escolaridad, y documentar qué versión validada exacta se implementa.

## 1.3 "Tamizaje, no diagnóstico" — respaldado por la propia literatura ✅/📄

📄 **Fuente citada** (PubMed 29753565): la revisión posiciona estas tres pruebas como **apoyo para profesionales de atención primaria / primer nivel**, no como instrumentos diagnósticos, y subraya que *"la detección oportuna es crucial para el pronóstico de las personas que viven con deterioro cognitivo leve o demencia"*.

Esto confirma la **regla de oro** del proyecto (ver [01-vision-y-alcance](../01-vision-y-alcance.md)): el portal hace tamizaje y orientación, y deriva a valoración profesional.

## 1.4 Recomendación de instrumentos (para validar con asesoría clínica)

| Prioridad | Instrumento | Estado de licencia | Por qué |
|---|---|---|---|
| **1 (arranque)** | **Mini-Cog** | Aparentemente abierto — *confirmar por escrito* | Rápido, robusto en baja escolaridad, validado en español, sin cobro por copia conocido |
| 1 (complemento) | **Test del Reloj (CDT)** | Dominio público en la mayoría de variantes — *confirmar variante* | Parte del Mini-Cog; buena sensibilidad visuoespacial/ejecutiva |
| 2 (evaluar) | Instrumentos de **dominio público** diseñados abiertos | Abierto | Evita todo el problema de copyright; explorar alternativas open-source |
| 3 (solo con acuerdo) | MoCA | Certificación de pago obligatoria | Excelente en español pero difícil de escalar gratis |
| **Evitar** | MMSE (forma oficial) | Copyright, cobro por copia, riesgo legal | Precedente Sweet 16 |

**Acción de Fase 0** (ver [hoja de ruta](../06-hoja-de-ruta.md)): obtener **por escrito** los términos de licencia del Mini-Cog y del Test del Reloj en la variante que se piense usar, y validar puntos de corte con el asesor clínico.

## 1.5 Diseño técnico derivado

Esto refuerza la decisión de arquitectura de tratar cada instrumento como **dato declarativo versionado con metadatos de licencia** (ver [03-arquitectura](../03-arquitectura.md) §"Definición declarativa de instrumentos"): cada definición lleva un bloque `licencia: {tipo, verificada_por, fecha, url}` que **bloquea la publicación** de un instrumento sin licencia verificada.
