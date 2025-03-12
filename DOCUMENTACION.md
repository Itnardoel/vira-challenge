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

## Integración con Express.js

### **Primer Prompt**:
```
En el archivo index.ts vas a crear una nueva ruta que permita realizar el login. La misma debe recibir como parámetros de consola dos archivos que actuarán como folios conteniendo datos para verificar su estado (si han sido ingresados o no). Además, es necesario modificar la función en login.ts para que no cierre el navegador y en su lugar devuelva el navegador y la página, de modo que podamos manejarlo desde el endpoint y continuar con el flujo de trabajo.
```

**Desarrollo:**
- Modificación de `login.ts`:
  - Permitir el uso del navegador sin cerrarlo inmediatamente.
  - Retornar `browser` y `page` para continuar con el flujo.
- Creación de un endpoint en `src/routes/index.ts` para recibir los folios y verificar su estado.

---

### **Segundo Prompt**:
```
El código se ve bien, pero no necesitamos la ruta para cerrar el navegador manualmente. En la línea que te marco, ya estamos obteniendo el objeto browser y la página para trabajar con los folios. Una vez finalizado el procesamiento de los mismos, podemos cerrar el navegador sin necesidad de una ruta extra.
```

**Cambios:**
- Eliminación del endpoint `/cerrar-navegador`.
- Manejo del cierre del navegador dentro del proceso de verificación.

_(Nota: Se realizaron ajustes manuales para la lectura de archivos de folios y notificaciones por consola/Telegram)._

---

## Generación de Documentos

### **Primer Prompt**:
```
Implementa una función llamada uploadFeeLetter en un archivo TypeScript separado. Esta función debe generar una nueva carta de honorarios en formato .txt y devolver el número de siniestro que se generó para la misma. Puedes utilizar crypto.randomUUID(), que ya viene integrado con Node.js, para generar el identificador único del siniestro.
```

**Desarrollo:**
- Creación de `src/automation/utils/feeLetter.ts`.
- Implementación de `uploadFeeLetter()`.

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

