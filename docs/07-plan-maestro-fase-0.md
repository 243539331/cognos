# 07 — Plan maestro de acción (Fase 0)

> Checklist consolidado que traduce la investigación en **acciones concretas con responsable y orden sugerido**, antes de escribir código. Marca cada casilla al completarla. "Responsable" usa roles genéricos: **PROY** (coordinación del proyecto), **CLÍN** (asesor/a clínico/a), **LEGAL** (asesor/a legal), **TEC** (perfil técnico).

## Camino crítico (lo que desbloquea todo lo demás)

```
Constituir figura jurídica (fundación)
        │
        ├──> Validación TechSoup / Percent  ──> Créditos de nube (AWS, Google, MS)
        ├──> Asesoría clínica comprometida  ──> Elegir y validar instrumentos
        ├──> Permisos de instrumentos       ──> Digitalizar tamizaje (Fase 1)
        └──> Organización piloto aliada      ──> Vía de derivación + pruebas reales
```

## 1. Constitución y gobernanza

| # | Acción | Responsable | Estado |
|---|---|---|---|
| 1.1 | Constituir **fundación / asociación sin ánimo de lucro** (interés social, **no** entidad de salud/hospital — es lo que abre la puerta a Google for Nonprofits) | PROY + LEGAL | ☐ |
| 1.2 | Definir país de constitución y de primer despliegue (afecta regulación de datos y dispositivo) | PROY + LEGAL | ☐ |
| 1.3 | Redactar misión y estatutos alineados con "beneficio comunitario" (requisito de elegibilidad de programas para ONG) | PROY | ☐ |
| 1.4 | Nombrar un **responsable de protección de datos** (aunque sea a tiempo parcial) | PROY | ☐ |

## 2. Asesoría clínica (bloqueante para todo lo clínico)

| # | Acción | Responsable | Estado |
|---|---|---|---|
| 2.1 | Reclutar **asesor/a clínico/a** (neuropsicología, geriatría o terapia ocupacional) que revise instrumentos, textos y bandas de resultado | PROY | ☐ |
| 2.2 | Acordar el **encuadre "tamizaje, no diagnóstico"** y los textos de derivación con el asesor | CLÍN | ☐ |
| 2.3 | Validar **puntos de corte por edad y escolaridad** para los instrumentos elegidos | CLÍN | ☐ |
| 2.4 | Explorar convenio con **universidad** (prácticas de neuropsicología/fonoaudiología como fuerza de revisión de contenidos) | PROY | ☐ |

## 3. Instrumentos de tamizaje — permisos (ver [investigación §1](02-investigacion/01-instrumentos-evaluacion.md))

> **Ninguno es de dominio público.** Todos permiten uso clínico no comercial, pero digitalizarlos requiere permiso escrito. Priorizar los de menor fricción y gestionar permisos en paralelo.

| # | Instrumento | Contacto para permiso | Nota | Estado |
|---|---|---|---|---|
| 3.1 | **Fototest + Eurotest** | Cristóbal Carnero-Pardo (autor; vía fototest.es) | CC BY-NC-ND: la cláusula "SinObraDerivada" hace **imprescindible** el permiso para una versión web interactiva. Una sola gestión cubre ambos | ☐ |
| 3.2 | **AD8** | Washington University — morrisj@abraxas.wustl.edu | Permitido no comercial sin modificar; confirmar por escrito el uso digital. Traducción ES ya autorizada a Carnero-Pardo/SEN | ☐ |
| 3.3 | **T@M** | Lorena Rami González (autora) | Copyright registrado; pedir permiso para digitalizar | ☐ |
| 3.4 | **Mini-Cog** | S. Borson — soob@uw.edu | Uso no comercial ya permitido; enviar constancia escrita del uso digital sin modificar | ☐ |
| 3.5 | **GPCOG** | Autores / web oficial | La vía más libre; verificar términos | ☐ |
| 3.6 | Decidir **batería de arranque** con el asesor clínico (recomendado: **Fototest + AD8** por baja alfabetización; Mini-Cog/GPCOG como respaldo) | CLÍN + PROY | ☐ |

