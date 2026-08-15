# Estimate: Xpandia Website Change Request v21 — 15082026

> **ProjectApp · Calculadora de Requerimientos** — estimación por funcionalidad para implementación web, precios en COP más IVA.
> **Cliente:** Xpandia (xpandia.global) · **Vigencia:** precios válidos por 30 días desde la fecha del título.

## 1. Resumen

Xpandia solicitó 30 cambios numerados (W-01 a W-30) sobre su sitio ya publicado. De ellos, **27 son cambios de alcance cotizables** y **3 son defectos de nuestra implementación que asumimos sin costo**.

El trabajo se organiza en cuatro etapas y está dimensionado para ejecutarse en **4 semanas con un equipo de 4 personas**. Todos los precios de este documento **ya incluyen un descuento del 20%** sobre nuestra tarifa de lista.

La razón por la que este paquete cuesta menos de lo que su alcance sugiere está en la sección 2: el sitio lo construimos nosotros y buena parte de la maquinaria que estos cambios necesitan ya está hecha, probada y funcionando. Lo que se cobra es el trabajo que realmente queda por hacer.

## 2. Qué ya existe y se reutiliza

Antes de estimar revisamos el proyecto pieza por pieza para separar lo que hay que construir de lo que ya está construido. Este es el resultado, y es la base del precio.

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

Cada línea se estimó según cuánto de ella ya está resuelto. Las líneas que sólo requieren cargar contenido o editar textos bajaron alrededor de la mitad frente a construirlas desde cero; las reescrituras de página bajaron cerca de un 40%; los barridos de enlaces y el control de calidad final casi no bajan, porque son trabajo manual que ninguna infraestructura evita.

## 3. Descomposición por funcionalidad

### Etapa 0 — Inmediato: calendario y Home

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-01 + W-20 · Home: reestructura de 8 a 6 bloques con copy nuevo bilingüe y reducción de 30–40% del texto | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 19–48 h | $230K–$580K |
| W-02 · Calendario: evento definitivo, organizador y notificaciones, más botones y rutas rápidas en cuatro vistas | M | "Integrar un componente de terceros en el FE — mapa embebido, editor WYSIWYG, date-range picker, tabla avanzada, reCAPTCHA, recorte de imagen, widget de chat" | 14–36 h | $170K–$430K |
| W-21 · Cobertura de 20 locales: bloque compacto y expandible en Home, listado completo en páginas internas | S | "Tabs / acordeón / secciones colapsables — reorganizar una vista existente" | 9–26 h | $110K–$310K |
| W-04 + W-05 · Muestra ilustrativa: cambio a 300 outputs y etiquetado en dos vistas | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 4–12 h | $50K–$140K |
| W-08 · Carrusel de IA: reemplazo de los claims de dominio y garantía | XS | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | 2–4 h | $20K–$50K |
| W-14 · Credenciales del fundador: 15+ años y retiro de la mención a Fortune 500 | XS | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | 2–4 h | $20K–$50K |
| **Subtotal Etapa 0** | | | **50–130 h** | **$600K–$1,6M** |

### Etapa 1 — Correcciones y consistencia

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-07 · Correcciones editoriales del sitio, pendientes de la lista del cliente | S ⚠️ | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | 6–16 h | $70K–$190K |
| W-03 · Formulario de contacto: reducción de 12 a 7 campos, en interfaz, servidor y correos | S | "Retiro controlado de un comportamiento ya entregado — eliminar un endpoint/acción y su UI, reescribiendo las pruebas que lo cubrían" | 5–13 h | $60K–$160K |
| W-29 · Retiro del anclaje de USD 500 y unificación de los precios publicados | S | "Retiro controlado de un comportamiento ya entregado — eliminar un endpoint/acción y su UI, reescribiendo las pruebas que lo cubrían" | 4–12 h | $50K–$140K |
| **Subtotal Etapa 1** | | | **15–41 h** | **$180K–$490K** |

Esta etapa incluye además los tres puntos que corregimos sin costo, detallados más abajo.

### Etapa 2 — Páginas de servicio

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-28 · Assets visuales nuevos: antes y después, Decision Context Canvas y mapa de los 20 locales | M ⚠️ | Sin señal — por analogía con el Quality Scorecard ya construido (bloque visual ilustrativo estático a medida) | 23–58 h | $280K–$700K |
| W-10 + W-11 + W-12 + W-24 · Language Assurance: alcance del sprint, sin acceso a sistemas, mejor fit y flujo AISQAAS de cinco pasos | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 20–50 h | $240K–$600K |
| W-25 · Experience Repair: nombre canónico, nueva dirección web con redirección y bloque de acceptance review | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 19–48 h | $230K–$580K |
| W-26 · Applied Cultural Intelligence: reenfoque desde la decisión de negocio y marco de hechos, hipótesis y desconocidos | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 18–46 h | $220K–$550K |
| W-13 + W-22 · Servicios: reestructura como selector de ruta con jerarquía del sprint | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 17–42 h | $200K–$500K |
| W-23 · Validación local como hilo conductor, con función distinta por servicio, en seis vistas | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 8–22 h | $100K–$260K |
| **Subtotal Etapa 2** | | | **105–266 h** | **$1,3M–$3,2M** |

