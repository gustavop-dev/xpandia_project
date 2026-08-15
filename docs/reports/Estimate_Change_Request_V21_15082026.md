# Estimate: Xpandia Website Change Request v21 — 15082026

> **ProjectApp · Calculadora de Requerimientos** — estimación por funcionalidad para implementación web, precios en COP más IVA.
> **Cliente:** Xpandia (xpandia.global) · **Vigencia:** precios válidos por 30 días desde la fecha del título.

## 1. Resumen

Xpandia solicitó 30 cambios numerados (W-01 a W-30) sobre su sitio ya publicado. De ellos, **27 son cambios de alcance cotizables** y **3 son defectos de nuestra implementación que asumimos sin costo**. Este estimate cotiza los 27, agrupados en los cuatro lotes de entrega definidos en el análisis previo, y respeta la prioridad que el propio documento del cliente fija: calendario de reservas y Home primero.

El sitio existe y lo construimos nosotros, así que casi todas las filas son extensión de una base ya montada, no construcción desde cero — por eso ninguna llega a nivel `L` y ninguna activa el modificador de motor nuevo.

## 2. Descomposición por funcionalidad

### Lote 0 — Inmediato (calendario + Home)

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Modificadores | Horas | Precio COP |
|---|---|---|---|---|---|
| W-01 + W-20 · Home: reestructura de 8 a 6 bloques con copy nuevo bilingüe y reducción de 30–40% del texto | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | Bilingüe +10% · Responsive completo +20% · Diseño no entregado +15% · Tests +15% → x1,60 | 32–80 h | $480K–$1,2M |
| W-02 · Calendario Cal.com: evento definitivo, organizador y notificaciones, más CTAs y rutas rápidas en cuatro vistas | M | "Integrar un componente de terceros en el FE — mapa embebido, editor WYSIWYG, date-range picker, tabla avanzada, reCAPTCHA, recorte de imagen, widget de chat" | Dependencia de tercero +20% · Coordinación con el cliente +10% · Tests +15% → x1,45 | 29–73 h | $440K–$1,1M |
| W-21 · Cobertura de 20 locales: bloque compacto y expandible en Home, listado completo en las páginas internas | S | "Tabs / acordeón / secciones colapsables — reorganizar una vista existente" | Bilingüe +10% · Diseño no entregado +20% · Responsive +20% · Transversal x1,4 → x2,10 | 15–42 h | $220K–$630K |
| W-04 + W-05 · Muestra ilustrativa: cambio a 300 outputs y etiquetado de ejemplo ilustrativo en dos vistas | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | Bilingüe +10% · Tests +10% → x1,20 | 8–24 h | $130K–$360K |
| W-08 · Carrusel de IA: reemplazo de los claims de dominio y garantía por el texto aprobado | XS | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | Bilingüe +10% · Tests +10% → x1,20 | 2–8 h | $40K–$130K |
| W-14 · Credenciales del fundador: 15+ años y retiro de la mención a Fortune 500 | XS | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | Bilingüe +10% · Tests +10% → x1,20 | 2–8 h | $40K–$130K |

### Lote 1 — Correcciones y consistencia

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Modificadores | Horas | Precio COP |
|---|---|---|---|---|---|
| W-03 · Formulario de contacto: reducción de 12 a 7 campos, en frontend, backend y correos | S | "Retiro controlado de un comportamiento ya entregado — eliminar un endpoint/acción y su UI, reescribiendo las pruebas que lo cubrían" | Bilingüe +10% · Tests +20% → x1,30 | 9–26 h | $140K–$390K |
| W-29 · Retiro del anclaje de USD 500 y unificación de los precios publicados | S | "Retiro controlado de un comportamiento ya entregado — eliminar un endpoint/acción y su UI, reescribiendo las pruebas que lo cubrían" | Bilingüe +10% · Tests +10% → x1,20 | 8–24 h | $130K–$360K |
| W-07 · Correcciones editoriales del sitio, pendientes de la lista del cliente | S ⚠️ (ver §7-A) | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica)" | Bilingüe +10% → x1,10 | 8–22 h | $120K–$330K |

