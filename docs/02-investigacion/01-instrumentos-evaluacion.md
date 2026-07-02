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

### Mini-Cog — usable por una ONG (licencia confirmada) ✅

El Mini-Cog (recuerdo de 3 palabras + test del reloj) combina ventajas decisivas para nuestra población:

- ✅ **Verificado (3-0)**: mostró **mayor precisión global de tamizaje que el MMSE (83% vs. 81%) incluso en personas con muy baja escolaridad**, con menor tiempo de aplicación — aunque conserva limitaciones ligadas al bajo nivel educativo.
  > *"the Mini-Cog showed greater screening accuracy than the MMSE (83% vs 81%), even in individuals with very low levels of schooling... also present limitations related to patients' low educational levels."*
  Fuente: revisión de versiones en español (PubMed 29753565).
- ✅ **Verificado (3-0)**: existen **versiones validadas en español** del Mini-Cog, el Test del Reloj y el MMSE, con datos psicométricos publicados.

**Licencia — resuelto en la 2ª ronda** (fuente oficial mini-cog.com; snippets de búsqueda, fetch directo bloqueado por el proxy). El Mini-Cog© (titular: S. Borson) distingue:

- **Uso NO comercial** (universidades, fundaciones, profesionales de salud, hospitales, clínicas, institutos de salud pública): *"may use, reproduce and distribute Mini-Cog without permission or a licensing agreement"*, y el test *"should always be made available free of charge for clinical and educational use"*. **Una ONG sin ánimo de lucro encaja aquí.**
- **Uso comercial** (empresas, farma): requiere permiso escrito y acuerdo de licencia.
- **Condición clave**: **no modificar** el instrumento (palabras de recuerdo, puntuación, reloj) sin permiso del autor, y **conservar la leyenda de copyright**: *"Mini-Cog© S. Borson. All rights reserved. Reprinted with permission of the author solely for clinical and educational purposes. May not be modified or used for commercial, marketing, or research purposes without permission (soob@uw.edu)."* Existe **versión estandarizada en español** para reproducción fiel.
- **Precedente**: la Alzheimer's Association reproduce y distribuye el Mini-Cog gratuitamente conservando la atribución — confirma la vía no comercial.
- Sobre el **Test del Reloj embebido**: el CDT como técnica clínica es de dominio público (aunque algunos *sistemas de puntuación*, p. ej. Shulman/Sunderland, sí están protegidos); el reloj **dentro** del Mini-Cog se rige por las condiciones no comerciales anteriores.

**Acción**: aunque no es obligatorio para uso no comercial, conviene **enviar el formulario de contacto (soob@uw.edu) dejando constancia escrita** del uso digital no comercial, sin modificación y gratuito — despeja dudas sobre la integración en web/app.

> ❌ **Refutado (1-2)**: la afirmación de que el Mini-Cog en español supera al MMSE con "99% sensibilidad y 93% especificidad vs. 91%/92%" para demencia moderada **no se sostuvo** en la verificación (probablemente cifra de un estudio puntual sobre-generalizada). No usar esas cifras.

## 1.2 La base de evidencia en español es delgada (advertencia)

📄 **Fuente citada** (PubMed 29753565): de una búsqueda en Medline desde 1953 con 262 estudios de MMSE, 46 del Test del Reloj y 30 del Mini-Cog, **solo 9, 5 y 4 respectivamente** eran validaciones en español que reportaran confiabilidad, validez, sensibilidad y especificidad.

**Implicación**: hay menos evidencia en español de la que parece. Conviene apoyarse en la asesoría clínica local para elegir puntos de corte por edad y escolaridad, y documentar qué versión validada exacta se implementa.

## 1.3 "Tamizaje, no diagnóstico" — respaldado por la propia literatura ✅/📄

📄 **Fuente citada** (PubMed 29753565): la revisión posiciona estas tres pruebas como **apoyo para profesionales de atención primaria / primer nivel**, no como instrumentos diagnósticos, y subraya que *"la detección oportuna es crucial para el pronóstico de las personas que viven con deterioro cognitivo leve o demencia"*.

Esto confirma la **regla de oro** del proyecto (ver [01-vision-y-alcance](../01-vision-y-alcance.md)): el portal hace tamizaje y orientación, y deriva a valoración profesional.

## 1.4 Instrumentos en español de acceso libre — alternativas al MMSE/MoCA ✅

La 2ª ronda de investigación confirmó un **conjunto de instrumentos breves validados en español**, varios **aptos para baja alfabetización**, que evitan el problema de copyright del MMSE/MoCA:

| Instrumento | Utilidad diagnóstica (AUC) | Rasgo clave | Fuente |
|---|---|---|---|
| **Fototest** | 0,87 (aROC poblacional 0,851; **0,875 con AD8**) ✅ | **Aplicable a analfabetos**; muy rápido (~2,8 min); no depende de lectoescritura | Neurología 2019 (S0213485319300866) y 2022 (S0213485322000858) |
| **Eurotest** | 0,91 | Basado en el manejo de monedas (independiente de escolaridad) | Neurología 2019 |
| **T@M** (Test de Alteración de Memoria) | 0,90 | Sensible a memoria episódica (útil en DCL amnésico) | Neurología 2019/2022 |
| **AD8** (cuestionario al informador) | — (mejora la precisión combinado) ✅ | Lo responde el **cuidador**; encaja con el modo asistido | Neurología 2022 |
| **GPCOG** | — | **Gratuito** para clínicos e investigadores, traducido al español; diseñado para atención primaria (paciente + informador) | Wikipedia/GPCOG (confirmar fuente primaria) |
| Pfeiffer / SPMSQ, MIS | — | Otras opciones breves de dominio público en español | Neurología 2019; revisión UB (open access) |

