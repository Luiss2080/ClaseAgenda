# Pantallas y flujos — ClaseAgenda

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Alumnos | `app/alumnos.tsx` | Lista / vista |
| Agenda | `app/agenda.tsx` | Lista / vista |
| Formulario de clase | `app/formulario-de-clase.tsx` | Formulario |
| Pagos y deudas | `app/pagos-y-deudas.tsx` | Lista / vista |
| Ajustes | `app/ajustes.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Clases de hoy y alumnos con deuda
- **Acciones:** Marcar clase, registrar pago

**Bosquejo**

```
┌──────────────────────────────┐
│ ClaseAgenda                  │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Alumnos                  │
│  ▸ Agenda                   │
│  ▸ Pagos y deudas           │
│  ▸ Ajustes                  │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Clases de hoy y alumnos con deuda |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Alumnos

- **Archivo:** `app/alumnos.tsx`
- **Qué muestra:** Lista con materia, mensualidad y estado de pago
- **Acciones:** Crear, editar
- **Historias relacionadas:** HU-01, HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Alumnos                     │
├──────────────────────────────┤
│ nombre · mensualidad         │
│ nombre · mensualidad         │
│ nombre · mensualidad         │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay alumnos. Tocá «Crear» para empezar. |
| Con datos | Lista con materia, mensualidad y estado de pago |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Agenda

- **Archivo:** `app/agenda.tsx`
- **Qué muestra:** Vista semanal con clases por día
- **Acciones:** Agendar, cambiar estado
- **Historias relacionadas:** HU-02, HU-03, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Agenda                      │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Vista semanal con clases por día |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Formulario de clase

- **Archivo:** `app/formulario-de-clase.tsx`
- **Qué muestra:** Alumno, fecha, hora, duración, tema
- **Acciones:** Guardar
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| alumno id | Selector de alumnos | Sí | Debe existir en `alumnos` |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| hora | Hora | Sí | Formato HH:MM (00:00–23:59) |
| duracion min | Numérico entero | Sí | Entero mayor o igual a 0 |
| estado | Selector / fichas | Sí | Uno de: `pendiente`, `realizada`, `cancelada`, `reprogramada` |
| tema | Texto | No | Texto de 1 a 80 caracteres sin espacios sobrantes |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de clase         │
├──────────────────────────────┤
│ alumno id                    │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ hora                         │
│ [____________________]       │
│ duracion min                 │
│ [____________________]       │
│ estado                       │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay clases. Tocá «Guardar» para empezar. |
| Con datos | Alumno, fecha, hora, duración, tema |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Pagos y deudas

- **Archivo:** `app/pagos-y-deudas.tsx`
- **Qué muestra:** Pagos por mes y deudores
- **Acciones:** Registrar pago, recordar por WhatsApp
- **Historias relacionadas:** HU-01, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Pagos y deudas              │
├──────────────────────────────┤
│ periodo · alumno_id          │
│ periodo · alumno_id          │
│ periodo · alumno_id          │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay pagos. Tocá «Registrar pago» para empezar. |
| Con datos | Pagos por mes y deudores |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Ajustes

- **Archivo:** `app/ajustes.tsx`
- **Qué muestra:** Minutos de aviso y plantilla de mensajes
- **Acciones:** Guardar
- **Historias relacionadas:** HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Ajustes                     │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Minutos de aviso y plantilla de mensajes |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Registrar alumnos y mensualidad**

```
abro Alumnos  →  veo el estado vacío con «Agregar alumno»
```

**HU-02 — Agendar clases**

```
intento agendar otra a las 18:30  →  la app avisa que se superpone y no guarda
```

**HU-03 — Marcar estado y tema dado**

```
la marco realizada con el tema «fracciones»  →  queda con el tema en el historial del alumno
```

**HU-04 — Controlar pagos y deudas**

```
abro Deudas  →  aparece con el monto pendiente
```

**HU-05 — Recordatorios**

```
llega la hora del aviso  →  recibo una notificación local con alumno y hora
```
