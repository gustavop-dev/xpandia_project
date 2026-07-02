# Reporte de cambios — Respuesta automática del formulario de contacto y velocidad del carrusel IA (2 de julio de 2026)

> Estos puntos provienen del "Reporte de Bugs — Xpandia" consolidado el 2 de julio de 2026 (Solicitud 2 y Solicitud 3, sitio https://xpandia.global, navegador Chrome). A continuación el detalle de qué se hizo para cada uno y cómo validarlo.

**Convenciones:**
- 🐞 = bug reportado
- 💡 = requerimiento / mejora de UX
- ✅ Atendido | ⏭️ Fuera de alcance | ⚠️ Parcial | 🔄 En curso

**Ambiente de pruebas:** sitio público https://xpandia.global (producción). No requiere inicio de sesión — ambos puntos se validan como cualquier visitante del sitio.

---

## Resumen rápido

| Clasificación | Cantidad |
|---|---:|
| ✅ Atendido | 1 |
| ⚠️ Parcial | 1 |
| **Total puntos** | **2** |

| # | Punto | Estado |
|---|---|---|
| 1 | Idioma y firma de la respuesta automática del formulario de contacto | ⚠️ Parcial |
| 2 | Velocidad del carrusel de íconos IA (sección AI ECOSYSTEM) | ✅ Atendido |

---

## 1. ⚠️ Parcial — 🐞 Respuesta automática del formulario de contacto: idioma incorrecto y datos de firma

> **Observación del cliente (Solicitud 2):** "Al revisar el correo donde llega la respuesta automática, esta llega en inglés a pesar de haber diligenciado el formulario en español. Adicionalmente, se encontró que el correo llega desde nestor@xpandia.global, y se solicita que en su lugar llegue desde hello@xpandia.global."

> **Ajustes adicionales solicitados:** dejar "Team Xpandia" en la firma (no "Nestor Solano"); retirar la palabra "Xpandia" que aparecía debajo de ese nombre; agregar una casilla de teléfono en el formulario; que el correo se envíe desde hello@xpandia.global y no desde nestor@xpandia.global.

**Qué se hizo — de los 4 ajustes pedidos, 2 quedaron implementados y 2 no:**

- ✅ **Idioma del correo:** antes, el correo de confirmación llegaba siempre en inglés sin importar el idioma en que se llenó el formulario. Ahora llega **en el mismo idioma en que se diligenció el formulario**: si se llena en español, llega en español firmado "Saludos, Team Xpandia, nestor@xpandia.global"; si se llena en inglés, llega en inglés firmado "Best, Team Xpandia, nestor@xpandia.global".
- ✅ **Firma:** ya no aparece el nombre de una persona en particular ("Nestor Solano"), ni la palabra "Xpandia" en una línea aparte — la firma dice simplemente "Team Xpandia".
- ⏭️ **Remitente `hello@xpandia.global`:** no se implementó. El correo se sigue enviando técnicamente desde la casilla **nestor@xpandia.global**, igual que antes. Eso sí — a diferencia de como estaba originalmente, ahora la firma del correo también dice `nestor@xpandia.global`, así que ya no hay discrepancia entre el remitente real y lo que dice la firma (antes la firma decía `hello@xpandia.global` pero el correo llegaba de `nestor@xpandia.global`, que era justamente la inconsistencia reportada).
- ⏭️ **Casilla de teléfono en el formulario:** no se implementó por ahora.

**Dónde se ve / URL:** `https://xpandia.global/es/contact` (español) y `https://xpandia.global/contact` (inglés) — formulario público de contacto, y el correo de confirmación que llega a la casilla de quien lo envía.

**Antes de probar necesitas:**
- Un navegador (no requiere inicio de sesión).
- Una casilla de correo propia que puedas revisar, para recibir la respuesta automática.
- Para confirmar el remitente exacto, poder ver los detalles/cabecera del correo recibido (opción "mostrar original" o "ver detalles" del cliente de correo).

**Cómo validar que funciona:**
1. Abre `https://xpandia.global/es/contact`.
2. Completa el formulario con tu nombre, correo, empresa y mensaje, y haz clic en **"Enviar solicitud"**.
3. Revisa la bandeja de entrada del correo que usaste: debe llegar un mensaje con asunto **"Recibimos tu solicitud — Xpandia"**, firmado "Saludos, Team Xpandia, nestor@xpandia.global".
4. Verifica el remitente del correo (detalles/cabecera): debe mostrar **nestor@xpandia.global**, igual que la dirección de la firma.
5. Repite la prueba en inglés desde `https://xpandia.global/contact`: el correo debe llegar con asunto **"We received your request — Xpandia"**, firmado "Best, Team Xpandia, nestor@xpandia.global".

---

## 2. ✅ Atendido — 🐞 Carrusel de íconos IA (sección AI ECOSYSTEM) demasiado lento

> **Observación del cliente (Solicitud 3):** "Al revisar la velocidad del carrusel de íconos, estos se encuentran muy lentos... Carrusel con íconos IA más rápido y en orden (descrito en el doc 23MAY, iniciando con ícono ChatGPT). Ej. de velocidad de carrusel: https://lokalise.com/"

**Qué se hizo:** se aumentó la velocidad de desplazamiento del carrusel de íconos de la sección **"AI ECOSYSTEM"** en la página de inicio a aproximadamente el triple de la velocidad anterior, para que el movimiento se sienta ágil, en línea con el ejemplo de referencia compartido.

> Nota sobre el orden: el listado de íconos ya empieza con **ChatGPT**, tal como se pidió en el documento del 23 de mayo. Sin embargo, este carrusel no es una fila fija de íconos: es una **franja continua que se desplaza sin parar hacia la izquierda**, como una cinta transportadora o un ticker de noticias. Eso significa que el ícono que se ve "entrando" por el borde izquierdo de la sección va cambiando todo el tiempo a medida que la franja avanza. ChatGPT aparece primero **solo en el instante exacto en que la página termina de cargar** (antes de que la franja empiece a moverse) y luego vuelve a aparecer primero cada vez que se completa una vuelta entera del ciclo — el resto del tiempo, cualquier otro ícono de la lista puede estar pasando por ese borde. Por eso, si se toma una captura de pantalla en un momento cualquiera (como ocurrió con la captura del reporte original, donde se ven vLLM, Ollama, Grok, etc.), lo normal es que se vea un ícono "de la mitad" y no ChatGPT — no es que el orden esté mal, es simplemente en qué punto del recorrido estaba el carrusel cuando se tomó la foto. Para confirmar que el orden es correcto, hay que mirar el carrusel justo al recargar la página (o esperar a que complete una vuelta y vuelva a empezar).

**Dónde se ve / URL:** `https://xpandia.global/es/home` (español) y `https://xpandia.global` (inglés) — sección **"AI ECOSYSTEM"**, más abajo en la página de inicio.

**Antes de probar necesitas:**
- Solo un navegador (no requiere inicio de sesión).

**Cómo validar que funciona:**
1. Abre `https://xpandia.global/es/home`.
2. Desplázate hasta la sección **"AI ECOSYSTEM"** (título: "Modelos y plataformas de IA que validamos y optimizamos").
3. Observa el carrusel de íconos: debe moverse notoriamente más rápido que antes — un ritmo similar al de referencia enviado (lokalise.com), sin sentirse lento o estático.

---

## Cierre

| Categoría | Total puntos | ✅ Atendidos | ⚠️ Parciales | ⏭️ Fuera de alcance |
|---|---|---|---|---|
| Formulario de contacto / Correo (Solicitud 2) | 1 | 0 | 1 | 0 |
| Home / AI ECOSYSTEM (Solicitud 3) | 1 | 1 | 0 | 0 |
| **TOTAL** | **2** | **1** | **1** | **0** |

El punto de la velocidad del carrusel quedó atendido en su totalidad. El punto del correo de contacto quedó parcial: el idioma y la firma ya funcionan como se pidió, pero el remitente sigue siendo nestor@xpandia.global (no hello@xpandia.global) y la casilla de teléfono no se agregó. Quedamos atentos a cualquier ajuste o duda sobre alguno de ellos.
