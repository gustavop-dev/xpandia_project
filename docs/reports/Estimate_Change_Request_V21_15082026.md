# Estimate: Xpandia Website Change Request v21 — 15082026

> **ProjectApp · Calculadora de Requerimientos** — cotización por funcionalidad para implementación web, precios en COP más IVA.
> **Cliente:** Xpandia (xpandia.global) · **Vigencia:** precios válidos por 30 días desde la fecha del título.

## 1. Resumen

Xpandia solicitó 30 cambios numerados (W-01 a W-30) sobre su sitio ya publicado. De ellos, **27 son requerimientos nuevos, con costo**, y **3 son defectos de nuestra implementación que asumimos sin costo**.

| | |
|---|---|
| **Valor total** | **$4.400.000 + IVA** |
| Esfuerzo | 367 horas |
| Plazo | 4 semanas desde el anticipo |
| Forma de pago | 50% al inicio y 50% contra entrega de cada etapa (sección 6) |
| Descuento aplicado | 20%, ya incorporado en cada línea |

El trabajo se organiza en cuatro etapas. La razón por la que este paquete cuesta menos de lo que su alcance sugiere está en la sección 2: el sitio lo construimos nosotros y buena parte de la maquinaria que estos cambios necesitan ya está hecha, probada y funcionando. Lo que se cobra es el trabajo que realmente queda por hacer.

## 2. Qué ya existe y se reutiliza

Antes de cotizar revisamos el proyecto pieza por pieza para separar lo que hay que construir de lo que ya está construido. Este es el resultado, y es la base del precio.

### Capacidades ya construidas que este paquete aprovecha

| Capacidad ya disponible | Qué significa para estos cambios |
|---|---|
| **Sistema de diseño completo** — 22 colores definidos, escala tipográfica de 10 tamaños, 48 estilos de componente (botones, tarjetas, listas, tablas, formularios) y su comportamiento en móvil, tablet y escritorio ya resueltos | No hay que diseñar ni escribir estilos nuevos. Un bloque nuevo se arma con piezas que ya existen y ya se ven bien en las tres pantallas |
| **Animaciones de entrada automáticas** | Cualquier bloque nuevo hereda las animaciones del sitio sin trabajo adicional |
| **Estructura de página** — encabezado, pie, selector de idioma, metadatos y etiquetas para buscadores | Una página nueva las recibe automáticamente. No se rehace nada de eso |
| **Contenido separado del código** — todos los textos y listas del sitio viven en archivos de contenido bilingües | Cambiar textos, o agregar y quitar elementos de una lista, no requiere programar. Esto es lo que abarata casi todo el paquete |
| **Calendario de reservas ya integrado** | Cambiar el evento son dos líneas y llevarlo al resto del sitio, una. No se integra desde cero |
| **Mecanismo de redirecciones** | Cambiar la dirección de Experience Repair sin perder posicionamiento son dos entradas de configuración |
| **Blog completo y probado** — contenido bilingüe, paginación, buscadores, once tipos de bloque (texto, listas, citas, imágenes, tablas, código, video, llamados a la acción) e índice de contenidos automático, con un panel de carga que trae plantilla y guía | Publicar los cuatro artículos es cargar contenido, no programar. No falta una sola línea de código |
| **Formulario de contacto** — envío, correo de notificación, respuesta automática bilingüe y manejo de errores | Reducir los campos no toca nada de eso: sigue funcionando igual |
| **Base para las páginas legales** — ya existe el molde de página larga bilingüe, el componente que renderiza contenido estructurado con índice, y un pie de página que admite enlaces nuevos sin rediseñarlo | De todo lo legal, lo único genuinamente nuevo es el aviso de cookies |
| **Verificación automática** — 226 pruebas de servidor, 252 de interfaz y 48 de recorrido completo en tres tamaños de pantalla, con datos de prueba y utilidades ya montados | No hay que construir cómo se prueba; sólo actualizar lo que cambie |

### Dónde no hay nada que reutilizar

Somos igual de explícitos con lo contrario, porque es lo que explica por qué algunas líneas no bajan de precio:

