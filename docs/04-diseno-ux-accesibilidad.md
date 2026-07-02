# 04 — Diseño, UX y accesibilidad

> El usuario objetivo puede tener 75 años, visión reducida, temblor, poca experiencia digital, un teléfono de gama baja y datos móviles limitados — y además deterioro cognitivo. La accesibilidad no es una capa: es el diseño.

## Estándares de referencia

- **WCAG 2.2 nivel AA** como piso, con especial atención a los criterios nuevos de 2.2 orientados a accesibilidad cognitiva (p. ej. autenticación accesible, ayuda consistente, entradas redundantes).
- **W3C COGA** (*Making Content Usable for People with Cognitive and Learning Disabilities*) como guía principal de contenido y flujo.
- Lectura fácil / lenguaje llano en español para todos los textos de cara al usuario.

## Principios de diseño

1. **Una sola tarea por pantalla.** Nada de dashboards densos para la persona evaluada; los tableros ricos son para cuidadores y profesionales.
2. **Texto grande por defecto** (mínimo 18–20 px equivalente), contraste alto, objetivos táctiles ≥ 44×44 px, sin gestos complejos (nada de arrastrar como único método).
3. **Sin límites de tiempo en la interfaz** salvo cuando el instrumento clínico lo exige — y en ese caso se explica antes y se practica con un ensayo.
4. **Instrucciones multimodales**: texto + audio grabado + ilustración. Botón "escuchar de nuevo" siempre visible.
5. **Sin castigo por error**: mensajes amables, reintentos, guardado automático de progreso. Perder una sesión por un corte de red o un toque equivocado es inaceptable.
6. **Navegación lineal y consistente**: botón grande "Continuar", botón "Volver" siempre en el mismo lugar, indicador de progreso simple ("pregunta 3 de 10").
7. **Autenticación sin memoria**: entrar con enlace/código enviado al teléfono del cuidador o de la persona; nunca exigir recordar contraseñas (criterio WCAG 2.2 "Accessible Authentication").
8. **Modo asistido de primera clase**: la interfaz cambia de voz ("¿La persona recordó las palabras?") cuando quien opera es el cuidador o agente comunitario.

## Dos experiencias diferenciadas

| | Persona evaluada | Cuidador / profesional |
|---|---|---|
| Densidad | Mínima, una tarea a la vez | Tableros, listas, comparativas |
| Tipografía | Muy grande | Normal-grande |
| Lenguaje | Lectura fácil, segunda persona | Técnico moderado |
| Tablero | "Tu progreso" simplificado (estrellas/rachas, sin puntajes clínicos crudos) | Series de tiempo, bandas de resultado, notas cualitativas, export PDF |

## El tablero de progreso

**Cuantitativo**: evolución por dominio cognitivo (líneas de tiempo con las bandas del instrumento), adherencia (sesiones/semana), desempeño en ejercicios (aciertos, nivel de dificultad alcanzado). Regla de visualización: mostrar tendencia y banda, no decimales — evitar la sobreinterpretación de fluctuaciones normales.

**Cualitativo**: registro estructurado del cuidador con escalas simples (p. ej. "esta semana, ¿cómo estuvo su ánimo / sueño / autonomía en casa?" con 3–5 niveles ilustrados) + campo de texto libre. Estas observaciones acompañan cada punto de la curva cuantitativa: el contexto explica los datos (una mala semana de sueño explica un mal puntaje).

**Reporte para consulta**: un PDF de 1–2 páginas pensado para que el médico lo lea en 60 segundos: instrumento, versión, fechas, puntajes con sus cortes, tendencia y observaciones destacadas.

## Contenido y tono

- Nunca alarmar: los resultados se comunican con orientación a la acción ("estos resultados sugieren que vale la pena una valoración con un profesional; aquí te explicamos cómo") y nunca con etiquetas diagnósticas ("demencia", "Alzheimer").
- Español neutro latinoamericano; términos locales configurables por despliegue/país.
- Ilustraciones cálidas y adultas (no infantilizar), representativas de la población objetivo.

## Rendimiento como accesibilidad

- Presupuesto de página: < 200 KB JS inicial, imágenes optimizadas, audio comprimido.
- PWA instalable con los ejercicios del plan descargados por adelantado (sesión funciona offline y sincroniza después).
- Objetivo: usable en Android de gama baja con 3G.
