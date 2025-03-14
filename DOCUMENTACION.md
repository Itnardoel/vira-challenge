# Documentación de la Automatización con Playwright y Express.js

## Introducción
Este documento describe el proceso de desarrollo de una automatización utilizando Playwright y Express.js, con las modificaciones y mejoras realizadas a lo largo del proyecto.

---

## Inicialización del Proyecto

### **Primer Prompt**: 
```
Inicializa el proyecto con Node.js utilizando TypeScript y Express.js
```

**Cambios realizados:**
- Creación del archivo `package.json`.
- Instalación de dependencias: `express`, `cors`, `dotenv`.
- Instalación de dependencias de desarrollo: `typescript`, `@types/node`, `@types/express`, `ts-node`, `nodemon`.
- Configuración del `tsconfig.json`.
- Creación de la estructura del proyecto (`src/`, `routes/`, `controllers/`, `middleware/`, etc.).
- Implementación de un archivo de configuración para variables de entorno.
- Creación de un archivo `README.md` con instrucciones iniciales.
- Configuración de `.gitignore` y `.env`.

---

### **Segundo Prompt**:
```
Vamos a realizar varios cambios:
- Al inicializar el proyecto, no es necesario utilizar nodemon para el entorno de desarrollo, podemos utilizar el modo watch con la flag --watch.
- Vamos a agregar el type module para poder trabajar con imports.
- No vamos a generar una build para correrlo, ya que Node nativamente soporta TypeScript. Agregamos la flag --experimental-strip-types.
```

**Modificaciones:**
- Eliminación de `nodemon`, uso de `--watch` nativo de Node.js.
- Cambio a módulos ESM con `"type": "module"` en `package.json`.
- Uso de `--experimental-strip-types` para ejecutar TypeScript sin compilación previa.
- Ajustes en `tsconfig.json` para compatibilidad con ESM.

---

### **Tercer Prompt**:
```
dotenv ya no es necesario, quiero cargar las variables de entorno directamente utilizando process.loadEnvFile(). Si está en la raíz del proyecto, no es necesario utilizar fileURLToPath ni dirname y resolve.
```

**Modificaciones:**
- Eliminación de `dotenv`, uso de `process.loadEnvFile()`.
- Desinstalación de `dotenv` para reducir dependencias.
- Simplificación del código en `src/config/env.ts`.
- Actualización del `README.md` con la nueva configuración.

_(Nota: Se realizaron ajustes manuales debido a problemas en la resolución de importaciones en `tsconfig.json`)._

---

## Implementación de Automatización con Playwright

### **Primer Prompt**:
```
Implementa Playwright para automatizar el logueo en la página https://panel-dev.viradoctores.com con el email: test@test.test y password: 12345678. Luego de ingresar las credenciales, realiza un clic en el botón "Iniciar sesión". Implementa esto en un archivo TypeScript separado, pero ten en cuenta que no es una prueba automatizada.
```

**Desarrollo:**
- Instalación de `playwright`.
- Creación del directorio `src/automation/`.
- Implementación del script `login.ts`:
  - Apertura de navegador en modo visible.
  - Navegación a la URL de login.
  - Ingreso de credenciales ficticias.
  - Clic en el botón de inicio de sesión.
  - Espera de la respuesta y cierre del navegador.
- Creación de un script en `package.json` para ejecutar la automatización.

_(Nota: Se cambió el nombre del script para evitar conflictos con `login` de npm)._

---

### **Segundo Prompt**:
```
Como el login es ficticio, quiero que verifiquemos que todos los pasos se realizaron correctamente. Para ello, vamos a comprobar en pantalla si aparece el siguiente mensaje:

<div class="grid gap-1"><div class="text-sm font-semibold [&+div]:text-xs">auth/invalid_credentials</div><div class="text-sm opacity-90">Usuario o contraseña incorrectos</div></div>

Si este mensaje está presente en la página después de intentar iniciar sesión, consideraremos que el proceso se completó correctamente.
```

**Modificaciones:**
- Verificación de la aparición del mensaje de error `auth/invalid_credentials`.
- Consideración del proceso como exitoso si se detecta dicho mensaje.

---

## Cambio en la obtención de nombres de folios

### **Primer Prompt**:
```
Cambia la forma de conseguir los nombres de los archivos con node:readline. Quiero que le pregunte al usuario cuál es el nombre del primer folio, seguido del nombre del segundo folio.
```

**Modificaciones:**
- Implementación de `readline/promises` para interacción con el usuario.
- Creación de una interfaz para solicitar los nombres de los folios dinámicamente.
- Traducción de mensajes al español para mantener consistencia.
- Mensajes agregados en consola para mayor claridad.

---

## Integración con IA para notificaciones

### **Primer Prompt**:
```
La notificación por consola la va a realizar una inteligencia artificial. Vas a usar el SDK AI de Vercel en un archivo aparte para guardar el número de siniestro de la carta de honorarios y que lo imprima por consola.
```

**Desarrollo:**
- Instalación del SDK de Vercel AI (`ai` y `@ai-sdk/openai`).
- Creación del servicio `aiService.ts` para manejar la notificación con IA.
- Implementación de la generación de mensajes personalizados basados en el número de siniestro.
- Modificación del controlador para integrar la IA en la generación de cartas de honorarios.
- Inclusión de `OPENAI_API_KEY` en `.env` y documentación en `README.md`.

---

## Implementación de una Tarea Programada (Cron Job)

### **Primer Prompt**:
```
Implementa la función startCronJob en un archivo separado. Esta función debe ejecutarse automáticamente cuando se levante el servidor de Express y debe hacer una petición POST al endpoint de nuestra API /login-verificar-folios, enviando en el body los nombres de los dos folios pasados como argumentos por consola. A su vez, esta función debe ejecutarse de manera recurrente cada 10 minutos utilizando un cron job.
```

**Desarrollo:**
- Instalación de `node-cron` y `axios`.
- Creación de `src/cron/folioVerifier.ts`.
- Configuración del cron job para ejecutar la verificación cada 10 minutos.

---