"use client";

/// Botón "🔊 Escuchar" siempre visible (regla transversal de
/// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md). Usa la Web
/// Speech API del navegador para leer el texto en voz alta — no depende de
/// audio pregrabado, así que funciona para cualquier texto nuevo sin trabajo extra.
export function EscucharBoton({ texto }: { texto: string }) {
  function hablar() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={hablar}
      aria-label="Escuchar en voz alta"
      className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-full border border-teal bg-white px-3 text-xl text-teal hover:bg-teal-tint"
    >
      🔊
    </button>
  );
}
