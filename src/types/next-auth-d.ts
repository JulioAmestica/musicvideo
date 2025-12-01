// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  /** Extensión de la sesión que devuelve `useSession` y `getSession`. */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    name?: string;
  }

  /** Forma del JWT usado en los callbacks. */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    name?: string;
  }
}