### Lote 2 — Páginas de servicio

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Modificadores | Horas | Precio COP |
|---|---|---|---|---|---|
| W-10 + W-11 + W-12 + W-24 · Language Assurance: alcance del sprint, sin acceso a sistemas, mejor fit y flujo AISQAAS de cinco pasos | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | Bilingüe +10% · Responsive +20% · Diseño no entregado +20% · Tests +15% → x1,65 | 33–83 h | $500K–$1,2M |
| W-28 · Assets visuales nuevos: antes y después, Decision Context Canvas y mapa de los 20 locales | M ⚠️ (ver §7-B) | Sin señal — por analogía con el Quality Scorecard ya construido (bloque visual ilustrativo estático a medida) | Bilingüe +10% · Responsive +25% · Diseño no entregado +30% → x1,65 | 33–83 h | $500K–$1,2M |
| W-25 · Experience Repair: nombre canónico, nueva dirección web con redirección y bloque de acceptance review | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | Bilingüe +10% · Responsive +15% · Diseño no entregado +15% · Tests +20% → x1,60 | 32–80 h | $480K–$1,2M |
| W-26 · Applied Cultural Intelligence: reenfoque desde la decisión de negocio y marco de hechos, hipótesis y desconocidos | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | Bilingüe +10% · Responsive +15% · Diseño no entregado +15% · Tests +15% → x1,55 | 31–78 h | $470K–$1,2M |
| W-13 + W-22 · Servicios: reestructura como selector de ruta con jerarquía del sprint | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | Bilingüe +10% · Responsive +15% · Tests +15% → x1,40 | 28–70 h | $420K–$1,1M |
| W-23 · Validación local como hilo conductor, con función distinta por servicio, en seis vistas | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | Bilingüe +10% · Diseño no entregado +15% · Transversal x1,5 → x1,875 | 13–38 h | $200K–$560K |

### Lote 3 — Institucional y cierre

| Funcionalidad | Nivel | Señal aplicada (cita literal) | Modificadores | Horas | Precio COP |
|---|---|---|---|---|---|
| W-27 · Nosotros: simplificación, red de reviewers y modelo operativo | M | "Landing / página de marketing multi-sección con formulario — página nueva con varias secciones y captura de contacto, sin CMS" | Bilingüe +10% · Responsive +15% · Tests +15% → x1,40 | 28–70 h | $420K–$1,1M |
| W-19 · Legales: privacidad, aviso legal y banner de gestión de cookies | M | "Términos y condiciones con aceptación versionada / consentimientos — registrar quién aceptó qué versión y cuándo (Habeas Data básico)" | Bilingüe +10% · Responsive +15% · Transversal x1,2 → x1,50 | 30–75 h | $450K–$1,1M |
| W-30 · QA final: escritorio y móvil, ambos idiomas, enlaces, formulario, calendario y metadatos | M | "Tarea técnica no funcional pedida como requerimiento — actualizar framework, migrar hosting, SSL/dominio, optimización puntual: se clasifica y cotiza aparte del roadmap funcional" | Bilingüe +10% · Transversal x1,3 → x1,43 | 29–72 h | $430K–$1,1M |
| W-18 · Auditoría de todos los botones, rutas rápidas y anclas del sitio | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | Bilingüe +5% · Transversal x1,4 → x1,47 | 10–29 h | $150K–$440K |
| W-17 · Pie de página: LinkedIn, PBX, ciudad y correo corporativo | S | "Cambios de estilo (UI) o de plantilla / ajustes menores a tarjetas, tablas, botones o formularios" | Bilingüe +10% · Tests +15% → x1,25 | 9–25 h | $130K–$380K |
| W-16 · Blog: publicación de la serie inicial de cuatro artículos en ambos idiomas | S ⚠️ (ver §7-C) | "Cambio de copy — texto, etiqueta, título, placeholder, mensaje de validación o typo (sin lógica). Incluye actualizar el contenido de una página estática existente" | Bilingüe +10% · Datos semilla +10% → x1,20 | 8–24 h | $130K–$360K |

### Lo que corregimos sin costo

Estos tres puntos son defectos de nuestra implementación, no cambios de alcance. Entran al Lote 1 y no suman al total.