| Frente sin reutilización | Por qué cuesta lo que cuesta |
|---|---|
| **Composición de bloques** | Los bloques de las páginas están escritos uno por uno, no como piezas intercambiables. Crear un bloque nuevo es copiar uno parecido y adaptarlo, no invocarlo. Es el trabajo real de las reescrituras de página |
| **Actualización de las pruebas** | Cerca de 18 archivos y unas 60 verificaciones dependen de los nombres de servicio actuales, de las direcciones y de los campos del formulario. Cambiarlos obliga a actualizarlas una por una |
| **Enlaces escritos uno por uno** | Hay 33 enlaces al formulario de contacto repartidos en 9 archivos y 16 enlaces a páginas de servicio en 6 archivos. Por eso la auditoría de botones de W-18 es un barrido real y no una revisión rápida |
| **Aviso de cookies** | No existe ningún componente de consentimiento en el proyecto. Es lo único de W-19 que se construye desde cero |
| **Los tres assets visuales de W-28** | Son piezas nuevas. Sólo se reutiliza el patrón del scorecard que ya está en el Home |

### Cómo se refleja en el precio

Cada línea se cotizó según cuánto de ella ya está resuelto. Las líneas que sólo requieren cargar contenido o editar textos quedaron cerca de la mitad de lo que costaría construirlas desde cero; las reescrituras de página bajaron alrededor de un 40%; los barridos de enlaces y el control de calidad final casi no bajan, porque son trabajo manual que ninguna infraestructura evita.

## 3. Descomposición por funcionalidad

### Etapa 0 — Inmediato: calendario y Home

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-01 + W-20 · Home: reestructura de 8 a 6 bloques con copy nuevo bilingüe y reducción de 30–40% del texto | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 28 h | $335.000 |
| W-02 · Calendario: evento definitivo, organizador y notificaciones, más botones y rutas rápidas en cuatro vistas | M | "Integrar un componente de terceros en el FE — mapa embebido, editor WYSIWYG, date-range picker, tabla avanzada, reCAPTCHA, recorte de imagen, widget de chat" | 21 h | $250.000 |
| W-21 · Cobertura de 20 locales: bloque compacto y expandible en Home, listado completo en páginas internas | S | "Tabs / acordeón / secciones colapsables — reorganizar una vista existente" | 15 h | $175.000 |
| W-04 + W-05 · Muestra ilustrativa: cambio a 300 outputs y etiquetado en dos vistas | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 7 h | $80.000 |
| W-08 · Carrusel de IA: reemplazo de los claims de dominio y garantía | XS | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | 3 h | $30.000 |
| W-14 · Credenciales del fundador: 15+ años y retiro de la mención a Fortune 500 | XS | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | 3 h | $30.000 |
| **Subtotal Etapa 0** | | | **77 h** | **$900.000** |

### Etapa 1 — Correcciones y consistencia

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-07 · Correcciones editoriales del sitio, pendientes de la lista del cliente | S ⚠️ | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | 9 h | $110.000 |
| W-03 · Formulario de contacto: reducción de 12 a 7 campos, en interfaz, servidor y correos | S | "Retiro controlado de un comportamiento ya entregado — eliminar un endpoint/acción y su UI, reescribiendo las pruebas que lo cubrían" | 8 h | $90.000 |
| W-29 · Retiro del anclaje de USD 500 y unificación de los precios publicados | S | "Retiro controlado de un comportamiento ya entregado — eliminar un endpoint/acción y su UI, reescribiendo las pruebas que lo cubrían" | 7 h | $80.000 |
| **Subtotal Etapa 1** | | | **24 h** | **$280.000** |

Esta etapa incluye además los tres puntos que corregimos sin costo, detallados más abajo.