### Etapa 3 — Institucional y cierre

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Horas | Precio COP |
|---|---|---|---|---|
| W-30 · Control de calidad final: escritorio y móvil, ambos idiomas, enlaces, formulario, calendario y metadatos | M | "Tarea técnica no funcional pedida como requerimiento — actualizar framework, migrar hosting, SSL/dominio, optimización puntual: se clasifica y cotiza aparte del roadmap funcional" | 26–66 h | $310K–$790K |
| W-19 · Legales: privacidad, aviso legal y aviso de gestión de cookies | M | "Términos y condiciones con aceptación versionada / consentimientos — registrar quién aceptó qué versión y cuándo (Habeas Data básico)" | 18–45 h | $220K–$540K |
| W-27 · Nosotros: simplificación, red de reviewers y modelo operativo | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | 17–42 h | $200K–$500K |
| W-18 · Auditoría de todos los botones, rutas rápidas y anclas del sitio | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 9–27 h | $110K–$320K |
| W-16 · Blog: publicación de la serie inicial de cuatro artículos en ambos idiomas | S ⚠️ | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica). Incluye actualizar el contenido de una página estática existente" | 4–12 h | $50K–$140K |
| W-17 · Pie de página: LinkedIn, PBX, ciudad y correo corporativo | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | 4–11 h | $50K–$130K |
| **Subtotal Etapa 3** | | | **78–203 h** | **$940K–$2,4M** |

### Lo que corregimos sin costo

Estos tres puntos son defectos de nuestra implementación, no cambios de alcance. Se ejecutan dentro de la Etapa 1 y no suman al total.

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
| Los cuatro artículos del blog en ambos idiomas, con sus imágenes de portada | Cliente | W-16 | Xpandia los entrega. Si no habrá al menos tres, se retira el blog del menú y la línea baja a $20K–$50K |
| Acceso a la cuenta de Cal.com, o configuración desde su lado | Cliente | W-02 | Se requiere para dejar el organizador como Xpandia y las notificaciones en hello@xpandia.global |
| Definición de quién diseña los tres assets visuales | Cliente | W-28 | Cotizado asumiendo que los diseñamos nosotros. Si Xpandia entrega el diseño, esa línea baja a $200K–$500K |
| Cuál de los dos precios publicados de ACI es el válido | Cliente | Corrección sin costo | Es una definición comercial, no técnica |
| Decisión sobre cambiar la dirección web de Experience Repair | Cliente | W-25 | Se puede cambiar dejando redirección automática desde la actual, para no perder posicionamiento |

## 5. Total unificado

| Etapa | Horas | Precio COP |
|---|---|---|
| Etapa 0 — Inmediato | 50–130 h | $600K–$1,6M |
| Etapa 1 — Correcciones | 15–41 h | $180K–$490K |
| Etapa 2 — Páginas de servicio | 105–266 h | $1,3M–$3,2M |
| Etapa 3 — Institucional y cierre | 78–203 h | $940K–$2,4M |
| **TOTAL** | **248–640 h** | **$3,0M–$7,7M** |

- **Precio total:** $3,0M–$7,7M + IVA
- **Semáforo:** ✅ Sweet spot (por debajo de $12M)
- **Equipo y plazo:** 4 personas durante 4 semanas. El techo de 640 horas es exactamente esa capacidad
- **Descuento aplicado:** 20%, ya incorporado en cada línea de este documento. Sobre tarifa de lista el mismo alcance sería $3,7M–$9,6M, así que el descuento representa entre $700K y $1,9M

> [!TIP]
> El paquete completo cabe en una sola propuesta sin fricción comercial. Las cuatro etapas son la secuencia de entrega, no una fragmentación para bajar el ticket: pueden contratarse juntas y ejecutarse en las 4 semanas.

## 6. Observaciones

**Qué conviene separar**

- **W-23 (validación local) es transversal.** Toca seis vistas con una función distinta en cada una. Se construye una sola vez como bloque reutilizable y se instancia; maquetarlo vista por vista multiplicaría su costo sin agregar valor.
- **W-28 (assets visuales) es el candidato natural a diferirse.** Es la línea más cara de la Etapa 2 y la única que no bloquea ninguna otra: el sitio funciona sin el antes y después ni el Decision Context Canvas.
- **W-30 (control de calidad) va al cierre.** Ejecutarlo por etapas obligaría a repetirlo.