| Solicitud | Qué es | Nivel | Valor |
|---|---|---|---|
| W-15 | El botón "Ver metodología" lleva al formulario de contacto en lugar de bajar a la metodología de esa misma página. Es el único fallo funcional real del documento | S | Sin costo |
| W-06 | El mismo servicio aparece con seis nombres distintos entre menú, pie de página, tablas y páginas de servicio | S | Sin costo |
| W-09 | Emoji en el aviso del formulario de Contacto | XS | Sin costo |

### Implicaciones técnicas

- **W-01 + W-20 (Home).** Los enlaces de las tarjetas de servicio hoy se emparejan por posición con el contenido: al reordenar los bloques hay que romper ese acoplamiento o los botones apuntan al servicio equivocado. La reducción de 30–40% del texto es una decisión de diseño, no un recorte mecánico.
- **W-02 (calendario).** El evento actual no es el solicitado y el calendario sólo está integrado en Contacto. Dos de las cuatro rutas rápidas hoy bajan al formulario en vez de abrir el calendario, y se recablean aquí. El organizador genérico puede no ser posible en la plataforma: si no lo es, se informa antes de publicar.
- **W-21 (20 locales).** Un solo bloque con dos presentaciones reutilizado en cuatro vistas: se construye una vez y se reutiliza, no se maqueta cuatro veces.
- **W-03 (formulario).** El formulario no persiste datos, así que retirar campos no obliga a decidir sobre información histórica. Sí rompe las pruebas unitarias y de extremo a extremo que hoy verifican los 12 campos.
- **W-25 (Experience Repair).** El patrón de redirecciones permanentes ya existe en el proyecto, así que cambiar la dirección web sin perder posicionamiento es barato. Lo que cuesta es que el cambio de ruta rompe las pruebas del pie de página, de la página y del mapa de flujos.
- **W-23 (validación local).** Es la pieza transversal del paquete: su costo escala con el número de vistas donde se integra, no con su tamaño individual.
- **W-19 (legales).** El contenido lo entrega Xpandia. Lo que se cotiza es la implementación de las páginas, el banner y su comportamiento en todo el sitio.
- **W-30 (QA final).** Sólo tiene sentido ejecutarlo al cierre: adelantarlo obliga a repetirlo.

## 3. Totales

- **Horas:** 398–1.032 h
- **Precio total:** $6,0M–$15,6M + IVA
- **Semáforo:** ⚠️ Fricción (entre $12M y $20M)
- **Plazo indicativo:** 13–34 semanas para el alcance completo, a una capacidad supuesta de 30 h por semana

| Lote | Alcance | Horas | Precio COP |
|---|---|---|---|
| Lote 0 — Inmediato | Calendario definitivo y Home nuevo completo | 89–235 h | $1,4M–$3,6M |
| Lote 1 — Correcciones | Formulario corto, precios y ajustes editoriales, más los tres puntos sin costo | 25–72 h | $390K–$1,1M |
| Lote 2 — Servicios | Servicios y las tres páginas de servicio, más los assets visuales | 170–430 h | $2,6M–$6,5M |
| Lote 3 — Institucional | Nosotros, pie de página, blog, legales, auditoría y QA final | 114–295 h | $1,7M–$4,5M |

> [!WARNING]
> El alcance completo cae en zona de fricción comercial: por encima de $12M la decisión deja de ser operativa y sube a comité. La respuesta ya está construida — los cuatro lotes son contratables por separado y cada uno queda holgadamente por debajo de ese umbral.

**Escenario alternativo de W-28.** Si Xpandia entrega el diseño de los tres assets visuales y sólo los maquetamos, esa fila baja a **$410K–$1,0M** (27–68 h) y el total del paquete queda en **$5,9M–$15,4M + IVA**. La diferencia es el modificador de diseño no entregado, que representa cerca de un tercio de esa fila.

## 4. Proyección de precio año a año

| Año | Δ%SMLMV supuesto | % reajuste total | Precio proyectado (piso–techo) |
|---|---|---|---|
| 2026 (emisión) | — | — | $6,0M–$15,6M |
| 2027 | 23% | 35% | $8,1M–$21,0M |
| 2028 | 23% | 35% | $11,0M–$28,4M |