## 4. Terapias — CST y permisos (ver [investigación §2.5](02-investigacion/02-evidencia-cientifica.md))

| # | Acción | Contacto | Estado |
|---|---|---|---|
| 4.1 | Contactar al equipo **CST-ES / CREA-Imserso** (Pérez-Sáez, Tofiño García) para colaboración y permisos de adaptación | vía CREA/Imserso | ☐ |
| 4.2 | Consultar al **Centro Internacional de CST (UCL, Prof. Aimee Spector)** y a **Hawker Publications** sobre licencia para versión digital/traducción | UCL / Hawker | ☐ |
| 4.3 | Diseñar el módulo de estimulación **sobre el marco CST**, dimensionando un **banco de actividades grande** (lección del iCST) | CLÍN + PROY | ☐ |

## 5. Regulación y datos (ver [investigación §4](02-investigacion/04-regulacion-etica.md))

| # | Acción | Responsable | Estado |
|---|---|---|---|
| 5.1 | Obtener **concepto legal local** que confirme la exención de dispositivo médico por finalidad no diagnóstica (INVIMA/COFEPRIS/ANMAT/MDR según país) | LEGAL | ☐ |
| 5.2 | Redactar **consentimiento informado** versionado y el **aviso de privacidad** (datos de salud = sensibles; consentimiento previo y expreso) | LEGAL + CLÍN | ☐ |
| 5.3 | Documentar por escrito la **intención de uso no diagnóstica** (Colombia: marco SaMD en transición) | LEGAL | ☐ |
| 5.4 | Definir la política de **anonimización** para métricas agregadas (vía científica/estadística de la Ley 1581) | LEGAL + TEC | ☐ |

## 6. Financiación e infraestructura (ver [investigación §6](02-investigacion/06-financiacion-patrocinios.md))

| # | Acción | Vía | Estado |
|---|---|---|---|
| 6.1 | Validar la ONG en **TechSoup** (desbloquea AWS Nonprofit Credit Program) | techsoup / socio local (MAKAIA, Cemefi) | ☐ |
| 6.2 | Solicitar **Google for Nonprofits** (Ad Grants US$10k/mes + Workspace) tras validación Percent/Goodstack | google.com/nonprofits | ☐ |
| 6.3 | Solicitar **Microsoft for Nonprofits** y/o **AWS** créditos de nube | microsoft/aws | ☐ |
| 6.4 | Solicitar **Cloudflare Project Galileo** (seguridad gratuita) y vigilar la cohorte **Startups for Nonprofits** | cloudflare | ☐ |
| 6.5 | Vigilar convocatorias abiertas de **BID Lab** y **CAF**; explorar respaldo institucional de **OPS/OMS** (Década del Envejecimiento Saludable) | — | ☐ |
| 6.6 | Preparar **dossier/brief para patrocinadores** (problema, evidencia, métricas del piloto, costos ≈ 0, plan de expansión) | PROY | ☐ |

## 7. Piloto

| # | Acción | Responsable | Estado |
|---|---|---|---|
| 7.1 | Identificar **1–2 organizaciones comunitarias** aliadas (centros día, fundaciones de adulto mayor) | PROY | ☐ |
| 7.2 | Acordar la **vía de derivación** para resultados que sugieran valoración profesional | CLÍN + aliado | ☐ |
| 7.3 | Definir **métricas de impacto** del piloto desde el inicio (ver [modelo de datos](05-modelo-datos.md)) | PROY + TEC | ☐ |

## Criterio de salida de Fase 0

> Se puede pasar a la Fase 1 (MVP) cuando estén: **(a)** figura jurídica constituida, **(b)** asesor clínico comprometido, **(c)** al menos un instrumento con permiso de digitalización confirmado, **(d)** una organización piloto interesada, y **(e)** concepto legal básico sobre no-dispositivo-médico y datos.
