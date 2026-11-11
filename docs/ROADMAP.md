# Roadmap de ClaseAgenda

> Que el profesor particular sepa a quién le da clase hoy, qué tema dio y quién le debe la mensualidad.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Agenda de clases particulares: alumnos, horarios, mensualidad cobrada o pendiente.
- **Usuario:** Profesor particular o academia pequeña con 5 a 40 alumnos y cobro mensual.
- **Duración estimada:** ~16 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Alumnos y mensualidades | Alumnos y mensualidades. | 3 | 1 |
| 3 | Agenda de clases | Agenda de clases. | 5 | 2 |
| 4 | Pagos y deudas | Pagos y deudas. | 3 | 3 |
| 5 | Recordatorios | Recordatorios. | 3 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Alumnos y mensualidades

**Demo:** Puedo cargar 10 alumnos y verlos tras reiniciar.

### Hito 3 — Agenda de clases

**Demo:** Las superposiciones se detectan en los casos de prueba.

### Hito 4 — Pagos y deudas

**Demo:** La lista de deudores coincide con los casos de prueba.

### Hito 5 — Recordatorios

**Demo:** Las notificaciones llegan y se cancelan al cancelar la clase.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Alumnos y mensualidades

- **Objetivo:** Alumnos y mensualidades.
- **Historias cubiertas:** HU-01 Registrar alumnos y mensualidad
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Puedo cargar 10 alumnos y verlos tras reiniciar.

### Fase 3 — Agenda de clases

- **Objetivo:** Agenda de clases.
- **Historias cubiertas:** HU-02 Agendar clases; HU-03 Marcar estado y tema dado
- **Depende de:** fase 2.
- **Duración:** 5 días.
- **Criterio de salida:**
  - Las superposiciones se detectan en los casos de prueba.

### Fase 4 — Pagos y deudas

- **Objetivo:** Pagos y deudas.
- **Historias cubiertas:** HU-04 Controlar pagos y deudas
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - La lista de deudores coincide con los casos de prueba.

### Fase 5 — Recordatorios

- **Objetivo:** Recordatorios.
- **Historias cubiertas:** HU-05 Recordatorios
- **Depende de:** fase 4.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Las notificaciones llegan y se cancelan al cancelar la clase.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Alumnos y mensualidades
- [ ] **Fase 3:** Agenda de clases
- [ ] **Fase 4:** Pagos y deudas
- [ ] **Fase 5:** Recordatorios

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Registrar alumnos y mensualidad | 2 | Alumnos y mensualidades |
| HU-02 Agendar clases | 3 | Agenda de clases |
| HU-03 Marcar estado y tema dado | 3 | Agenda de clases |
| HU-04 Controlar pagos y deudas | 4 | Pagos y deudas |
| HU-05 Recordatorios | 5 | Recordatorios |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 35 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 10 | 100 % |
| Reglas cubiertas | RN con prueba / 6 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