### Etapa 2 — Páginas de servicio

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-28 · Assets visuales nuevos: antes y después, Decision Context Canvas y mapa de los 20 locales | M ⚠️ | Sin señal — por analogía con el Quality Scorecard ya construido (bloque visual ilustrativo estático a medida) | 33 h | $405.000 |
| W-10 + W-11 + W-12 + W-24 · Language Assurance: alcance del sprint, sin acceso a sistemas, mejor fit y flujo AISQAAS de cinco pasos | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 28 h | $345.000 |
| W-25 · Experience Repair: nombre canónico, nueva dirección web con redirección y bloque de acceptance review | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 28 h | $335.000 |
| W-26 · Applied Cultural Intelligence: reenfoque desde la decisión de negocio y marco de hechos, hipótesis y desconocidos | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 27 h | $320.000 |
| W-13 + W-22 · Servicios: reestructura como selector de ruta con jerarquía del sprint | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 24 h | $290.000 |
| W-23 · Validación local como hilo conductor, con función distinta por servicio, en seis vistas | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 13 h | $150.000 |
| **Subtotal Etapa 2** | | | **153 h** | **$1.845.000** |

### Etapa 3 — Institucional y cierre

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-30 · Control de calidad final: escritorio y móvil, ambos idiomas, enlaces, formulario, calendario y metadatos | M | "Tarea técnica no funcional pedida como requerimiento — actualizar framework, migrar hosting, SSL/dominio, optimización puntual: se clasifica y cotiza aparte del roadmap funcional" | 35 h | $440.000 |
| W-19 · Legales: privacidad, aviso legal y aviso de gestión de cookies | M | "Términos y condiciones con aceptación versionada / consentimientos — registrar quién aceptó qué versión y cuándo (Habeas Data básico)" | 26 h | $315.000 |
| W-27 · Nosotros: simplificación, red de reviewers y modelo operativo | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 24 h | $290.000 |
| W-18 · Auditoría de todos los botones, rutas rápidas y anclas del sitio | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 15 h | $175.000 |
| W-16 · Blog: publicación de la serie inicial de cuatro artículos en ambos idiomas | S ⚠️ | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica). Incluye actualizar el contenido de una página estática existente" | 7 h | $80.000 |
| W-17 · Pie de página: LinkedIn, PBX, ciudad y correo corporativo | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 6 h | $75.000 |
| **Subtotal Etapa 3** | | | **113 h** | **$1.375.000** |

### Lo que corregimos sin costo

Estos tres puntos son defectos de nuestra implementación, no requerimientos nuevos. Se ejecutan dentro de la Etapa 1 y no suman al total.

| Solicitud | Qué es | Nivel | Valor |
|---|---|---|---|
| W-15 | El botón "Ver metodología" lleva al formulario de contacto en lugar de bajar a la metodología de esa misma página. Es el único fallo funcional real del documento | S | Sin costo |
| W-06 | El mismo servicio aparece con seis nombres distintos entre menú, pie de página, tablas y páginas de servicio | S | Sin costo |
| W-09 | Emoji en el aviso del formulario de Contacto | XS | Sin costo |

### Implicaciones técnicas

- **W-01 + W-20 (Home).** Los enlaces de las tarjetas de servicio hoy se emparejan por posición con el contenido: al reordenar los bloques hay que romper ese acoplamiento o los botones apuntan al servicio equivocado. La reducción de 30–40% del texto es una decisión de diseño, no un recorte mecánico.
- **W-02 (calendario).** El evento actual no es el solicitado y el calendario sólo está integrado en Contacto. Dos de las cuatro rutas rápidas hoy bajan al formulario en vez de abrir el calendario, y se recablean aquí. El organizador genérico puede no ser posible en la plataforma: si no lo es, se informa antes de publicar.
- **W-21 (20 locales).** Un solo bloque con dos presentaciones reutilizado en cuatro vistas: se construye una vez y se reutiliza, no se maqueta cuatro veces.
- **W-03 (formulario).** El formulario no guarda datos, así que retirar campos no obliga a decidir sobre información histórica. Sí rompe las pruebas que hoy verifican los 12 campos.
- **W-25 (Experience Repair).** Cambiar la dirección web sin perder posicionamiento es barato porque el mecanismo ya existe. Lo que cuesta es que el cambio de ruta rompe las pruebas del pie de página, de la página y del mapa de recorridos.
- **W-23 (validación local).** Es la pieza transversal del paquete: su costo escala con el número de vistas donde se integra, no con su tamaño individual.
- **W-19 (legales).** El contenido lo entrega Xpandia. Se cotiza la implementación de las páginas, el aviso de cookies y su comportamiento en todo el sitio.
- **W-30 (control de calidad).** Sólo tiene sentido ejecutarlo al cierre: adelantarlo obliga a repetirlo.

