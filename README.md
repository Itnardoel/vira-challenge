# Proyecto Express con TypeScript y Automatización

Este es un proyecto que combina una aplicación Express.js utilizando TypeScript con soporte nativo de Node.js y automatización con Playwright.

## Características

- Utiliza módulos ES (ESM) para una sintaxis de importación moderna
- Aprovecha el soporte nativo de TypeScript en Node.js con `--experimental-strip-types`
- Modo de desarrollo con recarga automática usando `--watch` nativo de Node.js
- Carga de variables de entorno con `process.loadEnvFile()` nativo sin dependencias externas
- Automatización de tareas con Playwright
- Programación de tareas con node-cron
- Integración con Vercel AI SDK para generar mensajes personalizados

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
OPENAI_API_KEY=tu-api-key-de-openai
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
  ├── services/     # Servicios de la aplicación (incluye programación de tareas y AI)
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
- **Integración con AI**: Utiliza el SDK de AI de Vercel para generar mensajes personalizados cuando se crea una carta de honorarios

## Configuración de AI

El proyecto utiliza el SDK de AI de Vercel para generar mensajes personalizados. Para configurarlo:

1. Obtén una API key de OpenAI desde [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Añade la API key a tu archivo `.env` como `OPENAI_API_KEY=tu-api-key-de-openai`

### Manejo de errores de cuota

Si recibes un error como "You exceeded your current quota, please check your plan and billing details", significa que has excedido tu cuota de uso de OpenAI. Puedes:

1. Verificar y actualizar tu plan en [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)
2. Crear una nueva API key con una cuenta diferente
3. El sistema utilizará automáticamente mensajes predefinidos si no puede conectarse a la API de OpenAI

## Licencia

ISC "# vira-challenge" 
"# vira-challenge" 
