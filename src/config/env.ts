/**
 * Configuración de variables de entorno
 */

// Cargar variables de entorno directamente con process.loadEnvFile()
process.loadEnvFile();

export const config = {
  port: process.env.PORT ?? 3000,
  nodeEnv: process.env.NODE_ENV ?? 'development',
}; 