## 4. Dependencias

Dos tipos: las internas fijan el orden de ejecución; las del cliente bloquean el arranque de esa línea hasta recibir el insumo.

| Dependencia | Tipo | Qué bloquea | Cómo se resuelve |
|---|---|---|---|
| La unificación de nombres de servicio (W-06) debe estar aplicada antes de reescribir las páginas de servicio | Interna | Etapa 2 completa | Se ejecuta en la Etapa 1, sin costo. Si se invierte el orden, el trabajo de las páginas se hace dos veces |
| La nueva dirección de Experience Repair (W-25) debe existir antes de auditar enlaces | Interna | W-18, W-30 | La Etapa 2 precede a la Etapa 3 |
| El calendario debe estar montado en todo el sitio (W-02) antes de auditar los botones | Interna | W-18 | La Etapa 0 precede a la Etapa 3 |
| El control de calidad final (W-30) sólo puede correr sobre el sitio ya terminado | Interna | Cierre del proyecto | Es la última línea de la Etapa 3 |
| Los assets visuales (W-28) deben existir antes del control de calidad de la Etapa 3 | Interna | W-30 | Van en la Etapa 2 |
| Lista exacta de correcciones editoriales | Cliente | W-07 | Xpandia la entrega. El documento las menciona pero no las enumera |
| Textos legales aprobados de privacidad, aviso legal y cookies | Cliente | W-19 | Xpandia los entrega. El propio documento indica que no debemos redactarlos |
| Enlaces de LinkedIn de Néstor Solano, Sandra Milena González y la página de empresa | Cliente | W-17 | Xpandia entrega las direcciones |
| Los cuatro artículos del blog en ambos idiomas, con sus imágenes de portada | Cliente | W-16 | Xpandia los entrega. Si no habrá al menos tres, se retira el blog del menú y la línea baja a $30.000 |
| Acceso a la cuenta de Cal.com, o configuración desde su lado | Cliente | W-02 | Se requiere para dejar el organizador como Xpandia y las notificaciones en hello@xpandia.global |
| Definición de quién diseña los tres assets visuales | Cliente | W-28 | Cotizado asumiendo que los diseñamos nosotros. Si Xpandia entrega el diseño, esa línea baja a $285.000 |
| Cuál de los dos precios publicados de ACI es el válido | Cliente | Corrección sin costo | Es una definición comercial, no técnica |
| Decisión sobre cambiar la dirección web de Experience Repair | Cliente | W-25 | Se puede cambiar dejando redirección automática desde la actual, para no perder posicionamiento |

## 5. Total unificado

| Etapa | Horas | Valor COP |
|---|---|---|
| Etapa 0 — Inmediato | 77 h | $900.000 |
| Etapa 1 — Correcciones | 24 h | $280.000 |
| Etapa 2 — Páginas de servicio | 153 h | $1.845.000 |
| Etapa 3 — Institucional y cierre | 113 h | $1.375.000 |
| **TOTAL** | **367 h** | **$4.400.000** |

- **Valor total del paquete: $4.400.000 + IVA**
- **Plazo:** 4 semanas desde el anticipo
- **Descuento aplicado:** 20%, ya incorporado en cada línea. Sobre nuestra tarifa de lista el mismo alcance sería $5.505.000, de modo que el descuento representa $1.105.000

> [!TIP]
> Las cuatro etapas son la secuencia de entrega, no una fragmentación comercial: se contratan juntas y se ejecutan dentro de las mismas 4 semanas. El corte por etapas existe para que Xpandia vea resultados publicados antes de que termine el proyecto, y para vincular cada pago a algo ya entregado.

## 6. Forma de pago

El 50% se paga al iniciar y el 50% restante se libera contra la entrega de cada etapa, en proporción a su valor. Ningún pago intermedio se cobra por adelantado: cada uno corresponde a trabajo ya publicado y verificable.

