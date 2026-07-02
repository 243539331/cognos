# 4 — Regulación, ética y privacidad de datos

> Tres frentes: (a) **no ser un dispositivo médico** por diseño, (b) tratar los **datos cognitivos como datos sensibles de salud**, y (c) asumir los **riesgos éticos** de detectar deterioro a escala en población vulnerable.

## 4.1 Software como dispositivo médico (SaMD): cómo quedar fuera

La línea que separa "bienestar" de "dispositivo médico" depende de las **afirmaciones (claims)** que hace el producto.

### Estados Unidos — FDA (marco de referencia internacional)

📄 **Fuente citada** — actualización FDA de enero 2026 (Ropes & Gray, ene-2026):

- El **6 de enero de 2026** la FDA publicó guías finales revisadas sobre **Clinical Decision Support Software** y sobre la **General Wellness Policy for Low Risk Devices**, reemplazando las anteriores.
- La guía revisada de **bienestar general amplía** la categoría de productos que la FDA considera de "bienestar"; **esos productos pueden comercializarse sin supervisión previa (premarket) de la FDA**.
  > *"Products falling within the scope of this policy can be marketed without FDA oversight."*
- La guía de CDS revisada flexibiliza el trato del software que da **puntajes/probabilidades de riesgo** (elimina lenguaje previo que los excluía de "no-dispositivo").
- Contexto: el comisionado enmarcó los cambios como **desregulación pro-innovación** en salud digital de bajo riesgo (early 2026).

**Implicación**: en el marco de referencia (EE. UU.), un portal de **bienestar cognitivo no diagnóstico** (claims de "agudeza mental", ejercicio cognitivo) **puede quedar fuera** de la regulación de dispositivos — *si evita claims de enfermedad/diagnóstico*. El caso **Sincrolab** (ver [plataformas](03-plataformas-existentes.md)) muestra el otro lado: reclamar tratar una enfermedad → **dispositivo médico Clase IIa** con marcado CE y distribución mediada por profesionales.

> Nota: la FDA es referencia, no la jurisdicción de despliegue. Para Latinoamérica hay que revisar la agencia local (🔎 en México, la **COFEPRIS** regula software y aplicaciones médicas; verificar INVIMA en Colombia, ANMAT en Argentina, etc. según país de despliegue).

### Regla práctica de "diseño para no-dispositivo"

1. **Lenguaje**: "tamizaje", "orientación", "perfil cognitivo", "estimulación", "bienestar". Nunca "diagnóstico", "tratamiento", "cura".
2. **Función**: el sistema **no decide ni prescribe**; entrega información y **deriva** al profesional. La decisión clínica siempre es humana.
3. **Transparencia**: el usuario/profesional puede ver en qué se basa el resultado (qué instrumento, qué corte) — coherente con CDS transparente.
4. **Revisión legal por jurisdicción** antes de operar en cada país.

## 4.2 Privacidad — los datos cognitivos son datos sensibles de salud

Ejemplo trabajado: **Colombia** (Ley 1581 de 2012) — 📄 **fuente citada** (DLA Piper):

- La **Ley Estatutaria 1581 de 2012** regula todo tratamiento de datos personales y bases de datos.
- Los **datos de salud son "datos sensibles"** (junto con vida sexual y biométricos). ⇒ **los resultados de evaluación cognitiva son datos sensibles**.
- Tratar datos sensibles exige **consentimiento previo y expreso** (Decreto 1377 de 2013, art. 6); **el silencio no es consentimiento válido** para datos sensibles.
- **Registro Nacional de Bases de Datos (RNBD)**: obligatorio solo para responsables con activos > 100.000 UVT (~USD 1,5 M) ⇒ **una ONG pequeña estaría probablemente exenta del registro**, aunque sigue sujeta a la ley.
- Autoridad: **SIC**. Notificación de brechas en **≤ 15 días hábiles**; multas hasta ~USD 534.000.

**Implicaciones de diseño** (ya reflejadas en [05-modelo-datos](../05-modelo-datos.md)):

| Requisito legal | Decisión técnica |
|---|---|
| Consentimiento previo y expreso para datos sensibles | Consentimiento informado **versionado**, explícito, registrado, con opción de revocar |
| Datos de salud = sensibles | Cifrado, seudonimización por defecto, mínima recolección |
| Notificación de brechas en plazo | Registro de auditoría + procedimiento de respuesta a incidentes documentado |
| Derecho del titular | Acceso, rectificación y **borrado real** implementados |

> Para cada país de despliegue se debe repetir este análisis (marco general de protección de datos + estatuto de datos de salud). El patrón de diseño (consentimiento expreso versionado + datos sensibles cifrados + mínima recolección) es conservador y sirve de base común.

## 4.3 Riesgos éticos de detectar deterioro a escala ⚠️

📄 **Fuente citada, verificación interrumpida** (revisión ética; PMC10909482):

- La detección temprana de demencia desplegada a escala vía tecnologías digitales **no cumple los estándares aceptados de un programa de tamizaje poblacional**.
- Las tecnologías actuales **no son a la vez mínimamente invasivas y muy precisas** (hay que ceder en algo).
- **Escalar la detección digital puede agravar las desigualdades en salud** por **sesgo en los datos de entrenamiento** y **desigualdad en el acceso digital** — riesgo directo para poblaciones vulnerables (¡nuestra población!).
- Un **positivo temprano no predice de forma fiable** la progresión a demencia, y la aceptabilidad social de la detección temprana no está establecida ⇒ **cualquier despliegue debe financiar el seguimiento y el acompañamiento** de las personas señaladas por el sistema.

**Implicaciones (mitigaciones incorporadas al plan)**:

1. **No presentar Cognos como "programa de tamizaje poblacional".** Es una herramienta de apoyo individual, iniciada por la persona/cuidador/profesional, no un cribado masivo.
2. **Todo resultado de "zona de atención" viene con una vía de derivación concreta y acompañamiento**, no con una etiqueta y nada más. Coordinar con la organización comunitaria aliada (ver [hoja de ruta](../06-hoja-de-ruta.md)).
3. **Vigilar el sesgo**: los puntos de corte deben estar validados para la población (edad, escolaridad, idioma) que realmente usa el portal; documentar limitaciones.
4. **No prometer predicción.** El lenguaje de resultados evita sugerir que un resultado "predice" demencia.
5. **La brecha digital es parte del problema que atacamos**: por eso el modo asistido, la versión imprimible (lección NeuronUP) y el diseño para gama baja/3G son requisitos, no adornos.

## 4.4 Checklist ético-regulatorio para Fase 0

- [ ] Definir jurisdicción(es) de despliegue y revisar su marco de datos de salud + regulación de software médico.
- [ ] Redactar consentimiento informado versionado (lenguaje llano) revisado por asesoría legal y clínica.
- [ ] Documentar la política de "no-dispositivo": lista de claims permitidos y prohibidos.
- [ ] Definir la **vía de derivación** con la organización aliada (¿a dónde va una persona en "zona de atención"?).
- [ ] Validar puntos de corte por edad/escolaridad/idioma con el asesor clínico.
- [ ] Procedimiento de respuesta a brechas de datos.
