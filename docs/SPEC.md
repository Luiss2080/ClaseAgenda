# Especificación del MVP — ClaseAgenda

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que el profesor particular sepa a quién le da clase hoy, qué tema dio y quién le debe la mensualidad.

**Problema:** Las clases y los pagos se llevan en un cuaderno o en el calendario; se olvidan clases reprogramadas, no se sabe qué se dio y los cobros se atrasan.

**Cómo se resuelve hoy:** Cuaderno, calendario del celular y mensajes de WhatsApp.

**Usuario objetivo:** Profesor particular o academia pequeña con 5 a 40 alumnos y cobro mensual.

**Métricas de éxito del MVP:**

- Ver la agenda del día en un vistazo.
- Registrar el tema dado al terminar la clase en 10 segundos.
- Saber quién debe el mes sin revisar mensajes.

## 2. Alcance del MVP

### Incluido

- Alumnos con materia y mensualidad pactada.
- Clases con fecha, hora, duración y tema dado.
- Estados de clase: realizada, cancelada o reprogramada.
- Control de pagos por mes y alumnos con deuda.
- Recordatorio de clase y de cobro por notificación y WhatsApp.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** Una clase tiene estados: programada, realizada, cancelada o reprogramada.
- **RN-02** Reprogramar una clase crea una nueva clase y deja la original como reprogramada.
- **RN-03** No puede haber dos clases superpuestas en el mismo horario.
- **RN-04** La mensualidad se paga por mes (AAAA-MM); un alumno debe si el mes actual no está pagado pasado el día de cobro.
- **RN-05** Las clases canceladas por el profesor no se descuentan; las canceladas por el alumno quedan a criterio del profesor (sin descuento automático).
- **RN-06** El recordatorio de clase se programa antes del inicio según los minutos configurados.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Registrar alumnos y mensualidad

**Como** profesor **quiero** cargar alumnos con su materia y mensualidad **para** saber cuánto cobrar a cada uno.

**Fase:** 2 — Alumnos y mensualidades

**Criterios de aceptación:**

1. **Dado:** no hay alumnos. **Cuando:** abro Alumnos. **Entonces:** veo el estado vacío con «Agregar alumno».
2. **Dado:** mensualidad vacía o 0. **Cuando:** intento guardar. **Entonces:** la app avisa que debe ser mayor a 0.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Agendar clases

**Como** profesor **quiero** programar clases con fecha, hora y duración **para** organizar mi semana.

**Fase:** 3 — Agenda de clases

**Criterios de aceptación:**

1. **Dado:** una clase de 18:00 a 19:00. **Cuando:** intento agendar otra a las 18:30. **Entonces:** la app avisa que se superpone y no guarda.
2. **Dado:** una clase programada. **Cuando:** abro Agenda. **Entonces:** la veo en el día y hora correctos.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Marcar estado y tema dado

**Como** profesor **quiero** marcar clases como realizada, cancelada o reprogramada y anotar el tema **para** tener historial de lo enseñado.

**Fase:** 3 — Agenda de clases

**Criterios de aceptación:**

1. **Dado:** una clase de hoy. **Cuando:** la marco realizada con el tema «fracciones». **Entonces:** queda con el tema en el historial del alumno.
2. **Dado:** una clase que reprogramo. **Cuando:** elijo nueva fecha. **Entonces:** se crea una nueva clase y la original queda como reprogramada.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Controlar pagos y deudas

**Como** profesor **quiero** registrar el pago del mes y ver quién debe **para** cobrar a tiempo.

**Fase:** 4 — Pagos y deudas

**Criterios de aceptación:**

1. **Dado:** un alumno sin pago del mes. **Cuando:** abro Deudas. **Entonces:** aparece con el monto pendiente.
2. **Dado:** registro el pago de mayo. **Cuando:** guardo. **Entonces:** el alumno sale de deudas de mayo.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Recordatorios

**Como** profesor **quiero** recibir avisos de clase y de cobro y mandarlos por WhatsApp **para** que nadie falte ni se atrase.

**Fase:** 5 — Recordatorios

**Criterios de aceptación:**

1. **Dado:** una clase en 60 minutos. **Cuando:** llega la hora del aviso. **Entonces:** recibo una notificación local con alumno y hora.
2. **Dado:** un alumno con deuda. **Cuando:** toco «Recordar pago». **Entonces:** se abre WhatsApp con el mensaje prellenado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Clases de hoy y alumnos con deuda | Marcar clase, registrar pago |
| Alumnos | Lista con materia, mensualidad y estado de pago | Crear, editar |
| Agenda | Vista semanal con clases por día | Agendar, cambiar estado |
| Formulario de clase | Alumno, fecha, hora, duración, tema | Guardar |
| Pagos y deudas | Pagos por mes y deudores | Registrar pago, recordar por WhatsApp |
| Ajustes | Minutos de aviso y plantilla de mensajes | Guardar |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `alumnos`

Alumnos con materia y mensualidad pactada.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |
| `materia` | TEXT | Opcional |
| `mensualidad` | REAL | Obligatorio; Por defecto 0 |

### `clases`

Cada clase con fecha, hora, duración, tema y estado.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `alumno_id` | INTEGER | Obligatorio; Referencia a alumnos (se borra en cascada) |
| `fecha` | TEXT | Obligatorio |
| `hora` | TEXT | Obligatorio |
| `duracion_min` | INTEGER | Obligatorio; Por defecto 60 |
| `estado` | TEXT | Obligatorio; Por defecto “pendiente” |
| `tema` | TEXT | Opcional |

### `pagos`

Pagos mensuales por alumno.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `alumno_id` | INTEGER | Obligatorio; Referencia a alumnos (se borra en cascada) |
| `periodo` | TEXT | Obligatorio |
| `monto` | REAL | Obligatorio |
| `fecha` | TEXT | Obligatorio |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Clase en un horario que cruza medianoche: no permitido en el MVP.
- Alumno que paga adelantado varios meses: registrar un pago por mes.
- Cambio de mensualidad: aplica desde el mes siguiente.
- Cambio de zona horaria del teléfono: las horas se guardan locales.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-notifications` | Recordatorios locales (programados en el teléfono, sin servidor) | Notificaciones |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Notificaciones desactivadas por el sistema | La agenda del día siempre es visible en Inicio. |
| Conflictos de horario por error humano | Validación de superposición al guardar. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en ClaseAgenda |
|---|---|
| `alumnos` | Alumnos con materia y mensualidad pactada. |
| `clases` | Cada clase con fecha, hora, duración, tema y estado. |
| `pagos` | Pagos mensuales por alumno. |
| `clases.estado` | Valores: pendiente, realizada, cancelada, reprogramada |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Registrar alumnos y mensualidad | 2 | CP-01-1, CP-01-2 |
| HU-02 Agendar clases | 3 | CP-02-1, CP-02-2 |
| HU-03 Marcar estado y tema dado | 3 | CP-03-1, CP-03-2 |
| HU-04 Controlar pagos y deudas | 4 | CP-04-1, CP-04-2 |
| HU-05 Recordatorios | 5 | CP-05-1, CP-05-2 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
