
  # Utorías Dashboard

Para ejecutar el prototipo correctamente, primero es necesario descargar los archivos del proyecto y ubicarlos dentro de una carpeta de trabajo deseada en el equipo local. Una vez extraído el contenido del proyecto,

El proyecto fue desarrollado utilizando React, Vite, TypeScript y TailwindCSS, por lo que requiere la instalación previa de Node.js y npm en el sistema operativo. Una vez cumplido este requisito, se debe ejecutar el siguiente comando en consola para instalar todas las dependencias incluidas en el proyecto:

npm install

Este comando descargará automáticamente las librerías necesarias para ejecutar la aplicación, incluyendo componentes visuales, sistema de estilos, navegación y utilidades utilizadas dentro del PMN.

Posteriormente, fue necesaria la instalación adicional del sistema de navegación de React, permitiendo conectar las distintas vistas del sistema como dashboard, solicitudes y panel de tutorías. Para ello se utilizó el siguiente comando:

npm install react-router-dom

Una vez finalizada la instalación, el proyecto puede ejecutarse utilizando:

npm run dev

Esto iniciará un servidor local de desarrollo mediante Vite, permitiendo acceder al sistema desde el navegador utilizando la dirección entregada por consola, generalmente:

http://localhost:5173
Estructura básica de carpetas

El proyecto fue organizado utilizando una estructura modular simple orientada a separar páginas, componentes y estilos según sus responsabilidades principales.

La carpeta principal src contiene la lógica general del sistema y se divide en distintas secciones:

src/
│
├── app/
│   ├── pages/
│   ├── components/
│   ├── data/
│   └── styles/
app/

Contiene la estructura principal de la aplicación y las vistas navegables del sistema.

pages/

Incluye las páginas principales del PMN, tales como:

dashboard administrativa,
vista del tutor,
formulario de solicitud,
seguimiento de solicitudes.

Cada página representa un actor o funcionalidad específica dentro del flujo general del sistema.

components/

Contiene componentes reutilizables utilizados por distintas páginas, como:

botones,
tablas,
tarjetas,
inputs,
badges,
formularios,
alertas visuales.

Esto permite mantener una estructura más modular y reutilizable durante el desarrollo.

data/

Contiene los datos simulados utilizados por el prototipo. Debido a que el PMN no utiliza todavía una base de datos real, las solicitudes, tutorías y usuarios son manejados mediante estructuras mock locales que permiten simular interacción y cambios de estado entre las distintas vistas.

styles/

Incluye los archivos de estilos globales y configuración visual utilizados por TailwindCSS y el sistema de diseño general de la aplicación.

Consideraciones del prototipo

Es importante señalar que esta estructura corresponde a una versión inicial orientada principalmente a demostrar navegación, interacción y representación funcional del sistema. Debido a ello, algunas funcionalidades continúan simplificadas o agrupadas dentro de una misma interfaz.

Asimismo, varias interacciones actualmente funcionan mediante estados locales y datos simulados, permitiendo representar el comportamiento esperado del sistema sin implementar todavía backend, persistencia avanzada o autenticación definitiva.

La finalidad de esta estructura es facilitar futuras iteraciones del proyecto, permitiendo posteriormente separar módulos más complejos, integrar bases de datos reales y mejorar la organización interna del sistema conforme avance el desarrollo del producto final.
