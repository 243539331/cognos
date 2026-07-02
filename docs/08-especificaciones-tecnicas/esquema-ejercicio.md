# Esquema de ejercicio de estimulación

> Contrato de datos para un ejercicio de estimulación cognitiva, enmarcado en el modelo **CST** (ver [investigación §2.5](../02-investigacion/02-evidencia-cientifica.md)). Recordar la lección del iCST: **se necesita un banco de actividades grande** para sostener el uso.

## Estructura (anotada)

```yaml
# ─────────── Identidad y versión ───────────
id: ejercicio-ejemplo
nombre: "Nombre del ejercicio"
version: 1.0.0
estado: borrador                  # borrador | en-revision | publicado | retirado
idioma: es

# ─────────── Licencia ───────────
licencia:
  tipo: "propio | CST-derivado | permiso-autor"
  titular: ""
  permiso_uso: true               # bloqueante para publicar
  verificada_por: ""
  # Nota: los materiales CST (Making a Difference) tienen copyright; una actividad
  # "inspirada en CST" propia es distinta de reproducir el manual. Marcar la diferencia.

# ─────────── Clasificación clínica ───────────
dominio_primario: memoria         # memoria | atencion | lenguaje | funcion-ejecutiva | visuoespacial | orientacion
dominios_secundarios: [lenguaje]
principio_cst: "orientación a la realidad | reminiscencia | categorización | asociación de palabras | resolución de problemas"
sin_fallo_explicito: true         # filosofía CST: minimizar la experiencia de error

# ─────────── Dificultad y adaptación ───────────
niveles:
  - nivel: 1
    descripcion: "Más apoyo, menos elementos"
    parametros: { elementos: 3, tiempo_s: null, pistas: true }
  - nivel: 2
    parametros: { elementos: 5, tiempo_s: null, pistas: true }
  - nivel: 3
    parametros: { elementos: 8, tiempo_s: null, pistas: false }
adaptacion:
  regla_subir: "2 sesiones consecutivas con aciertos >= 80%"
  regla_bajar: "aciertos < 50% en una sesión"
  # dificultad adaptativa simple; sin castigo, sin cronómetro salvo que el ejercicio lo requiera

# ─────────── Accesibilidad (obligatoria) ───────────
accesibilidad:
  instrucciones: { texto: true, audio: true, ilustracion: true }
  boton_escuchar_de_nuevo: true
  entrada: [toque, voz]           # nunca gesto complejo como único método
  objetivo_tactil_min_px: 44
  tiempo_limite: ninguno          # salvo excepción justificada
  lenguaje: "lectura-facil"       # UNE 153101 para textos de cara a la persona

# ─────────── Contenido de la actividad (placeholder) ───────────
contenido:
  tipo: emparejar                 # emparejar | ordenar | nombrar | recordar | categorizar | conversar
  consigna: "«Toque las dos imágenes que van juntas» (placeholder)"
  recursos:                       # imágenes/audio, culturalmente apropiados y locales
    - { tipo: imagen, ref: "assets/placeholder/objeto-1.svg", alt: "descripción" }
  offline: true                   # debe funcionar sin conexión y sincronizar luego

# ─────────── Telemetría (para el tablero de progreso) ───────────
telemetria:
  registra: [aciertos, errores, tiempo_total_s, nivel_alcanzado, completada]
  # alimenta las series cuantitativas por dominio del tablero
```

## Reglas de validación

1. **Accesibilidad no negociable**: `instrucciones.audio` e `instrucciones.ilustracion` obligatorias; `objetivo_tactil_min_px >= 44`; sin límite de tiempo salvo justificación clínica.
2. **Sin fallo punitivo**: `sin_fallo_explicito: true` por defecto (filosofía CST).
3. **Offline primero**: `contenido.offline: true` para sesiones en conectividad intermitente.
4. **Licencia**: `permiso_uso: true` para publicar; distinguir actividad propia de reproducción de material CST con copyright.
5. **Recursos culturalmente apropiados**: imágenes/nombres locales, adultos (no infantilizar).

## Motor de recomendación (especificación, no código)

- **Entrada**: perfil por dominios de la última `Evaluacion` (subpuntajes).
- **Regla base**: priorizar el **dominio más débil** primero; equilibrar con variedad para sostener el interés.
- **Salida**: un `PlanEstimulacion` con sesiones cortas (10–15 min), mezcla de dominios, y progresión adaptativa por `regla_subir`/`regla_bajar`.
- **Restricción de contenido**: nunca ofrecer más ejercicios de los disponibles (la lección del iCST: prever agotamiento del banco).
