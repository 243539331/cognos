# 6 — Financiación y patrocinios en Latinoamérica

> El proyecto es sostenible con **costo de operación ≈ 0** (ver [arquitectura](../03-arquitectura.md)) y crece con **patrocinios y alianzas**, no con cobro a usuarios. Aquí, los canales concretos encontrados y los patrones a seguir.

## 6.1 El caso demostrado: BID / BID Lab

📄 **Fuente citada, verificación interrumpida** — *Silver Economy Innovation for Inclusion Challenge*, Banco Interamericano de Desarrollo (BID) y BID Lab (iadb.org):

- El **BID y su laboratorio de innovación BID Lab** lanzaron un desafío para financiar **soluciones innovadoras para la población mayor** de América Latina y el Caribe.
- **Montos**: préstamos de recuperación contingente, financiamiento reembolsable o **donaciones no reembolsables de US$300.000 a US$2 millones** por proyecto.
- **Áreas elegibles** incluían explícitamente **servicios de salud y cuidado de largo plazo**, y exigían **foco en la población mayor pobre y vulnerable** de los países miembros prestatarios del BID — encaja con un portal de salud cognitiva sin ánimo de lucro para adultos mayores vulnerables hispanohablantes.
- **Escala del problema (justificación del BID)**: hoy hay **> 80 millones de personas > 60 años** en la región; en 30 años serán **casi 200 millones**.
- ⚠️ **Estado**: esa convocatoria puntual **ya cerró** (propuestas jun–jul 2021; 181 propuestas de 27 países, 9 seleccionadas en Categoría A). Sirve como **precedente de convocatorias recurrentes del BID Lab**, no como oportunidad abierta hoy.

**Acción**: monitorear el sitio de **BID Lab** y su programa de "economía plateada" para la próxima convocatoria; preparar el dossier con antelación (ver §6.4).

## 6.2 Categorías de financiación a explorar (a confirmar caso por caso)

El material de investigación confirmó el canal BID. Las siguientes categorías son **rutas conocidas para ONG de salud digital** que conviene investigar en una segunda ronda dedicada (marcadas 🔎 = por confirmar términos vigentes):

### A. Créditos de infraestructura para ONG (reducen el costo operativo a ~0)

Dos programas quedaron **documentados en detalle** en la 2ª ronda (✅ verificado 3-0):

- ✅ **AWS Nonprofit Credit Program** — **crédito promocional escalonado según presupuesto**: **US$1.000** (presupuesto < US$10M, *nuestra categoría*), US$2.000 (US$10–50M) o US$5.000 (> US$50M). **Un crédito por año fiscal** (1 jul–30 jun), cada uno **válido 12 meses**. **No se solicita directamente a AWS**: se distribuye a través de **TechSoup y sus socios regionales** (TechSoup valida ONG en 236 países, incl. TechSoup España y socios en LatAm como **MAKAIA** y **Cemefi** en México). *Nota: el programa tuvo "expansión global" reciente a ~50 países; confirmar que el país objetivo está incluido.*
- ✅ **Microsoft for Nonprofits** — **precios con descuento** en nube (Azure) y algunas licencias on-premise. Elegibilidad: **estatus legal equivalente a 501(c)(3)** con **misión de beneficio comunitario** (socorro, educación, bienestar social, cultura, medio ambiente, derechos humanos, sociedad civil). **Excluye** gobiernos/ONU, escuelas/universidades, servicios públicos, entidades financieras, asociaciones profesionales/deportivas/políticas/sindicales y personas individuales. Distingue **grants** (solo empleados pagados + directivos no remunerados) de **descuentos** (todo el personal, incl. voluntarios). *La página de elegibilidad no publica montos de crédito Azure concretos; la cifra "US$2.000/año" que circula viene de otras páginas de Azure, verificar.*

Aún por investigar (3ª ronda):
- 🔎 **Google for Nonprofits** / Google.org (Google Cloud y Workspace) — elegibilidad y montos vigentes.
- 🔎 **Cloudflare Project Galileo** / Startups for Nonprofits (protección y CDN gratuitas para proyectos de interés público).

