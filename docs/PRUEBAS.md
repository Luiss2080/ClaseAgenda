# Plan de pruebas — ClaseAgenda

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | Una clase tiene estados: programada, realizada, cancelada o reprogramada. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-02 | Reprogramar una clase crea una nueva clase y deja la original como reprogramada. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-03 | No puede haber dos clases superpuestas en el mismo horario. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-04 | La mensualidad se paga por mes (AAAA-MM); un alumno debe si el mes actual no está pagado pasado el día de cobro. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-05 | Las clases canceladas por el profesor no se descuentan; las canceladas por el alumno quedan a criterio del profesor (sin descuento automático). | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-06 | El recordatorio de clase se programa antes del inicio según los minutos configurados. | Unitaria o manual | Caso válido, caso inválido, límite |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Registrar alumnos y mensualidad (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | no hay alumnos | abro Alumnos | veo el estado vacío con «Agregar alumno» | ☐ |
| CP-01-2 | mensualidad vacía o 0 | intento guardar | la app avisa que debe ser mayor a 0 | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Agendar clases (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | una clase de 18:00 a 19:00 | intento agendar otra a las 18:30 | la app avisa que se superpone y no guarda | ☐ |
| CP-02-2 | una clase programada | abro Agenda | la veo en el día y hora correctos | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Marcar estado y tema dado (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | una clase de hoy | la marco realizada con el tema «fracciones» | queda con el tema en el historial del alumno | ☐ |
| CP-03-2 | una clase que reprogramo | elijo nueva fecha | se crea una nueva clase y la original queda como reprogramada | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Controlar pagos y deudas (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | un alumno sin pago del mes | abro Deudas | aparece con el monto pendiente | ☐ |
| CP-04-2 | registro el pago de mayo | guardo | el alumno sale de deudas de mayo | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Recordatorios (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | una clase en 60 minutos | llega la hora del aviso | recibo una notificación local con alumno y hora | ☐ |
| CP-05-2 | un alumno con deuda | toco «Recordar pago» | se abre WhatsApp con el mensaje prellenado | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Clase en un horario que cruza medianoche: no permitido en el MVP. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Alumno que paga adelantado varios meses: registrar un pago por mes. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Cambio de mensualidad: aplica desde el mes siguiente. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Cambio de zona horaria del teléfono: las horas se guardan locales. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Alumnos y mensualidades**

- [ ] Puedo cargar 10 alumnos y verlos tras reiniciar.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Agenda de clases**

- [ ] Las superposiciones se detectan en los casos de prueba.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Pagos y deudas**

- [ ] La lista de deudores coincide con los casos de prueba.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Recordatorios**

- [ ] Las notificaciones llegan y se cancelan al cancelar la clase.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
