# 06 — Hoja de ruta

> Fases pensadas para un equipo pequeño (1–3 personas + asesoría clínica voluntaria). Cada fase termina en algo usable y evaluable; no se avanza sin cerrar los criterios de salida.

## Fase 0 — Validación y alianzas (en curso)

**Objetivo**: plan sólido y al menos un aliado clínico.

- [x] Investigación de instrumentos, evidencia, plataformas, regulación y financiación (`docs/02-investigacion/`).
- [ ] Conseguir **asesoría clínica** (neuropsicólogo/a, geriatra o terapeuta ocupacional) que revise instrumentos y contenidos. *Sin esto no se publica nada clínico.*
- [ ] Verificar **licencias** de los instrumentos elegidos (por escrito cuando sea necesario). *Candidatos priorizados por la investigación: **Fototest ± AD8** (apto para baja alfabetización) y **Mini-Cog** (licencia no comercial ya confirmada favorable). Ver [investigación §1](02-investigacion/01-instrumentos-evaluacion.md).*
- [ ] Definir la figura legal (fundación/asociación) necesaria para recibir patrocinios y firmar convenios.
- [ ] Identificar 1–2 organizaciones comunitarias para el piloto (centros día, fundaciones de adulto mayor).

**Criterio de salida**: instrumentos elegidos con licencia verificada + asesor clínico comprometido + organización piloto interesada.

## Fase 1 — MVP de evaluación (est. 6–8 semanas de desarrollo)

**Objetivo**: aplicar un (1) instrumento de tamizaje de licencia libre (candidato: **Fototest + AD8** o **Mini-Cog**), en modo asistido, y entregar el reporte.

- Registro simple + consentimiento informado.
- Motor de instrumentos (declarativo) con el primer instrumento.
- Puntuación con cortes por edad/escolaridad y bandas de orientación (nunca "diagnóstico").
- Reporte PDF para llevar a consulta.
- Piloto con la organización aliada; observación directa de uso.

**Criterio de salida**: ≥ 20 aplicaciones reales asistidas; el asesor clínico valida que los resultados y textos son correctos y no alarmistas.

## Fase 2 — Estimulación cognitiva (est. 8–10 semanas)

**Objetivo**: plan de ejercicios personalizado según el perfil, usable sin conexión estable. **Marco de referencia: Terapia de Estimulación Cognitiva (CST)**, avalada por NICE y adaptable a bajos recursos (ver [investigación §2.5](02-investigacion/02-evidencia-cientifica.md)); evaluar los materiales de CST-International como base de contenidos.

- Biblioteca inicial: ~5 tipos de ejercicio × 3 dominios × 3 niveles (memoria, atención, lenguaje).
- Motor de recomendación simple (dominio más débil primero) + dificultad adaptativa.
- PWA offline para sesiones de ejercicios.
- Vínculos persona–cuidador y modo asistido.

**Criterio de salida**: adherencia ≥ 2 sesiones/semana en el 40 % de los usuarios del piloto durante un mes.

## Fase 3 — Tablero de progreso (est. 6 semanas)

**Objetivo**: cerrar el ciclo evaluación → ejercicio → seguimiento.

- Tablero cuantitativo (tendencias por dominio, adherencia) para cuidador/profesional.
- Registro cualitativo estructurado del cuidador; vista combinada cuali+cuanti.
- Vista simplificada "tu progreso" para la persona.
- Re-evaluación programada (p. ej. cada 6 meses) con comparativa entre aplicaciones.

**Criterio de salida**: un profesional externo puede entender la evolución de una persona en < 2 minutos con el reporte.

## Fase 4 — Piloto formal y patrocinios (continuo)

- Piloto documentado con métricas de impacto (las de `05-modelo-datos.md`).
- Dossier para patrocinadores: problema, evidencia, métricas del piloto, costos de operación, plan de expansión.
- Postulación a programas de nube para ONG y convocatorias (ver `02-investigacion/financiacion-patrocinios.md`).
- Convenios con universidades (prácticas de neuropsicología/fonoaudiología como fuerza de revisión de contenidos).

## Riesgos principales y mitigación

| Riesgo | Mitigación |
|---|---|
| Usar un instrumento sin licencia (p. ej. los que requieren pago/certificación) | Fase 0 verifica licencias por escrito; preferir instrumentos de dominio público o licencia libre |
| Resultados interpretados como diagnóstico | Lenguaje de orientación, bandas (no números crudos) al usuario final, revisión clínica de todos los textos |
| Baja adherencia | Modo asistido, sesiones cortas, recordatorios, co-diseño con la organización piloto |
| Datos sensibles comprometidos | Seudonimización por defecto, cifrado, mínima recolección, auditoría |
| Dependencia de una sola persona desarrolladora | Código abierto, documentación, stack popular |
| Sin financiación | Costo operativo ≈ 0 por diseño; el piloto genera las métricas que abren patrocinios |