| Momento | Concepto | Valor COP |
|---|---|---|
| Al iniciar | Anticipo del 50% del proyecto | $2.200.000 |
| Entrega de la Etapa 0 | 50% restante de la etapa | $450.000 |
| Entrega de la Etapa 1 | 50% restante de la etapa | $140.000 |
| Entrega de la Etapa 2 | 50% restante de la etapa | $922.500 |
| Entrega de la Etapa 3 | 50% restante de la etapa | $687.500 |
| **Total** | | **$4.400.000** |

Todos los valores son antes de IVA. El anticipo es lo que da inicio al cronograma de 4 semanas.

## 7. Efecto sobre el hosting

Este punto no es un cobro adicional del desarrollo: es la consecuencia natural de que el sitio crezca. Lo explicamos aquí para que no aparezca como sorpresa al momento de la entrega.

**Cómo funciona hoy.** El servicio anual de hosting, mantenimiento y soporte de Xpandia se calcula como un **11% del valor del desarrollo alojado**. El desarrollo original fue de $2.070.000, de modo que el servicio anual quedó en **$228.000 al año** ($19.000 al mes). Ese año está pagado y vigente **hasta el 1 de julio de 2027**.

**Qué cambia con este paquete.** Al entregar estos requerimientos, el sitio alojado deja de ser el original y pasa a incluir todo lo nuevo. El valor del desarrollo alojado sube y el servicio anual se recalcula sobre ese valor:

| Concepto | Valor |
|---|---|
| Desarrollo original | $2.070.000 |
| Requerimientos de este paquete | $4.400.000 |
| **Nuevo valor del desarrollo alojado** | **$6.470.000** |
| Servicio anual actual (11%) | $228.000 |
| **Nuevo servicio anual (11%)** | **$711.700** ($59.300 al mes) |
| Incremento anual | $483.700 ($40.300 al mes) |

**Qué se cobra y cuándo.** El año que Xpandia ya pagó **no se recobra**. Al momento de la entrega sólo se cobra la **diferencia proporcional por los meses que resten** hasta el 1 de julio de 2027, a razón de $40.300 por mes restante:

| Si la entrega ocurre en | Meses restantes del año en curso | Diferencia a pagar |
|---|---|---|
| Octubre de 2026 | 9 | $363.000 |
| Noviembre de 2026 | 8 | $322.700 |
| Diciembre de 2026 | 7 | $282.300 |
| Enero de 2027 | 6 | $242.000 |

A partir del 1 de julio de 2027, la renovación anual se factura completa sobre el nuevo valor: **$711.700 al año**.

**Por qué es así.** El servicio cubre la infraestructura, el monitoreo, los respaldos, el certificado de seguridad, las actualizaciones y el soporte de todo lo que está publicado. Un sitio con seis páginas reescritas, páginas legales nuevas, más contenido y más recorridos que sostener requiere más de ese servicio que el sitio original, y por eso se calcula sobre el valor total de lo alojado y no sobre una tarifa plana.

## 8. Observaciones

**Qué conviene separar**

- **W-23 (validación local) es transversal.** Toca seis vistas con una función distinta en cada una. Se construye una sola vez como bloque reutilizable y se instancia; maquetarlo vista por vista multiplicaría su costo sin agregar valor.
- **W-28 (assets visuales) es el candidato natural a diferirse.** Es la línea más cara de la Etapa 2 y la única que no bloquea ninguna otra: el sitio funciona sin el antes y después ni el Decision Context Canvas.
- **W-30 (control de calidad) va al cierre.** Ejecutarlo por etapas obligaría a repetirlo.

**Qué se abre después de este paquete**

- Cargar contenido al blog abre la puerta a calendario editorial, categorías y newsletter, sobre un módulo que ya está construido.
- Publicar los 20 locales abre la puerta a páginas por locale y segmentación por mercado.
- El aviso de cookies abre la puerta a analítica con consentimiento, que hoy el sitio no tiene instrumentada.

