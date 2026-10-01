import { geolocation, next } from "@vercel/functions";

// Solo el documento raíz: es la única ruta HTML del sitio.
export const config = {
  matcher: "/",
};

const COOKIE_NAME = "gp_country";
const COOKIE_MAX_AGE = 60 * 60 * 12;

/**
 * Expone el país del visitante (deducido por IP en el edge de Vercel) como una
 * cookie legible por el cliente, para que la app pueda elegir idioma por región
 * y no solo por el idioma configurado en el navegador.
 *
 * Solo se guarda el código ISO de país de dos letras. Nada de IP ni ciudad.
 */
export default function middleware(request: Request) {
  const { country } = geolocation(request);

  if (!country || !/^[A-Z]{2}$/i.test(country)) {
    return next();
  }

  return next({
    headers: {
      "Set-Cookie": `${COOKIE_NAME}=${country.toUpperCase()}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`,
    },
  });
}
