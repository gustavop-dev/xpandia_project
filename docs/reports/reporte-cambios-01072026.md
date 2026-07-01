# Reporte de cambios — Revisión de feedback (1 Julio 2026)

A continuación, el detalle de cada punto revisado, con el estado actualizado.

**Convenciones:**
- 🐞 = bug reportado
- 💡 = requerimiento / mejora de UX
- ✅ Atendido | ⏭️ Fuera de alcance | ⚠️ Parcial | 🔄 En curso

---

## 1. Módulo Formulario de Contacto

Todos los cambios de esta revisión aplican a la página pública de contacto (`https://xpandia.global/contact` y su versión en español `https://xpandia.global/es/contact`). No requieren inicio de sesión.

### 1.1 ✅ Atendido — 🐞 Los botones "QUICK START" no daban feedback al seleccionarlos
> "Recuadros Inactivos… no resalta el color azul. Al ver inicialmente los títulos 'Agenda una llamada de diagnóstico' aparece activo en azul, pero al elegir los siguientes títulos no los activa en el mismo color azul."

**Qué se hizo:** Se reorganizó el bloque de botones "QUICK START" de la columna derecha para que cada botón tenga una acción clara y visible:

- **"Solicita una auditoría"** y **"Solicitar reparación de experiencia"** ahora **se resaltan en azul** al hacer clic, llevan al usuario directamente al formulario (desplazamiento automático) y muestran un aviso ("👇 Completa este formulario…") para orientarlo. Además, la opción elegida queda registrada y viaja en la solicitud (ver punto 1.2).
- **"Agenda una llamada de diagnóstico"** y **"Reservar un ACI Talk"** ahora **abren directamente el calendario de agendamiento (Cal.com)** en una ventana emergente, para que la persona reserve una cita sin necesidad de llenar el formulario.

De esta forma se elimina la sensación de "recuadros inactivos": cada botón responde visualmente y hace algo concreto.

**Antes de probar necesitas:**
- Solo un navegador (no requiere cuenta ni inicio de sesión).
- Abrir `https://xpandia.global/es/contact`.

**Cómo validar que funciona:**
1. Abre `https://xpandia.global/es/contact`.
2. Haz clic en **"Solicita una auditoría"**: el botón se resalta en azul y la página se desplaza hasta el formulario, mostrando un aviso en la parte superior de la tarjeta.
3. Haz clic en **"Solicitar reparación de experiencia"**: se comporta igual (se resalta y baja al formulario).
4. Haz clic en **"Agenda una llamada de diagnóstico"** o **"Reservar un ACI Talk"**: se abre el calendario de agendamiento en una ventana emergente.

---

### 1.2 ✅ Atendido — 🐞 El correo siempre mostraba "Agenda una llamada de diagnóstico"
> "…al enviar el formulario no muestra el servicio solicitado, solamente aparece 'agenda una llamada de diagnóstico'. Que al revisar el correo que llega, aparezca el servicio elegido, ya que siempre sale el mismo… para el ejemplo yo elegí 'Solicita una auditoría'."

**Qué se hizo:** Se corrigió el correo de notificación que llega al equipo cuando alguien envía el formulario:

- **El asunto ahora refleja lo que la persona eligió.** Si hace clic en "Solicita una auditoría" antes de enviar, el asunto llega como **"Audit request — [empresa]"**; si elige "Solicitar reparación de experiencia", llega como **"Language Experience Repair request — [empresa]"**. Si no eligió ninguno de esos botones, el asunto toma el servicio marcado dentro del formulario ("¿Con qué necesitas ayuda?") y, si tampoco hay, un asunto neutro ("New contact request"). Antes, el asunto estaba fijo en "Diagnostic call request" sin importar la elección.
- **El cuerpo del correo ahora muestra nombres legibles.** Antes aparecían códigos internos (por ejemplo `hispanic-messaging-review`); ahora se muestran los nombres reales del servicio y la audiencia ("Hispanic Audience & Messaging Review", "LatAm", etc.).

> Nota: el correo interno de notificación al equipo se genera actualmente **en inglés** (por eso el asunto dice "Audit request" y no "Solicitud de auditoría"). Si se prefiere en español, se puede ajustar como un cambio aparte.

**Antes de probar necesitas:**
- Un navegador para enviar el formulario.
- Acceso a la bandeja de entrada de **nestor@xpandia.global** o **milena@xpandia.global** para revisar el correo que llega.

**Cómo validar que funciona:**
1. Abre `https://xpandia.global/es/contact` y haz clic en **"Solicita una auditoría"**.
2. Completa los campos del formulario (nombre, empresa, correo, etc.) y envíalo.
3. Revisa el correo que llega al equipo: el **asunto** debe decir **"Audit request — [tu empresa]"**.
4. En el cuerpo del correo, confirma que el servicio y la audiencia aparecen con nombres legibles, no con códigos.

---

### 1.3 ✅ Atendido — 💡 Las solicitudes de contacto también deben llegar a milena@
> "Pido tu colaboración, para que por favor al correo milena@xpandia.global le llegue también la información de quienes nos contactan o quede como prioritario." (Milena, correo del 1 de julio)

**Qué se hizo:** Cada vez que alguien envía el formulario de contacto, la notificación ahora llega **tanto a nestor@xpandia.global como a milena@xpandia.global** con todos los datos de quien contacta. Antes solo llegaba a nestor@.

**Antes de probar necesitas:**
- Un navegador para enviar el formulario.
- Acceso a las bandejas de **nestor@xpandia.global** y **milena@xpandia.global**.

**Cómo validar que funciona:**
1. Abre `https://xpandia.global/es/contact`, completa el formulario y envíalo.
2. Revisa la bandeja de **nestor@xpandia.global**: debe llegar la notificación.
3. Revisa la bandeja de **milena@xpandia.global**: debe llegar la misma notificación.

---

## Resumen de cobertura

| Categoría | Total puntos | ✅ Atendidos | ⚠️ Parciales | ⏭️ Fuera de alcance |
|---|---|---|---|---|
| Módulo Formulario de Contacto (1.x) | 3 | 3 | 0 | 0 |
| **TOTAL** | **3** | **3** | **0** | **0** |

Los 3 puntos de esta revisión quedaron atendidos en su totalidad y ya están disponibles en producción. Quedamos atentos a cualquier ajuste o duda sobre algún punto específico.