**Una oportunidad técnica que no cotizamos.** Las tarjetas de servicio están escritas de forma idéntica en cuatro archivos distintos, y los bloques de página se repiten sin ser piezas reutilizables. Extraer cinco componentes comunes reduciría el costo de todo cambio futuro de contenido. No lo incluimos en este paquete porque no es lo que Xpandia pidió, pero conviene tenerlo presente como inversión separada.

## 9. Supuestos y exclusiones

**A. W-07 — correcciones editoriales.** Se asume una lista acotada de hasta 20 correcciones de texto. Si supera ese volumen o incluye reescrituras de bloques completos, la línea sube de nivel y su valor se duplica aproximadamente.

**B. W-28 — assets visuales.** Se cotiza asumiendo que el diseño lo producimos nosotros. Si Xpandia lo entrega y sólo maquetamos, la línea baja a $285.000 y el total del paquete a $4.280.000.

**C. W-16 — blog.** Se asume que Xpandia entrega los cuatro artículos redactados en ambos idiomas y nosotros los cargamos y publicamos. La redacción no está incluida. Si se decide retirar el blog del menú, la línea baja a $30.000.

**D. La base ya existe.** Todo se cotiza como extensión del sitio en producción, no como desarrollo desde cero. Es la razón por la que ninguna línea llega al nivel de feature completo pese a que varias reescriben páginas enteras, y la razón de fondo del precio de este paquete. El detalle está en la sección 2.

**E. Implementación web.** No hay recargo de plataforma. Aplicar los cambios a una versión instalable o a una app móvil tendría recargos de 30% y 60% respectivamente.

**F. Pruebas automatizadas.** El proyecto tiene pruebas que hoy verifican los nombres de servicio, los campos del formulario y el contenido de las vistas. Cambiarlos las rompe, y su actualización está incluida en las líneas correspondientes.

**G. Precios en COP más IVA** (IVA vigente 19%), con el descuento del 20% ya aplicado en cada línea. **Válidos por 30 días** desde la fecha del título; pasado ese plazo se re-emite el documento.

**H. El plazo de 4 semanas cuenta desde el anticipo** y supone que los insumos de la sección 4 lleguen antes de que arranque la etapa que los necesita. Un insumo que llegue tarde desplaza su línea, no todo el cronograma.

**I. El servicio de hosting de la sección 7 se factura aparte** del desarrollo y no está incluido en los $4.400.000.

**J. No incluye:** infraestructura adicional, licencias de terceros, redacción de contenido (artículos del blog, textos legales), soporte por fuera del servicio anual, capacitación extensa ni migración de datos. Sí incluye análisis, desarrollo, pruebas, despliegue y garantía corta de estabilización.

**K. Versión.** Este documento reemplaza las versiones anteriores emitidas el mismo día. Cambios respecto de la última:

| Cambio | Detalle |
|---|---|
| Precio | De rangos a valor cerrado: $4.400.000 + IVA |
| Secciones nuevas | Forma de pago · Efecto sobre el hosting |
| Sin cambios | Las 27 líneas cobrables, sus niveles, sus señales, el análisis de reutilización, las dependencias y los 3 puntos sin costo |

> [!IMPORTANT]
> Las líneas W-07, W-16, W-17, W-19 y W-28 están cotizadas bajo los supuestos declarados arriba, porque dependen de insumos que Xpandia todavía no ha entregado (sección 4). Son las únicas cuyo valor puede moverse al aclararse; el resto del paquete es precio cerrado.

---

**Requerimiento original:** «Crea un documento donde, por cada uno de los nuevos requerimientos que se pretende que implementemos, se muestre en tabla el resultado de la calculadora: nombre del requerimiento, nivel de esfuerzo y precio, con los totales al final de cada etapa y un solo total unificado; ajusta las horas a 4 semanas de trabajo, aplica un descuento del 20%, analiza qué se puede reutilizar para considerarlo en el precio, e incluye la forma de pago y el efecto sobre el hosting.» — sobre las 30 solicitudes del archivo `Xpandia_Website_Change_Request_ProjectApp_v2_1.docx`, analizadas en el reporte `Analisis_Solicitud_De_Cambios_V21_15082026`.

— *ProjectApp · Calculadora de Requerimientos*