✅ **Verificado (3-0)** (estudio poblacional y de validación, Neurología 2022, PMID 35963538): puntos de corte actualizados y más sensibles — **AD8 ≥ 1, Fototest ≤ 35, T@M ≤ 40, MMSE ≤ 26** — sobre muestra poblacional (n=260) + validación (n=177). **El Fototest tuvo la mejor utilidad poblacional (aROC 0,851), que sube a 0,875 combinado con el AD8** (p<0,05).

> **Hallazgo de diseño**: para población vulnerable y de baja alfabetización, **el Fototest (solo o con AD8) tiene el mejor perfil clínico de arranque**, porque es independiente de la lectoescritura y está pensado para el contexto hispano de atención primaria. El AD8, al responderlo el cuidador, encaja de forma natural con el **modo asistido** del portal.

### Copyright de cada instrumento — resuelto en la 3ª ronda ⚠️

**Corrección importante: ninguno de estos instrumentos es de dominio público.** Todos permiten uso clínico no comercial, pero **digitalizarlos en una plataforma requiere permiso escrito del autor** en casi todos los casos.

| Instrumento | Titular | Licencia / condición | ¿Digitalizable por la ONG? |
|---|---|---|---|
| **Fototest** | Cristóbal Carnero-Pardo (fototest.es) | **CC BY-NC-ND** (No comercial, **SinObraDerivada**) | No comercial ✅, pero la cláusula **ND es problemática**: una versión web interactiva puede ser "obra derivada" → **pedir permiso expreso al autor** |
| **Eurotest** | Carnero-Pardo (**EUROTEST®**, marca registrada) | Creative Commons, uso clínico/investigación no comercial | Igual que Fototest → **permiso del autor** |
| **AD8** | Alzheimer's Disease Research Center, Washington University (Galvin et al., © 2005) | Uso y reproducción **sin modificar** para atención clínica e investigación **no comercial**; otro uso requiere permiso escrito (morrisj@abraxas.wustl.edu). Traducción ES reproducida con permiso por Carnero-Pardo/SEN | Permitido no comercial sin modificar ✅ — **confirmar por escrito** el uso digital |
| **T@M** | Lorena Rami (copyright registrado B-5483-04) | Uso clínico permitido; **no comercial ni investigación** sin permiso de la autora | **Pedir permiso** a la autora para digitalizar |
| **GPCOG** | J. Brodaty et al. | **Gratuito** para clínicos e investigadores, descarga libre, traducido al español | **La opción más libre** — verificar términos de la web oficial |
| **Mini-Cog** | S. Borson | Uso no comercial libre, sin modificar, con atribución (ver §1.1) | ✅ (ya confirmado) |

> **Implicación**: el "uso libre" clínico que promueven los autores **no equivale a licencia para digitalizar/redistribuir**. La acción de Fase 0 es **escribir a Carnero-Pardo (Fototest/Eurotest), a Washington University (AD8) y a L. Rami (T@M)** solicitando permiso de reproducción digital no comercial. Como los tres primeros comparten autor español (Carnero-Pardo), una sola gestión cubre Fototest + Eurotest. **El GPCOG y el Mini-Cog son las vías con menor fricción legal** si esas gestiones se demoran.

## 1.5 Recomendación de instrumentos (para validar con asesoría clínica)

| Prioridad | Instrumento | Estado de licencia | Por qué |
|---|---|---|---|
| **1 (arranque, baja alfabetización)** | **Fototest** (+ **AD8** al cuidador) | Validado en español; *confirmar copyright con autores* | Independiente de lectoescritura, rápido, mejor utilidad poblacional; AD8 encaja con modo asistido |
| **1 (alternativa robusta)** | **Mini-Cog** (+ Test del Reloj) | ✅ **Libre para uso no comercial** (sin modificar, con atribución) | Licencia confirmada favorable; validado en español; robusto en baja escolaridad |
| 2 (evaluar) | **GPCOG**, Eurotest, T@M, Pfeiffer/SPMSQ, MIS | Gratuito (GPCOG) / dominio público en español — *confirmar* | Amplían la batería; independientes de escolaridad varios |
| 3 (solo con acuerdo) | MoCA | Certificación de pago obligatoria | Excelente en español pero difícil de escalar gratis |
| **Evitar** | MMSE (forma oficial) | Copyright, cobro por copia, riesgo legal | Precedente Sweet 16 |

**Acción de Fase 0** (ver [hoja de ruta](../06-hoja-de-ruta.md)): confirmar por escrito el copyright de **Fototest + AD8** con sus autores; dejar constancia del uso no comercial del **Mini-Cog**; validar puntos de corte por edad/escolaridad con el asesor clínico.

## 1.6 Diseño técnico derivado

Esto refuerza la decisión de arquitectura de tratar cada instrumento como **dato declarativo versionado con metadatos de licencia** (ver [03-arquitectura](../03-arquitectura.md) §"Definición declarativa de instrumentos"): cada definición lleva un bloque `licencia: {tipo, verificada_por, fecha, url}` que **bloquea la publicación** de un instrumento sin licencia verificada.
