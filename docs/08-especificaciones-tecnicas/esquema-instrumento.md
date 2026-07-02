# Esquema de instrumento de tamizaje

> Contrato de datos para definir un instrumento como YAML/JSON versionado. Un profesional clínico debe poder leerlo y validarlo sin tocar código.

## Estructura (anotada)

```yaml
# ─────────── Identidad y versión ───────────
id: plantilla-tamizaje            # identificador estable (kebab-case)
nombre: "Nombre del instrumento"
version: 1.0.0                    # SemVer; INMUTABLE una vez publicado
estado: borrador                  # borrador | en-revision | publicado | retirado
idioma: es                        # ISO 639-1
adaptacion_cultural: "es-CO"      # opcional: variante regional

# ─────────── Licencia (BLOQUEANTE para publicar) ───────────
licencia:
  tipo: "CC BY-NC-ND | permiso-autor | dominio-publico | propietaria"
  titular: "Nombre del titular de derechos"
  permiso_digitalizacion: false   # true solo con permiso escrito verificado
  verificada_por: ""              # quién confirmó la licencia
  fecha_verificacion: ""          # YYYY-MM-DD
  url_referencia: ""
  atribucion_obligatoria: "Texto de atribución que debe mostrarse siempre"
# Regla del motor: si permiso_digitalizacion != true, el instrumento NO se publica.

# ─────────── Aplicación ───────────
modo: [autoadministrado, asistido]   # quién lo opera
dominios: [memoria, atencion, lenguaje, funcion-ejecutiva, visuoespacial, orientacion]
duracion_estimada_min: 5
requiere_materiales: false           # p. ej. papel/lápiz físico
independiente_de_lectoescritura: true # clave para baja alfabetización

# ─────────── Datos demográficos requeridos para puntuar ───────────
demografia_requerida:
  - edad                          # o año de nacimiento
  - escolaridad                   # bandas: "<4 años", "4-8", ">8"

# ─────────── Ítems (contenido PLACEHOLDER — no reproduce ítems reales) ───────────
items:
  - id: item-ejemplo-1
    tipo: opcion-multiple          # opcion-multiple | registro-verbal | dibujo | temporizado | informador
    dominio: memoria
    enunciado: "«Texto del ítem» (placeholder — el real se carga con permiso)"
    audio: "opcional: pista de audio para no-lectores"
    opciones:                      # según tipo
      - { valor: 0, etiqueta: "…" }
      - { valor: 1, etiqueta: "…" }
    limite_tiempo_s: null          # null salvo que el instrumento clínico lo exija
  - id: item-ejemplo-informador
    tipo: informador               # lo responde el cuidador (p. ej. estilo AD8)
    dominio: funcion-ejecutiva
    enunciado: "«¿Ha notado cambios en…?» (placeholder)"
    opciones:
      - { valor: 0, etiqueta: "No / No sé" }
      - { valor: 1, etiqueta: "Sí, hay cambio" }

# ─────────── Puntuación ───────────
puntuacion:
  metodo: suma                     # suma | ponderada | algoritmo-nombrado
  rango: { min: 0, max: 10 }
  por_dominio: true                # calcular subpuntajes por dominio
  cortes:                          # dependientes de demografía cuando aplique
    - { escolaridad: "<4 años", punto_corte: 4 }
    - { escolaridad: "4-8",     punto_corte: 5 }
    - { escolaridad: ">8",      punto_corte: 6 }

# ─────────── Resultado (ORIENTACIÓN, nunca diagnóstico) ───────────
resultado:
  bandas:
    - id: sin-alerta
      etiqueta: "Sin señales de alerta"
      regla: "puntaje >= punto_corte"
      mensaje_usuario: "Los resultados no muestran señales de alerta en este momento."
    - id: zona-atencion
      etiqueta: "Conviene observar"
      regla: "puntaje cercano al corte"
      mensaje_usuario: "Vale la pena repetir la evaluación más adelante y cuidar el sueño, el ánimo y la actividad."
    - id: derivar
      etiqueta: "Se sugiere valoración profesional"
      regla: "puntaje < punto_corte"
      mensaje_usuario: "Estos resultados sugieren que sería útil una valoración con un profesional de salud. Aquí te explicamos cómo buscarla."
  # NUNCA usar palabras como "demencia", "Alzheimer" o "diagnóstico" de cara al usuario.
```

## Reglas de validación (que el motor debe imponer)

1. **`version` inmutable**: publicar una versión congela sus `items` y `puntuacion`. Un cambio exige nueva `version`.
2. **Licencia bloqueante**: `licencia.permiso_digitalizacion == true` y `verificada_por` no vacío para pasar a `estado: publicado`.
3. **Cortes completos**: si `demografia_requerida` incluye `escolaridad`, debe haber una banda de corte por cada categoría.
4. **Lenguaje de resultado**: los `mensaje_usuario` pasan por el checklist de lenguaje llano (UNE 153101 + lista CREA; ver [diseño §5.5](../02-investigacion/05-diseno-accesible.md)) y **no contienen términos diagnósticos**.
5. **Trazabilidad**: cada `Evaluacion` guarda `id@version` del instrumento (ver [modelo de datos](../05-modelo-datos.md)).

## Ejemplo mínimo válido (placeholder)

```yaml
id: demo-orientacion
nombre: "Demo de orientación (placeholder)"
version: 0.1.0
estado: borrador
idioma: es
licencia: { tipo: dominio-publico, titular: "N/A", permiso_digitalizacion: true, verificada_por: "equipo", fecha_verificacion: "2026-07-02" }
modo: [asistido]
dominios: [orientacion]
demografia_requerida: [edad, escolaridad]
items:
  - { id: q1, tipo: opcion-multiple, dominio: orientacion, enunciado: "«ítem placeholder»", opciones: [ {valor:0,etiqueta:"…"}, {valor:1,etiqueta:"…"} ] }
puntuacion: { metodo: suma, rango: {min:0,max:1}, por_dominio: true, cortes: [ {escolaridad:"<4 años", punto_corte:1} ] }
resultado:
  bandas:
    - { id: sin-alerta, etiqueta: "Sin señales de alerta", regla: "puntaje >= 1", mensaje_usuario: "Sin señales de alerta por ahora." }
    - { id: derivar, etiqueta: "Se sugiere valoración", regla: "puntaje < 1", mensaje_usuario: "Sería útil una valoración profesional." }
```