Proyección informativa calculada con el último incremento decretado del SMLMV (2026: 23%, decretos 1469 y 1470 de 2025) más el 12% fijo de ProjectApp, compuesta año a año; no constituye oferta en firme — la vigencia de esta estimación es de 30 días.

> [!IMPORTANT]
> El reajuste de 2026 fue excepcionalmente alto. En 2027 el mismo alcance completo proyecta un techo de $21,0M, es decir por encima del umbral de rechazo de $20M. Contratar el paquete completo dentro de la vigencia de este documento es lo que lo mantiene en zona negociable; diferirlo un año lo empuja obligatoriamente a fragmentación.

## 5. Observaciones

**Qué conviene separar**

- **W-23 (validación local) es transversal.** Toca seis vistas con una función distinta en cada una. Se construye una sola vez como bloque reutilizable y se instancia; maquetarlo vista por vista multiplicaría su costo sin agregar valor.
- **W-28 (assets visuales) es el candidato natural a diferirse.** Es la fila más cara del Lote 2 y la única que no bloquea ninguna otra: el sitio funciona sin el antes/después ni el Decision Context Canvas. Si hay que recortar, se recorta aquí primero.
- **W-30 (QA final) va al cierre, no antes.** Ejecutarlo por lotes obligaría a repetirlo, y su costo es en su mayoría transversal.

**Qué es sensible al orden**

- El Lote 1 contiene los tres puntos sin costo. Conviene ejecutarlo temprano aunque sea el más barato: son los que hoy se ven mal en el sitio.
- El Lote 2 depende del Lote 0 en una cosa: la unificación de nombres de servicio (W-06, sin costo) debe estar aplicada antes de reescribir las páginas de servicio, o el trabajo se hace dos veces.

**Qué se abre después de este paquete**

- Cargar contenido al blog abre la puerta a calendario editorial, categorías y newsletter.
- Publicar los 20 locales abre la puerta a páginas por locale y a segmentación por mercado, que hoy no existen.
- El banner de cookies abre la puerta a analítica con consentimiento, que hoy el sitio no tiene instrumentada.

**Sin estimaciones previas comparables.** La carpeta de estimaciones del panel no tiene documentos anteriores de este cliente, así que no hay contraste de consistencia que declarar.

## 6. Estrategia comercial

El techo del paquete completo cae en zona de fricción, así que se presenta fragmentado. **Se aplica Estrategia A — fragmentación por fases**, y los cuatro lotes ya son esas fases: cada uno es desplegable y útil por sí solo, y ninguno supera $12M.

| Fase | Por qué se sostiene sola | Precio COP |
|---|---|---|
| Lote 0 | Es lo que el propio cliente marcó como prioridad inmediata. Al terminarlo, el sitio ya explica el negocio nuevo y las reservas funcionan | $1,4M–$3,6M |
| Lote 1 | Cierra las inconsistencias visibles y acorta el formulario. Independiente de todo lo demás | $390K–$1,1M |
| Lote 2 | Reescribe la capa comercial completa. Es la fase más grande y la que más se puede recortar | $2,6M–$6,5M |
| Lote 3 | Cierra lo institucional y lo legal. Puede contratarse último sin bloquear nada | $1,7M–$4,5M |

**Recomendación:** contratar Lote 0 y Lote 1 juntos ($1,8M–$4,7M). Es la combinación que entrega el sitio nuevo funcionando y limpio, se mantiene muy por debajo del umbral de fricción, y deja la decisión sobre los Lotes 2 y 3 para cuando ya haya un resultado visible.

### Paquete de horas

Alternativa o complemento a la contratación por lotes, para las piezas sueltas y el mantenimiento posterior. Se consume contra trabajo real, con prioridad de atención.

| Bolsa | Horas | Precio COP | Para qué alcanza en este paquete |
|---|---|---|---|
| Básica | 40 h | $600K | Las cuatro filas más pequeñas del Lote 0 y 1 (carrusel, credenciales, muestra, precios) |
| Estándar | 80 h | $1,2M | El Lote 1 completo más el pie de página y la auditoría de botones |
| Extendida | 120 h | $1,8M | El Lote 1 completo más el calendario del Lote 0 |

