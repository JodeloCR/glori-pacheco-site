import type { Language } from "./content";

/**
 * Países ISO 3166-1 alpha-2 donde el español es lengua oficial o mayoritaria.
 */
const SPANISH_SPEAKING_COUNTRIES = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ", "GT",
  "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);

/** La escribe el middleware del edge de Vercel con el país deducido por IP. */
const COUNTRY_COOKIE = "gp_country";

/** Solo se escribe cuando la persona usa el selector ES/EN a mano. */
const STORAGE_KEY = "gp_lang";

function readCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function readStoredLanguage(): Language | undefined {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "es" || stored === "en" ? stored : undefined;
  } catch {
    // Modo privado o almacenamiento bloqueado: se cae a la detección automática.
    return undefined;
  }
}

/** Recuerda la elección manual para que la detección no la pise en la próxima visita. */
export function storeLanguage(language: Language): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // La preferencia no se puede guardar; el sitio sigue funcionando igual.
  }
}

/**
 * Orden de decisión, de más explícito a más inferido:
 *   1. ?lang= en la URL      — enlace compartido o recarga
 *   2. elección manual previa — selector ES/EN
 *   3. región del visitante   — país por IP vía el middleware
 *   4. idioma del navegador   — para hispanohablantes fuera de la región
 *   5. inglés
 */
export function getInitialLanguage(): Language {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (queryLanguage === "es" || queryLanguage === "en") return queryLanguage;

  const storedLanguage = readStoredLanguage();
  if (storedLanguage) return storedLanguage;

  const country = readCookie(COUNTRY_COOKIE)?.toUpperCase();
  if (country && SPANISH_SPEAKING_COUNTRIES.has(country)) return "es";

  if (navigator.language.toLowerCase().startsWith("es")) return "es";

  return "en";
}
