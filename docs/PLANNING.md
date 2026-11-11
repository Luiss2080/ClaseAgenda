# Plan de desarrollo — ClaseAgenda

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Alumnos y mensualidades | 3 | 5 |
| 3 | Agenda de clases | 5 | 10 |
| 4 | Pagos y deudas | 3 | 13 |
| 5 | Recordatorios | 3 | 16 |

Total: **16 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Alumnos y mensualidades

**Estimación:** 3 días. **Rama sugerida:** `fase-2-alumnos-y-mensualidades`.

**Objetivo:** Alumnos y mensualidades.

**Historias que se completan:** HU-01 (Registrar alumnos y mensualidad).

**Tareas**

- [ ] **F2-T1** CRUD de alumnos.
- [ ] **F2-T2** Validación de mensualidad y teléfono.
- [ ] **F2-T3** Lista con estado de pago del mes.
- [ ] **F2-T4** Baja de alumno conservando historial.
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — no hay alumnos → abro Alumnos → veo el estado vacío con «Agregar alumno».
- [ ] HU-01 — mensualidad vacía o 0 → intento guardar → la app avisa que debe ser mayor a 0.

**Criterio de salida:**

- [ ] Puedo cargar 10 alumnos y verlos tras reiniciar.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Agenda de clases

**Estimación:** 5 días. **Rama sugerida:** `fase-3-agenda-de-clases`.

**Objetivo:** Agenda de clases.

**Historias que se completan:** HU-02 (Agendar clases), HU-03 (Marcar estado y tema dado).

**Tareas**

- [ ] **F3-T1** CRUD de clases con detección de superposición (función pura con pruebas).
- [ ] **F3-T2** Vista semanal de agenda.
- [ ] **F3-T3** Estados de clase y flujo de reprogramación.
- [ ] **F3-T4** Registro del tema dado.
- [ ] **F3-T5** Atajo para repetir una clase semanalmente.
- [ ] **F3-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-02 — una clase de 18:00 a 19:00 → intento agendar otra a las 18:30 → la app avisa que se superpone y no guarda.
- [ ] HU-02 — una clase programada → abro Agenda → la veo en el día y hora correctos.
- [ ] HU-03 — una clase de hoy → la marco realizada con el tema «fracciones» → queda con el tema en el historial del alumno.
- [ ] HU-03 — una clase que reprogramo → elijo nueva fecha → se crea una nueva clase y la original queda como reprogramada.

**Criterio de salida:**

- [ ] Las superposiciones se detectan en los casos de prueba.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Pagos y deudas

**Estimación:** 3 días. **Rama sugerida:** `fase-4-pagos-y-deudas`.

**Objetivo:** Pagos y deudas.

**Historias que se completan:** HU-04 (Controlar pagos y deudas).

**Tareas**

- [ ] **F4-T1** Registro de pagos por mes.
- [ ] **F4-T2** Función pura de deuda por alumno y mes con pruebas.
- [ ] **F4-T3** Pantalla Pagos y deudas.
- [ ] **F4-T4** Historial de pagos por alumno.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — un alumno sin pago del mes → abro Deudas → aparece con el monto pendiente.
- [ ] HU-04 — registro el pago de mayo → guardo → el alumno sale de deudas de mayo.

**Criterio de salida:**

- [ ] La lista de deudores coincide con los casos de prueba.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Recordatorios

**Estimación:** 3 días. **Rama sugerida:** `fase-5-recordatorios`.

**Objetivo:** Recordatorios.

**Historias que se completan:** HU-05 (Recordatorios).

**Tareas**

- [ ] **F5-T1** Notificaciones locales de clase con expo-notifications.
- [ ] **F5-T2** Cancelar y reprogramar notificaciones al editar clases.
- [ ] **F5-T3** Mensaje de cobro por WhatsApp con plantilla.
- [ ] **F5-T4** Pantalla Ajustes de avisos.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — una clase en 60 minutos → llega la hora del aviso → recibo una notificación local con alumno y hora.
- [ ] HU-05 — un alumno con deuda → toco «Recordar pago» → se abre WhatsApp con el mensaje prellenado.

**Criterio de salida:**

- [ ] Las notificaciones llegan y se cancelan al cancelar la clase.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Alumnos y mensualidades

- **Día 3** (día 1 de la fase): `F2-T1` CRUD de alumnos.; `F2-T2` Validación de mensualidad y teléfono.; `F2-T3` Lista con estado de pago del mes..
- **Día 4** (día 2 de la fase): `F2-T4` Baja de alumno conservando historial.; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Agenda de clases

- **Día 6** (día 1 de la fase): `F3-T1` CRUD de clases con detección de superposición (función pura con pruebas).; `F3-T2` Vista semanal de agenda..
- **Día 7** (día 2 de la fase): `F3-T3` Estados de clase y flujo de reprogramación.; `F3-T4` Registro del tema dado..
- **Día 8** (día 3 de la fase): `F3-T5` Atajo para repetir una clase semanalmente.; `F3-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 9** (día 4 de la fase): `F3-T7` Pruebas automáticas y verificación manual de criterios; `F3-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.
- **Día 10** (día 5 de la fase): colchón: terminar pendientes, probar en el teléfono y ajustar detalles.

### Fase 4 — Pagos y deudas

- **Día 11** (día 1 de la fase): `F4-T1` Registro de pagos por mes.; `F4-T2` Función pura de deuda por alumno y mes con pruebas.; `F4-T3` Pantalla Pagos y deudas..
- **Día 12** (día 2 de la fase): `F4-T4` Historial de pagos por alumno.; `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 13** (día 3 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Recordatorios

- **Día 14** (día 1 de la fase): `F5-T1` Notificaciones locales de clase con expo-notifications.; `F5-T2` Cancelar y reprogramar notificaciones al editar clases.; `F5-T3` Mensaje de cobro por WhatsApp con plantilla..
- **Día 15** (día 2 de la fase): `F5-T4` Pantalla Ajustes de avisos.; `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 16** (día 3 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
