# 03 — Arquitectura propuesta

> Estado: **borrador para discusión**. Las decisiones marcadas 🔓 quedan abiertas hasta validar con el equipo y con los hallazgos de la investigación.

## Principios arquitectónicos

1. **Simplicidad operativa**: una organización sin ánimo de lucro con voluntarios no puede operar microservicios. Se propone un **monolito modular** desplegable en una sola instancia.
2. **Costo ≈ 0**: todo el stack debe poder correr en niveles gratuitos o en créditos donados para ONG (Google for Nonprofits, Microsoft/Azure for Nonprofits, AWS Nonprofit Credit Program, Cloudflare Project Galileo).
3. **Frontend ligero y tolerante a fallos de red**: PWA con almacenamiento local para que una sesión de ejercicios no se pierda si se corta la conexión.
4. **Los datos sensibles se minimizan**: se puede usar el portal de forma seudónima; los datos identificables son opcionales y cifrados.
5. **Contenido desacoplado del código**: instrumentos y ejercicios se definen como **datos versionados** (JSON/YAML validado por esquema), no como código, para que profesionales de salud puedan revisarlos y auditarlos.

## Vista de módulos (monolito modular)

```
┌──────────────────────────────────────────────────────────┐
│                        PWA (frontend)                     │
│  evaluación · ejercicios · tablero · gestión · consentim. │
└──────────────▲───────────────────────────▲───────────────┘
               │ HTTPS/JSON                │ assets estáticos (CDN)
┌──────────────┴───────────────────────────┴───────────────┐
│                     Aplicación (backend)                  │
│ ┌───────────┐ ┌───────────┐ ┌────────────┐ ┌───────────┐ │
│ │ Identidad │ │ Evaluación│ │ Estimulac. │ │ Progreso  │ │
│ │ y víncu-  │ │ (motor de │ │ (planes y  │ │ (métricas │ │
│ │ los/roles │ │ instrum.) │ │ sesiones)  │ │ y reporte)│ │
│ └───────────┘ └───────────┘ └────────────┘ └───────────┘ │
│ ┌───────────────────────┐ ┌─────────────────────────────┐│
│ │ Consentimiento y      │ │ Catálogo de contenidos      ││
│ │ auditoría             │ │ (instrumentos y ejercicios) ││
│ └───────────────────────┘ └─────────────────────────────┘│
└──────────────────────────┬───────────────────────────────┘
                           │
                  ┌────────┴────────┐
                  │   PostgreSQL    │  (+ backups automáticos)
                  └─────────────────┘
```

### Módulos

| Módulo | Responsabilidad clave |
|---|---|
| **Identidad y vínculos** | Cuentas, roles (persona/cuidador/profesional/admin), vínculos con permisos explícitos (un cuidador solo ve a quien lo autorizó) |
| **Motor de instrumentos** | Interpreta definiciones declarativas de instrumentos (ítems, flujos, temporizadores, reglas de puntuación y puntos de corte por edad/escolaridad), garantiza versión inmutable por aplicación |
| **Estimulación** | Biblioteca de ejercicios declarativos por dominio/dificultad, planes personalizados, dificultad adaptativa simple (subir/bajar nivel según desempeño) |
| **Progreso** | Series de tiempo de puntajes y sesiones, registro cualitativo estructurado, generación de reportes PDF para llevar a consulta |
| **Consentimiento y auditoría** | Consentimiento informado versionado, registro de accesos a datos de terceros, derecho al olvido |
| **Catálogo** | CRUD de contenidos con flujo de revisión (borrador → revisado por profesional → publicado) |

## Stack propuesto 🔓

| Capa | Propuesta | Justificación |
|---|---|---|
| Frontend + backend | **Next.js (React + TypeScript)** en un solo repositorio | Un solo lenguaje para voluntarios, SSR para primeras cargas rápidas en gama baja, PWA madura |
| Alternativa | Django + HTMX | Menos JavaScript, excelente para formularios; menos apto para ejercicios interactivos con temporizadores |
| Base de datos | **PostgreSQL** | Estándar, JSONB para respuestas de instrumentos, fácil de respaldar |
| ORM / esquema | Prisma o Drizzle | Migraciones versionadas |
| Autenticación | Auth.js o Lucia (correo/teléfono + OTP; sin contraseñas complejas) | Adultos mayores: las contraseñas son la primera barrera |
| Hosting | Vercel/Netlify (frontend) + Fly.io/Railway/Supabase (API+DB), o crédito de nube para ONG | Nivel gratuito suficiente para pilotos |
| CDN / protección | Cloudflare (Project Galileo, gratuito para ONG) | Latencia y seguridad sin costo |
| Analítica | Plausible/Umami autoalojado (sin cookies de terceros) | Privacidad; métricas de adherencia para patrocinadores |
| Reportes PDF | Generación en servidor (weasyprint/puppeteer) | Reporte imprimible para llevar al médico |

**Decisión pendiente 🔓**: Next.js full-stack vs. Django+HTMX. Criterio de decisión: ¿cuánta interactividad exigen los ejercicios (canvas, temporizadores precisos, arrastrar y soltar)? Si es alta → Next.js. La medición de tiempos de reacción con precisión clínica en web tiene límites conocidos; ver investigación.

## Definición declarativa de instrumentos (clave del diseño)

Cada instrumento (p. ej. un tamizaje tipo Mini-Cog, si su licencia lo permite) se define como datos:

```yaml
instrumento: ejemplo-tamizaje
version: 1.0.0            # inmutable una vez publicado
licencia: {tipo: "...", verificada_por: "...", fecha: "..."}
modo: [autoadministrado, asistido]
items:
  - id: recuerdo-3-palabras
    tipo: registro-verbal        # el asistente marca cuántas recordó
    dominio: memoria
    ...
puntuacion:
  reglas: [...]
  cortes:
    - {escolaridad: "<4 años", punto_corte: ...}
resultado:
  bandas: [sin-alerta, zona-de-atencion, derivar-a-valoracion]
```

Ventajas: auditoría clínica de contenidos sin leer código, versionado inmutable (cada evaluación guarda con qué versión se aplicó — esencial para comparar en el tiempo), y traducción/adaptación cultural como datos.

## Seguridad y privacidad (resumen técnico)

- Cifrado en tránsito (TLS) y en reposo; campos identificables cifrados a nivel de aplicación.
- Seudonimización por defecto: el sistema funciona con alias; nombre real y contacto son opcionales.
- Separación estricta de permisos por vínculo consentido; auditoría de cada acceso de cuidador/profesional.
- Backups cifrados automáticos; plan de recuperación documentado.
- Sin SDKs de publicidad ni rastreadores de terceros. Nunca se venden ni comparten datos.

## Qué NO construir (por ahora)

- App móvil nativa (la PWA cubre el caso; una app duplica mantenimiento).
- Microservicios, colas, Kubernetes.
- Modelos de IA diagnóstica propios (riesgo clínico y regulatorio; sin evidencia local).
- Videollamadas integradas (enlazar a herramientas existentes si hace falta).