> Estos no son "patrocinio" en efectivo, pero **eliminan el mayor costo recurrente** y hacen creíble el modelo de operación gratuita ante otros patrocinadores. **Requisito previo común: tener figura jurídica de ONG y validarse ante TechSoup** — otra razón para constituir la entidad en Fase 0.

### B. Banca de desarrollo y organismos multilaterales
- ✅ **BID / BID Lab** (confirmado como canal, §6.1).
- 🔎 **CAF — Banco de Desarrollo de América Latina**.
- 🔎 **Banco Mundial** (fondos de innovación social / salud).
- 🔎 **OPS/OMS** (salud digital y envejecimiento saludable — Década del Envejecimiento Saludable 2021–2030).

### C. Fundaciones y filantropía
- 🔎 Fundaciones de investigación en Alzheimer/demencia (p. ej. Alzheimer's Association tiene programas internacionales).
- 🔎 Fundaciones locales de adulto mayor y de salud en el país de despliegue.
- 🔎 Filantropía tecnológica (fondos de impacto en salud digital).

### D. Academia (fuerza de trabajo + credibilidad, más que efectivo)
- 🔎 Convenios con **universidades** (neuropsicología, fonoaudiología, terapia ocupacional, ingeniería): estudiantes en práctica pueden **revisar contenidos clínicos** y **co-diseñar** con usuarios (§5.2 de [diseño accesible](05-diseno-accesible.md)), y aportan credibilidad para publicar el piloto.

## 6.3 Por qué el modelo es financiable (argumento para el dossier)

Sintetizando la investigación:

1. **El problema es grande y crece** (📄 BID: 80M → 200M de mayores en la región).
2. **Ataca una inequidad reconocida**: la brecha de acceso a servicios terapéuticos, y el riesgo de que la salud digital **agrave** desigualdades si no se diseña para los vulnerables (📄, ver [ética](04-regulacion-etica.md)).
3. **Se apoya en evidencia** de eficacia en DCL (✅ g=0.35) — no es una promesa vacía.
4. **Aborda un vacío documentado**: aplicaciones **culturalmente inclusivas** en español (📄, [diseño](05-diseno-accesible.md)).
5. **Costo de operación ≈ 0** por diseño (arquitectura de bajo costo + créditos para ONG) ⇒ **alto retorno social por dólar**.
6. **Es abierto y replicable** ⇒ el patrocinio financia un bien público reutilizable, no un activo privado.

## 6.4 Qué necesita el dossier de patrocinio (checklist)

Diseñar la recolección de estas métricas **desde el inicio** (ver [modelo de datos §métricas agregadas](../05-modelo-datos.md)):

- [ ] **Problema cuantificado** para el país/región objetivo (prevalencia de DCL/demencia, brecha de acceso).
- [ ] **Evidencia** citada (este dossier) del beneficio del tamizaje + estimulación en DCL.
- [ ] **Métricas del piloto**: personas alcanzadas, evaluaciones aplicadas, adherencia, tasas de derivación (anonimizadas, k-anonimato).
- [ ] **Costo de operación** demostrado (idealmente ~0 gracias a créditos ONG).
- [ ] **Aval clínico** (asesor/organización) y **legal** (figura jurídica, cumplimiento de datos).
- [ ] **Plan de expansión** y de sostenibilidad.
- [ ] **Historias cualitativas** de impacto (con consentimiento), que complementan los números.

## 6.5 Nota de honestidad

La única fuente de financiación **verificada** en esta investigación es el **BID/BID Lab** (y su convocatoria ya cerró). El resto de canales (§6.2 B/C/D y los créditos de nube) son **rutas conocidas del sector que requieren una segunda ronda de investigación dedicada** para confirmar programas, elegibilidad y plazos vigentes al momento de postular. No presentarlos como compromisos, sino como pistas a validar.
