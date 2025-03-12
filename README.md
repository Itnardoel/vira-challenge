# Proyecto Express con TypeScript y Automatización

Este es un proyecto que combina una aplicación Express.js utilizando TypeScript con soporte nativo de Node.js y automatización con Playwright.

## Características

- Utiliza módulos ES (ESM) para una sintaxis de importación moderna
- Aprovecha el soporte nativo de TypeScript en Node.js con `--experimental-strip-types`
- Modo de desarrollo con recarga automática usando `--watch` nativo de Node.js
- Carga de variables de entorno con `process.loadEnvFile()` nativo sin dependencias externas
- Automatización de tareas con Playwright
- Programación de tareas con node-cron

## Requisitos previos

- Node.js (v18.19.0 o superior recomendado)
- pnpm (v8 o superior)

## Instalación

1. Clona este repositorio
2. Instala las dependencias:

```bash
pnpm install
```

3. Crea un archivo `.env` en la raíz del proyecto (o usa el existente) con las siguientes variables:

```
PORT=3000
NODE_ENV=development
BASE_URL=https://panel-dev.viradoctores.com
AUTH_EMAIL=test@test.test
AUTH_PASSWORD=12345678
```

## Comandos disponibles

- `pnpm dev`: Inicia el servidor en modo desarrollo con recarga automática usando `--watch`
- `pnpm start`: Inicia el servidor en modo producción

## Estructura del proyecto

```
src/
  ├── config/       # Configuraciones de la aplicación
  ├── controllers/  # Controladores
  ├── middlewares/  # Middleware personalizado
  ├── models/       # Modelos de datos
  ├── routes/       # Definición de rutas
  ├── services/     # Servicios de la aplicación (incluye programación de tareas)
  └── index.ts      # Punto de entrada de la aplicación
public/             # Archivos estáticos
```

## Endpoints de la API

- `GET /`: Página de inicio que confirma que el servidor está funcionando
- `POST /api/automation`: Endpoint para la verificación automatizada de registros

## Funcionalidades principales

- **Servidor Express**: Proporciona una API RESTful para interactuar con la aplicación
- **Automatización con Playwright**: Permite la automatización de tareas como inicio de sesión
- **Programación de tareas**: Utiliza node-cron para programar la verificación periódica de registros
- **Verificación de registros**: Compara archivos de registro especificados como argumentos de línea de comandos

## Licencia

ISC "# vira-challenge" 
"# vira-challenge" 
