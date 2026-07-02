# Wireframes de accesibilidad (flujos clave)

> Pantallas descritas en baja fidelidad, con el criterio de accesibilidad aplicado a cada una. La regla transversal: **una tarea por pantalla**, texto grande, botón "Continuar" grande y fijo, "Volver" siempre en el mismo lugar, y **"🔊 Escuchar" siempre visible**. Referencias: [diseño UX](../04-diseno-ux-accesibilidad.md) y [COGA/UNE 153101 §5.5](../02-investigacion/05-diseno-accesible.md).

## Convenciones

- `[ Texto ]` = botón grande (≥44 px, alto contraste).
- Todo texto de cara a la persona es **lectura fácil** (UNE 153101) y valida contra la lista de vocabulario común (CREA).
- Cada pantalla con instrucción trae **texto + audio + ilustración**.

## Flujo A — Entrada sin contraseña (modo asistido)

```
┌───────────────────────────────────┐
│  Cognos                      🔊    │
│                                   │
│  Hola. ¿Quién va a usar el       │
│  portal hoy?                      │
│                                   │
│  [ Soy la persona ]               │
│  [ Soy quien acompaña ]           │
│                                   │
└───────────────────────────────────┘
        │ (elige "acompaña")
        ▼
┌───────────────────────────────────┐
│  ← Volver                    🔊    │
│  Le enviamos un código al        │
│  teléfono.                        │
│  Teléfono: [ __________ ]         │
│  [ Enviar código ]                │
└───────────────────────────────────┘
```
Criterio: **sin contraseñas** (WCAG 2.2 "Accessible Authentication"); código de un solo uso al teléfono del cuidador; nunca exigir recordar datos.

## Flujo B — Consentimiento informado

```
┌───────────────────────────────────┐
│  ← Volver                    🔊    │
│  Antes de empezar                 │
│                                   │
│  • Vamos a hacer unas preguntas  │
│    para conocer la memoria.       │
│  • Esto NO es un diagnóstico.     │
│  • Sus datos están protegidos.    │
│  • Puede parar cuando quiera.     │
│                                   │
│  [ Entiendo y acepto ]            │
│  [ Tengo dudas ]                  │
└───────────────────────────────────┘
```
Criterio: lectura fácil, frases cortas, sin jerga legal; consentimiento versionado (ver [modelo de datos](../05-modelo-datos.md)); "Tengo dudas" ofrece explicación en audio.

## Flujo C — Aplicación de un ítem (modo asistido)

```
┌───────────────────────────────────┐
│  ← Volver     Pregunta 3 de 10  🔊 │
│  ●●●○○○○○○○                        │
│                                   │
│   «Enunciado del ítem»            │
│   (texto grande)                  │
│   [ilustración]                   │
│                                   │
│  Respuesta:                       │
│  [  Opción A  ]                   │
│  [  Opción B  ]                   │
│                                   │
│           [ Continuar ]           │
└───────────────────────────────────┘
```
Criterio: indicador de progreso simple ("3 de 10"); una tarea; **sin límite de tiempo** (salvo que el instrumento lo exija, y entonces se avisa antes y se practica); guardado automático (no perder la sesión por un corte).

## Flujo D — Resultado (orientación, nunca diagnóstico)

```
┌───────────────────────────────────┐
│  Cognos                      🔊    │
│  Resultado de hoy                 │
│                                   │
│   🟢🟡🟠  (semáforo de banda)      │
│                                   │
│  «Mensaje de la banda, en         │
│   lenguaje amable y de acción»    │
│                                   │
│  [ Ver ejercicios sugeridos ]     │
│  [ Cómo buscar valoración ]       │
│  [ Guardar / imprimir informe ]   │
└───────────────────────────────────┘
```
Criterio: **sin puntajes crudos** de cara a la persona (solo banda/semáforo); **cero términos diagnósticos**; toda banda ofrece acción concreta; el PDF de 1–2 páginas es para llevar al profesional.

## Flujo E — Sesión de ejercicio (offline)

```
┌───────────────────────────────────┐
│  ← Salir            ⭐ Nivel 2  🔊 │
│                                   │
│   «Consigna del ejercicio»        │
│   [zona de actividad: toque]      │
│                                   │
│   (sin cronómetro visible)        │
│           [ Listo ]               │
└───────────────────────────────────┘
```
Criterio: funciona **sin conexión** y sincroniza después; sin castigo por error; entrada por toque o voz; dificultad sube/baja según desempeño sin anunciarlo de forma punitiva.

## Flujo F — Tablero del cuidador/profesional (densidad permitida aquí)

```
┌─────────────────────────────────────────────┐
│  Persona: (alias)          [ Exportar PDF ]  │
│                                             │
│  Tendencia por dominio (últimos 6 meses)    │
│   Memoria    ▁▂▃▃▄▄  ── banda: observar     │
│   Atención   ▃▃▄▄▄▅  ── banda: sin alerta   │
│                                             │
│  Adherencia: 3 sesiones/semana              │
│                                             │
│  Observaciones del cuidador:                │
│   • Sueño: 🙂  Ánimo: 😐  Autonomía: 🙂      │
│   • "Esta semana durmió mal…" (texto libre) │
└─────────────────────────────────────────────┘
```
Criterio: **dos experiencias diferenciadas** — esta es densa y técnica (para cuidador/profesional), a diferencia de las pantallas de la persona. Muestra **tendencia + banda, no decimales**; combina lo cuantitativo con lo cualitativo estructurado; exporta el informe para consulta.

## Checklist de aceptación por pantalla (derivado de COGA + UNE 153101)

- [ ] Una sola tarea principal visible.
- [ ] Texto ≥ 18–20 px equivalente, alto contraste.
- [ ] Instrucción en texto + audio + ilustración; botón "🔊 Escuchar" visible.
- [ ] Objetivos táctiles ≥ 44×44 px; sin gesto complejo obligatorio.
- [ ] Sin límite de tiempo (o avisado y practicado).
- [ ] "Volver"/"Continuar" en posición consistente.
- [ ] Sin exigir recordar información de pantallas anteriores.
- [ ] Vocabulario validado contra lista CREA; sin metáforas sin explicar; presente/voz activa.
- [ ] Sin términos diagnósticos de cara a la persona.
- [ ] Guardado automático; tolera corte de red.
