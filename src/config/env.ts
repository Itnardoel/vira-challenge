/**
 * Configuración de variables de entorno
 */

// Cargar variables de entorno directamente con process.loadEnvFile()
process.loadEnvFile();

export const config = {
  port: process.env.PORT ?? 3000,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  baseUrl: process.env.BASE_URL ?? 'https://panel-dev.viradoctores.com',
  auth: {
    email: process.env.AUTH_EMAIL ?? 'test@test.test',
    password: process.env.AUTH_PASSWORD ?? '12345678',
  },
}; 