Condiciones de la bolsa: mínimo mensual sugerido de 10 h, vigencia de 60 días desde la compra, y el correctivo posterior a la garantía se descuenta de la bolsa. **No ofrecemos SLA formal:** con un equipo de este tamaño sería un compromiso que no podríamos honrar; lo que sí ofrecemos es prioridad de atención sobre la cola normal.

## 7. Supuestos y exclusiones

**A. W-07 — correcciones editoriales.** Se asume una lista acotada de hasta 20 correcciones de texto. El documento del cliente menciona que existen pero no las enumera. Si la lista supera ese volumen o incluye reescrituras de bloques completos, la fila sube a nivel `M` y su precio se duplica aproximadamente.

**B. W-28 — assets visuales.** Se cotiza asumiendo que el diseño lo producimos nosotros. Si Xpandia lo entrega, la fila baja a $410K–$1,0M. Ambos escenarios están declarados en la sección 3.

**C. W-16 — blog.** Se asume que Xpandia entrega los cuatro artículos redactados en inglés y español, y que nosotros los cargamos y publicamos. La redacción de los artículos no está incluida y se cotizaría aparte. Si se decide retirar el blog del menú en vez de publicarlo, la fila baja a nivel `XS` ($40K–$130K).

**D. Motores ya construidos.** Se verificó en el repositorio y se confirmó con el operador que ya existen y son reutilizables: internacionalización de contenidos, servicio de correo, tareas programadas, autenticación y roles, carga de imágenes y el patrón de redirecciones permanentes. Ninguna fila activa el modificador de motor nuevo. Si alguno resultara no reutilizable, la fila afectada sube entre 30% y 80%.

**E. La base ya existe.** Todo se cotiza como extensión del sitio en producción, no como desarrollo desde cero. Es la razón por la que ninguna fila llega a nivel `L` pese a que varias reescriben páginas completas.

**F. Implementación web.** No hay recargo de plataforma. Si en algún momento se pide aplicar los cambios a una versión instalable o a una app móvil, aplican recargos de 30% y 60% respectivamente.

**G. Pruebas automatizadas.** El proyecto tiene pruebas unitarias y de extremo a extremo que hoy verifican los nombres de servicio, los campos del formulario y el contenido de las vistas. Cambiarlos las rompe, y su actualización está incluida en las filas correspondientes.

**H. Precios en COP más IVA** (IVA vigente 19%), tarifa combinada de referencia de 15 mil pesos por hora. **Válidos por 30 días** desde la fecha del título; pasado ese plazo se re-emite el documento.

**I. No incluye:** infraestructura ni hosting recurrente, licencias de terceros, redacción de contenido (artículos del blog, textos legales), soporte continuo, capacitación extensa ni migración de datos. Sí incluye análisis, desarrollo, pruebas básicas, despliegue y garantía corta de estabilización.

**J. Proyección año a año informativa**, calculada con el incremento decretado del SMLMV para 2026 (23%) más el 12% fijo de ProjectApp. No extiende la vigencia de 30 días.

> [!IMPORTANT]
> No cerrar precio fijo de las filas W-07, W-16, W-17, W-19 y W-28 hasta recibir de Xpandia los insumos correspondientes: la lista de correcciones editoriales, los artículos del blog, los enlaces de LinkedIn, los textos legales aprobados y la definición sobre quién diseña los assets visuales. Las cinco están cotizadas bajo supuesto declarado y son las únicas cuyo precio puede moverse al aclararse.

---

**Requerimiento original:** «Crea un documento donde, por cada uno de los nuevos requerimientos que se pretende que implementemos, se muestre en tabla el resultado de la calculadora: nombre del requerimiento, nivel de esfuerzo y precio, ordenados, con los totales y el paquete de horas dentro del documento.» — sobre las 30 solicitudes del archivo `Xpandia_Website_Change_Request_ProjectApp_v2_1.docx`, analizadas en el reporte `Analisis_Solicitud_De_Cambios_V21_15082026`.

— *ProjectApp · Calculadora de Requerimientos*