**Qué se abre después de este paquete**

- Cargar contenido al blog abre la puerta a calendario editorial, categorías y newsletter, sobre un módulo que ya está construido.
- Publicar los 20 locales abre la puerta a páginas por locale y segmentación por mercado.
- El aviso de cookies abre la puerta a analítica con consentimiento, que hoy el sitio no tiene instrumentada.

**Una oportunidad técnica que no cotizamos.** Las tarjetas de servicio están escritas de forma idéntica en cuatro archivos distintos, y los bloques de página se repiten sin ser piezas reutilizables. Extraer cinco componentes comunes reduciría el costo de todo cambio futuro de contenido. No lo incluimos en este paquete porque no es lo que Xpandia pidió, pero conviene tenerlo presente como inversión separada.

## 7. Supuestos y exclusiones

**A. W-07 — correcciones editoriales.** Se asume una lista acotada de hasta 20 correcciones de texto. Si supera ese volumen o incluye reescrituras de bloques completos, la línea sube de nivel y su precio se duplica aproximadamente.

**B. W-28 — assets visuales.** Se cotiza asumiendo que el diseño lo producimos nosotros. Si Xpandia lo entrega y sólo maquetamos, la línea baja a $200K–$500K y el total a $2,9M–$7,5M.

**C. W-16 — blog.** Se asume que Xpandia entrega los cuatro artículos redactados en ambos idiomas y nosotros los cargamos y publicamos. La redacción no está incluida. Si se decide retirar el blog del menú, la línea baja a $20K–$50K.

**D. La base ya existe.** Todo se cotiza como extensión del sitio en producción, no como desarrollo desde cero. Es la razón por la que ninguna línea llega al nivel de feature completo pese a que varias reescriben páginas enteras, y la razón de fondo del precio de este paquete. El detalle está en la sección 2.

**E. Implementación web.** No hay recargo de plataforma. Aplicar los cambios a una versión instalable o a una app móvil tendría recargos de 30% y 60% respectivamente.

**F. Pruebas automatizadas.** El proyecto tiene pruebas que hoy verifican los nombres de servicio, los campos del formulario y el contenido de las vistas. Cambiarlos las rompe, y su actualización está incluida en las líneas correspondientes.

**G. Precios en COP más IVA** (IVA vigente 19%), con el descuento del 20% ya aplicado en cada línea. **Válidos por 30 días** desde la fecha del título; pasado ese plazo se re-emite el documento.

**H. El plazo de 4 semanas supone disponibilidad simultánea de las 4 personas** y que los insumos de la sección 4 lleguen antes de que arranque la etapa que los necesita. Un insumo que llegue tarde desplaza su línea, no todo el cronograma.

**I. No incluye:** infraestructura ni hosting recurrente, licencias de terceros, redacción de contenido (artículos del blog, textos legales), soporte continuo, capacitación extensa ni migración de datos. Sí incluye análisis, desarrollo, pruebas, despliegue y garantía corta de estabilización.

**J. Reemplaza la primera versión emitida hoy.** Cambios respecto de ella:

| Cambio | Detalle |
|---|---|
| Horas ajustadas | De 398–1.032 h a 248–640 h, con la reducción sustentada en el análisis de reutilización de la sección 2 |
| Descuento | 20% incorporado en cada línea |
| Precio | De $6,0M–$15,6M a $3,0M–$7,7M, pasando de zona de fricción a sweet spot |
| Secciones retiradas | Escenarios de precio a futuro y bolsa de horas |
| Secciones nuevas | Qué ya existe y se reutiliza · Dependencias |
| Sin cambios | Las 27 líneas cobrables, sus niveles, sus señales y los 3 puntos sin costo |

> [!IMPORTANT]
> No cerrar precio fijo de las líneas W-07, W-16, W-17, W-19 y W-28 hasta recibir de Xpandia los insumos de la sección 4. Las cinco están cotizadas bajo supuesto declarado y son las únicas cuyo precio puede moverse al aclararse.

---

**Requerimiento original:** «Crea un documento donde, por cada uno de los nuevos requerimientos que se pretende que implementemos, se muestre en tabla el resultado de la calculadora: nombre del requerimiento, nivel de esfuerzo y precio, ordenados, con los totales al final de cada etapa y un solo total unificado; ajusta las horas a 4 semanas de trabajo, aplica un descuento del 20%, y analiza qué se puede reutilizar para considerarlo en el precio, explicándoselo al cliente.» — sobre las 30 solicitudes del archivo `Xpandia_Website_Change_Request_ProjectApp_v2_1.docx`, analizadas en el reporte `Analisis_Solicitud_De_Cambios_V21_15082026`.

— *ProjectApp · Calculadora de Requerimientos*
