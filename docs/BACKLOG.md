# Backlog de issues — ClaseAgenda

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Alumnos y mensualidades | 2 | 3 | 7 | 17.5 |
| Fase 3 — Agenda de clases | 3 | 5 | 8 | 32 |
| Fase 4 — Pagos y deudas | 4 | 3 | 7 | 17.5 |
| Fase 5 — Recordatorios | 5 | 3 | 7 | 17.5 |

Total: **35 tareas**, ~97 horas (16 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Alumnos y mensualidades

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | CRUD de alumnos. | HU-01 | tarea | Alta | 2.5 |
| `F2-T2` | Validación de mensualidad y teléfono. | HU-01 | lógica | Alta | 2.5 |
| `F2-T3` | Lista con estado de pago del mes. | HU-01 | ui | Alta | 2.5 |
| `F2-T4` | Baja de alumno conservando historial. | HU-01 | tarea | Alta | 2.5 |
| `F2-T5` | Validaciones, estados vacíos y mensajes en español | HU-01 | lógica | Alta | 2.5 |
| `F2-T6` | Pruebas automáticas y verificación manual de criterios | HU-01 | pruebas | Alta | 2.5 |
| `F2-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01 | pruebas | Alta | 2.5 |

### Fase 3 — Agenda de clases

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | CRUD de clases con detección de superposición (función pura con pruebas). | HU-02, HU-03 | lógica, pruebas | Alta | 4 |
| `F3-T2` | Vista semanal de agenda. | HU-02, HU-03 | ui | Alta | 4 |
| `F3-T3` | Estados de clase y flujo de reprogramación. | HU-02, HU-03 | tarea | Alta | 4 |
| `F3-T4` | Registro del tema dado. | HU-02, HU-03 | tarea | Alta | 4 |
| `F3-T5` | Atajo para repetir una clase semanalmente. | HU-02, HU-03 | tarea | Alta | 4 |
| `F3-T6` | Validaciones, estados vacíos y mensajes en español | HU-02, HU-03 | lógica | Alta | 4 |
| `F3-T7` | Pruebas automáticas y verificación manual de criterios | HU-02, HU-03 | pruebas | Alta | 4 |
| `F3-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-02, HU-03 | pruebas | Alta | 4 |

### Fase 4 — Pagos y deudas

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Registro de pagos por mes. | HU-04 | tarea | Media | 2.5 |
| `F4-T2` | Función pura de deuda por alumno y mes con pruebas. | HU-04 | lógica, pruebas | Media | 2.5 |
| `F4-T3` | Pantalla Pagos y deudas. | HU-04 | ui | Media | 2.5 |
| `F4-T4` | Historial de pagos por alumno. | HU-04 | tarea | Media | 2.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-04 | lógica | Media | 2.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-04 | pruebas | Media | 2.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04 | pruebas | Media | 2.5 |

### Fase 5 — Recordatorios

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Notificaciones locales de clase con expo-notifications. | HU-05 | integración | Media | 2.5 |
| `F5-T2` | Cancelar y reprogramar notificaciones al editar clases. | HU-05 | integración | Media | 2.5 |
| `F5-T3` | Mensaje de cobro por WhatsApp con plantilla. | HU-05 | integración | Media | 2.5 |
| `F5-T4` | Pantalla Ajustes de avisos. | HU-05 | ui | Media | 2.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-05 | lógica | Media | 2.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-05 | pruebas | Media | 2.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05 | pruebas | Media | 2.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
