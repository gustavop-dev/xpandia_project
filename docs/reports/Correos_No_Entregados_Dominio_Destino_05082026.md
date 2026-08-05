# Reporte de cambios — Correos que no se entregan al escribir a una dirección externa (5 de agosto de 2026)

> Este reporte responde al aviso de Milena González del 4 de agosto de 2026, en el que reenvió los mensajes del "Mail Delivery Subsystem" de Google indicando que un correo no había podido entregarse. Se revisaron los avisos, la configuración de correo del dominio `xpandia.global`, el dominio de destino y los registros del servidor. La conclusión principal es que **no se trata de una falla del sitio web ni del servidor de Xpandia**. Adicionalmente se realizaron dos ajustes preventivos en el sistema.

**Convenciones:**
- 🐞 = bug reportado
- 💡 = requerimiento / mejora de UX
- ❓ = duda del cliente que se aclara
- ✅ Atendido | ⏭️ Fuera de alcance | ⚠️ Parcial | 🔄 En curso

**Ambiente de pruebas:** el correo de Google Workspace de Xpandia (https://mail.google.com, con la cuenta `milena@xpandia.global`) y el formulario de contacto del sitio público https://xpandia.global/es/contact. No se requiere ningún acceso técnico.

**Para todas las pruebas:** conviene abrir el correo en una ventana normal del navegador, ya iniciada la sesión con la cuenta de Xpandia.

---

## Resumen rápido

| Clasificación | Cantidad |
|---|---:|
| ✅ Atendido | 3 |
| **Total puntos** | **3** |

| # | Punto | Estado |
|---|---|---|
| 1 | Los correos a esa dirección no se entregan | ✅ Atendido |
| 2 | La dirección de ejemplo del formulario de contacto usaba un dominio real | ✅ Atendido |
| 3 | Registro interno cuando un envío del formulario falla | ✅ Atendido |

---

## 1. ✅ Atendido — 🐞 Los correos a esa dirección no se entregan

> **Observación del cliente (4 de agosto de 2026, 12:56 p. m.):** "Hola Carlos. Te.xue yo que siguen llegando mensajes." — junto con el aviso reenviado de Google: "El mensaje no se envió. Hubo un problema al entregar tu mensaje a jane@company.com."

**Lo primero, para tranquilidad: no hay nada mal configurado en el correo de Xpandia.** Se verificó el dominio `xpandia.global` y está correcto y completo: los correos entrantes llegan a Google Workspace como corresponde, y los permisos de envío que evitan que los mensajes caigan en spam están publicados. La cuenta `milena@xpandia.global` funciona con normalidad. El problema está **enteramente del otro lado**.

**Qué pasaba:** el mensaje iba dirigido a `jane@company.com`. El dominio `company.com` **no tiene configurado ningún servidor de correo**. Es un sitio web que pertenece a un tercero, y quien lo administra nunca habilitó la recepción de mensajes. En términos simples: esa dirección **no existe como buzón de correo**. Cuando Google intentó entregar el mensaje, terminó tocando la puerta del servidor donde vive esa página web, que atiende visitas de navegador pero no correo, y por eso no hubo respuesta y se agotó el tiempo de espera. Eso es exactamente lo que describía el aviso técnico.

**Por qué llegaron tres avisos y no uno:** no eran tres correos distintos fallando. Era **un solo mensaje** cumpliendo su ciclo. Google no se rinde en el primer intento: reintenta durante aproximadamente 24 horas y va notificando el avance. Por eso llegaron dos avisos de "entrega retrasada" el 3 de agosto (12:42 y 12:50 p. m.) y finalmente el aviso definitivo de "El mensaje no se envió" el 4 de agosto a las 12:55 p. m. — casi exactamente 24 horas después. La sensación de que "siguen llegando mensajes" corresponde a esos avisos sucesivos del mismo envío, no a envíos nuevos que se estén repitiendo.

**Se descartó que algo estuviera reenviando solo:** se revisaron los registros del servidor y del sitio web y **no hay ningún proceso automático reenviando ese correo**. El sitio web tampoco fue el que envió el mensaje: en todo el período revisado (del 22 de julio al 5 de agosto) no se registró ni un solo envío del formulario de contacto. El mensaje salió manualmente desde el correo de Xpandia. Por lo tanto, no hay nada que pausar ni que detener.

**Qué se puede hacer:** dado que la dirección no recibe correo, **el mensaje no se puede reenviar ni recuperar** — no llegará por más que se intente. Si se necesita contactar a esa persona u organización, hay que conseguir una dirección de correo alternativa y válida. Es posible que la dirección haya sido tomada de un ejemplo o escrita por error; ver el punto 2, donde se explica un origen probable y cómo se corrigió.

**Dónde se valida:** https://mail.google.com, en la bandeja de entrada de `milena@xpandia.global`.

**Antes de probar necesitas:**
- La cuenta `milena@xpandia.global` con sesión iniciada.
- Una dirección de correo alternativa que sí funcione, para la prueba de contraste.
- Tener a mano el correo original que se quiso enviar (está en la carpeta **Enviados**).

**Cómo validar que funciona:**
1. Abre https://mail.google.com e inicia sesión con `milena@xpandia.global`.
2. Entra a la carpeta **Enviados** (en el menú de la izquierda) y busca el mensaje dirigido a `jane@company.com`. Vas a comprobar que hay **un solo** mensaje enviado a esa dirección, no varios: eso confirma que los tres avisos de Google correspondían al mismo envío.
3. Redacta un correo de prueba a cualquier dirección que sí funcione (por ejemplo, tu propio correo personal) y envíalo. Debe llegar en segundos y **no** debe aparecer ningún aviso del "Mail Delivery Subsystem". Eso confirma que el correo de Xpandia envía con total normalidad.
4. Si en el futuro vuelve a aparecer un aviso de este tipo, revisa a qué dirección iba dirigido: el aviso siempre la muestra en negrita en la primera línea. Envíanos ese dato y verificamos si el problema es del destino o nuestro.

---

## 2. ✅ Atendido — 💡 La dirección de ejemplo del formulario de contacto usaba un dominio real

**Qué se encontró durante la revisión:** el formulario de contacto del sitio muestra, en gris, textos de ejemplo dentro de cada campo para orientar al visitante sobre qué escribir. En el campo de correo, ese ejemplo era precisamente `jane@company.com` — la misma dirección del mensaje que rebotó. Es muy probable que de allí se haya tomado.

**Por qué era un problema:** un texto de ejemplo debe ser evidentemente ficticio, pero `company.com` es un dominio **real, de un tercero**. Al usarlo como ejemplo se corrían dos riesgos: que alguien lo tomara por una dirección válida y le escribiera (que es lo que ocurrió), y que en pruebas internas del sistema se le enviara un correo automático a un desconocido.

**Qué se hizo:** los ejemplos del formulario ahora usan `example.com`, un dominio **reservado internacionalmente para documentación y ejemplos**. Por norma, no le pertenece a nadie y no puede recibir correo, así que no existe forma de que un ejemplo termine convertido en un envío real. El cambio se aplicó en la versión en inglés y en la versión en español del formulario, y también en las pruebas automáticas del sistema.

**Dónde se ve / URL:** https://xpandia.global/es/contact (y https://xpandia.global/contact en inglés) — sección del formulario, campo **Email corporativo**.

**Antes de probar necesitas:**
- Solo un navegador. No requiere iniciar sesión.
- Conviene usar una ventana de incógnito, para que no se muestre una versión guardada en caché.

**Cómo validar que funciona:**
1. Abre https://xpandia.global/es/contact en una ventana de incógnito.
2. Baja hasta el formulario y ubica el campo **Email corporativo**.
3. Sin escribir nada, observa el texto gris de ejemplo dentro del campo: ahora debe decir **`juana@example.com`**. Antes decía `juana@empresa.com`.
4. Repite en la versión en inglés, https://xpandia.global/contact: el campo **Corporate email** debe mostrar **`jane@example.com`**. Antes decía `jane@company.com`.

---

## 3. ✅ Atendido — 💡 Registro interno cuando un envío del formulario falla

**Qué se encontró:** cuando alguien completa el formulario de contacto, el sistema envía dos correos: el aviso interno a Xpandia con los datos del interesado, y una confirmación automática al interesado. Si esa **confirmación automática** fallaba, el sistema no dejaba ninguna constancia: el fallo pasaba completamente inadvertido.

**Qué se hizo:** ahora cada fallo de envío queda registrado internamente con el detalle del motivo y la dirección afectada. Esto permite detectar una interrupción del servicio de correo por nuestra cuenta, sin depender de que alguien lo note y lo reporte. **El comportamiento para el visitante no cambia:** si su solicitud llegó a Xpandia, sigue viendo el mensaje de confirmación en pantalla, incluso si la confirmación automática por correo no pudo salir. Lo importante — que el contacto llegue — está garantizado.

**Una aclaración sobre el alcance:** este registro detecta los fallos **inmediatos**. Los rebotes como el del punto 1 son distintos: Google los informa hasta 24 horas después y los envía al buzón de la persona que escribió, no al sistema. Por eso, ese tipo concreto de aviso seguirá llegando al correo de Milena y conviene reenviárnoslo cuando aparezca, tal como se hizo esta vez. Queda anotado como una posible mejora futura si se desea automatizar.

**Dónde se ve / URL:** https://xpandia.global/es/contact — el efecto es interno, pero se valida comprobando que el formulario sigue funcionando con normalidad.

**Antes de probar necesitas:**
- Un navegador y una dirección de correo propia que funcione, para recibir la confirmación.

**Cómo validar que funciona:**
1. Abre https://xpandia.global/es/contact.
2. Completa el formulario con datos de prueba, usando **tu propia dirección de correo** en el campo **Email corporativo**.
3. Presiona el botón **Enviar solicitud** al final del formulario. Debe aparecer en pantalla el mensaje **"✓ Solicitud recibida — responderemos dentro de 24 horas"**.
4. Revisa la bandeja de `milena@xpandia.global`: debe llegar el aviso interno con los datos que escribiste.
5. Revisa tu propia bandeja: debe llegar la confirmación automática "Recibimos tu solicitud — Xpandia".

---

## Cierre

| Categoría | Total puntos | ✅ Atendidos | ⚠️ Parciales | ⏭️ Fuera de alcance |
|---|---|---|---|---|
| Correo y entregabilidad | 1 | 1 | 0 | 0 |
| Formulario de contacto | 2 | 2 | 0 | 0 |
| **TOTAL** | **3** | **3** | **0** | **0** |

**En resumen:** el correo no se entregó porque la dirección de destino no existe como buzón de correo, algo que depende de un tercero y que no se puede corregir desde Xpandia ni desde nuestro servidor. El correo de Xpandia está sano y funcionando. Aprovechando la revisión, corregimos el ejemplo del formulario que probablemente originó la confusión y agregamos un registro interno para detectar fallos de envío a tiempo.

**Recomendación:** si necesitan contactar a esa persona u organización, conviene confirmar con ella su dirección de correo real por otro medio (teléfono, LinkedIn o su formulario de contacto) antes de volver a escribir. Y si vuelve a llegar un aviso del "Mail Delivery Subsystem", reenvíenoslo como lo hicieron ahora: con esa información podemos determinar en minutos si el problema es del destino o nuestro.

Quedamos atentos a cualquier duda o ajuste.
