
  # Utorías Dashboard

# Instalación del proyecto

Primero se debe descargar y extraer el proyecto dentro de una carpeta deseada del sistema.

Una vez extraído el contenido, se debe abrir una terminal dentro de la carpeta principal del proyecto, donde se encuentra el archivo:

```bash
package.json
```

---

# Instalación de dependencias

Para instalar todas las dependencias necesarias del proyecto se utiliza:

```bash
npm install
```

Este comando instalará automáticamente React, TailwindCSS, Vite y las demás librerías utilizadas dentro del sistema.

---

# Instalación de navegación

Para permitir la navegación entre páginas del sistema se instaló React Router utilizando:

```bash
npm install react-router-dom
```

---

# Ejecución del proyecto

Una vez finalizada la instalación, el proyecto puede iniciarse utilizando:

```bash
npm run dev
```

Posteriormente Vite entregará una dirección local similar a:

```bash
http://localhost:5173
```

Desde esa dirección es posible acceder al PMN desde el navegador.

---

# Estructura básica de carpetas

```bash
src/
│
├── app/
│
├── components/
│
├── pages/
│
├── data/
│
└── styles/
```

---

# Descripción de carpetas

## app/

Contiene la estructura principal de la aplicación y la configuración general del sistema.

---

## components/

Incluye componentes reutilizables como:

* botones,
* tablas,
* cards,
* inputs,
* badges,
* formularios.

---

## pages/

Contiene las páginas principales del PMN:

* dashboard,
* solicitudes,
* vista del tutor,
* formularios.

---

## data/

Contiene los datos simulados o mock utilizados durante esta etapa del prototipo.

---

## styles/

Incluye los archivos de estilos globales y configuración visual del sistema.

---

# Consideraciones del PMN

Actualmente el sistema funciona utilizando datos locales simulados, sin conexión a bases de datos reales ni backend definitivo. Esto permite centrarse principalmente en:

* navegación,
* interacción,
* representación de estados,
* y demostración funcional del sistema.

El objetivo de esta versión es representar el funcionamiento esperado de la plataforma antes de avanzar hacia una implementación completa.
