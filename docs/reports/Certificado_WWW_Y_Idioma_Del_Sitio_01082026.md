# Reporte de cambios — Acceso con "www" y contenido en inglés dentro del sitio en español (1 de agosto de 2026)

> El primer punto proviene de la "Solicitud del 4 de julio de 2026" (sitio https://xpandia.global, navegador Chrome, incidente reportado el 31 de julio a las 9:35 a. m.). El segundo surge de una revisión del selector de idioma solicitada en paralelo. Ambos puntos quedaron atendidos y ya están publicados en el sitio.

**Convenciones:**
- 🐞 = bug reportado
- 💡 = requerimiento / mejora de UX
- ❓ = duda del cliente que se aclara
- ✅ Atendido | ⏭️ Fuera de alcance | ⚠️ Parcial | 🔄 En curso

**Ambiente de pruebas:** sitio público https://xpandia.global (producción). No requiere inicio de sesión — todo se valida como cualquier visitante.

**Para todas las pruebas:** conviene abrir una ventana de incógnito, para que el navegador no muestre una versión guardada en caché de antes de los cambios.

---

## Resumen rápido

| Clasificación | Cantidad |
|---|---:|
| ✅ Atendido | 2 |
| **Total puntos** | **2** |

| # | Punto | Estado |
|---|---|---|
| 1 | Error de seguridad al ingresar con "www" (certificado SSL) | ✅ Atendido |
| 2 | Textos en inglés dentro del sitio en español | ✅ Atendido |

---

## 1. ✅ Atendido — 🐞 Error de seguridad al ingresar con "www"

> **Observación del cliente (Solicitud del 4 de julio):** "Indicamos que el DNS en Namecheap ya quedó configurado conectando el CNAME de www al dominio principal xpandia.global. Sin embargo, al ingresar con 'www' aparece el error de seguridad (falta de certificado SSL)."

**Aclaración importante: la configuración que ustedes hicieron en Namecheap estaba correcta.** Verificamos que el CNAME de `www` apunta bien al dominio principal y que resuelve al servidor correcto. Lo que faltaba estaba de nuestro lado, en el servidor, y por eso el problema persistía aunque el DNS estuviera bien.

**Qué pasaba:** el certificado de seguridad del sitio cubría únicamente `xpandia.global`, sin incluir `www.xpandia.global`. Además, el servidor no tenía ninguna configuración para atender esa dirección. Cuando alguien escribía "www", el navegador pedía una conexión segura para un nombre que el certificado no amparaba, y por eso Chrome mostraba la pantalla **"Este sitio no admite una conexión segura"**.

**Qué se hizo:**

- **Certificado reemitido cubriendo ambas direcciones.** Ahora el mismo certificado ampara `xpandia.global` y `www.xpandia.global`, de modo que ninguna de las dos genera advertencia de seguridad.
- **Redirección automática de "www" al dominio principal.** Quien entre con "www" llega al sitio normal: el navegador lo lleva de forma automática y permanente a `https://xpandia.global`, conservando la página que pidió. Es decir, `www.xpandia.global/es/services` abre directamente la página de servicios en español. Esto también evita que el sitio quede duplicado en dos direcciones distintas, algo que perjudica el posicionamiento en buscadores.
- **Redirección a conexión segura.** Cualquier intento de entrar sin seguridad (con `http://`, con o sin "www") se redirige automáticamente a la versión segura `https://`.
- **Renovación automática del certificado corregida.** Al revisar el servidor detectamos que la renovación automática no se estaba completando; de haber seguido así, el certificado habría vencido a finales de agosto y el sitio habría quedado mostrando advertencias de seguridad. Quedó corregida y verificada: el certificado actual es válido hasta el **30 de octubre de 2026** y se renovará solo de ahí en adelante.

**Dónde se ve / URL:** https://www.xpandia.global — y cualquier página del sitio anteponiendo "www".

**Antes de probar necesitas:**
- Cualquier navegador. Recomendado: ventana de incógnito, para evitar que Chrome muestre la advertencia que guardó en memoria de días anteriores.
- No se requiere usuario ni contraseña.

**Cómo validar que funciona:**
1. Abre una ventana de incógnito y escribe `https://www.xpandia.global` en la barra de direcciones.
2. Verifica que **no** aparece la pantalla "Este sitio no admite una conexión segura" ni el aviso "No es seguro" junto a la dirección.
3. Observa que el sitio carga normalmente y que la barra de direcciones queda mostrando `https://xpandia.global` — la redirección es automática y esperada.
4. Haz clic en el candado que aparece a la izquierda de la dirección: debe indicar que la conexión es segura.
5. Para comprobar que la redirección conserva la página, escribe `https://www.xpandia.global/es/services`: debe abrir la página de servicios en español en `https://xpandia.global/es/services`.

---

## 2. ✅ Atendido — 🐞 Textos en inglés dentro del sitio en español

> **Punto revisado:** validar que, al seleccionar el idioma en el botón **ES** del encabezado, todo el contenido de la página se muestre efectivamente en español.

**Qué pasaba:** el cambio de idioma en sí funcionaba correctamente — al elegir **ES** el sitio pasaba a español. El problema estaba en el contenido: quedaban textos sin traducir y un nombre de servicio equivocado. Se revisó el sitio completo y se corrigieron cinco puntos.

**Qué se hizo:**

- **Página de "página no encontrada".** Cuando alguien llegaba a una dirección que no existe estando en el sitio en español, la página de error aparecía **completa en inglés** ("Page not found"), y su botón de regreso lo devolvía al sitio en **inglés**, no al español. Ahora el mensaje aparece en español ("Página no encontrada") y el botón devuelve al inicio del sitio en español.
- **Menú principal.** La primera opción del menú decía **"Home"** en el sitio en español, tanto en la versión de computador como en el menú desplegable del celular. Ahora dice **"Inicio"**.
- **Nombre de un servicio.** En la página de servicios en español, el servicio aparecía como **"English-speaking Audience & Messaging Review"**, mientras que en el resto del sitio —página de inicio, página de Applied Cultural Intelligence y formulario de contacto— el mismo servicio figura como **"Hispanic Audience & Messaging Review"**. Se unificó al nombre correcto en todas partes.
- **Descripciones de Experience Repair & Adaptation.** Tres descripciones de esa página seguían en inglés. Ahora están en español.
- **Artículos del blog sin traducción.** Si un artículo se publicaba con contenido solo en inglés, el sitio en español lo mostraba igual, con el texto en inglés. Ahora un artículo aparece en la sección en español únicamente cuando tiene su versión en español cargada; mientras no la tenga, se muestra solo en el sitio en inglés. Adicionalmente, las etiquetas de categoría y autor de cada artículo (por ejemplo "Localization" o "Xpandia Team") ahora se muestran traducidas cuando se navega en español.

**Dónde se ve / URL:** https://xpandia.global/es y las páginas internas del sitio en español.

**Antes de probar necesitas:**
- Cualquier navegador, preferiblemente en ventana de incógnito.
- No se requiere usuario ni contraseña.

**Cómo validar que funciona:**
1. Abre https://xpandia.global y, en el encabezado, haz clic en el botón **ES** (a la derecha, junto al botón "Talk to an Expert"). La dirección debe cambiar a `https://xpandia.global/es`.
2. Revisa el menú superior: la primera opción debe decir **Inicio** (antes decía "Home").
3. Abre https://xpandia.global/es/services y baja hasta la sección de soluciones. Busca el servicio de audiencias: debe decir **"Hispanic Audience & Messaging Review"**.
4. Abre https://xpandia.global/es/services/localization-adaptation y revisa los tres bloques que aparecen debajo del título principal: sus descripciones deben estar en español (por ejemplo, "Copy de UI, onboarding, formularios, errores, flujos y contenido de producto de cara al usuario").
5. Para probar la página de error, escribe una dirección inexistente dentro del sitio en español, por ejemplo `https://xpandia.global/es/pagina-que-no-existe`. Debe aparecer el mensaje **"Página no encontrada."** en español.
6. En esa misma página, haz clic en el botón **Volver al inicio**: debe llevarte a `https://xpandia.global/es`, es decir, al sitio en español y no al inglés.

---

## Cierre

| Categoría | Total puntos | ✅ Atendidos | ⚠️ Parciales | ⏭️ Fuera de alcance |
|---|---|---|---|---|
| Seguridad y acceso al sitio | 1 | 1 | 0 | 0 |
| Contenido e idioma | 1 | 1 | 0 | 0 |
| **TOTAL** | **2** | **2** | **0** | **0** |

Ambos puntos están publicados y verificados en el sitio. Quedamos atentos a cualquier duda o ajuste adicional que quieran revisar.
