# Modelo de datos — ClaseAgenda

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `clases.alumno_id` | `alumnos` | Al borrar el padre se borran los hijos |
| `pagos.alumno_id` | `alumnos` | Al borrar el padre se borran los hijos |

```
alumnos  ──<  clases, pagos
clases
pagos
```

## 3. Detalle por tabla

### 3.1 `alumnos`

Alumnos con materia y mensualidad pactada.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |
| `materia` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí materia» |
| `mensualidad` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |

**Consultas base** (en `src/db/alumnos.ts`):

```ts
listar(): Promise<Alumno[]>            // SELECT * FROM alumnos ORDER BY id DESC
obtener(id: number): Promise<Alumno | null>   // SELECT * FROM alumnos WHERE id = ?
crear(datos: NuevoAlumno): Promise<number>   // INSERT INTO alumnos (nombre, telefono, materia, mensualidad) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoAlumno): Promise<void>   // UPDATE alumnos SET nombre = ?, telefono = ?, materia = ?, mensualidad = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM alumnos WHERE id = ?
```

### 3.2 `clases`

Cada clase con fecha, hora, duración, tema y estado.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `alumno_id` | INTEGER → `number` | Selector de alumnos | Obligatorio; Debe existir en `alumnos` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `hora` | TEXT → `string` | Hora | Obligatorio; Formato HH:MM (00:00–23:59) | «Hora no válida» |
| `duracion_min` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0; Valor inicial `60` | «Ingresá un número entero» |
| `estado` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `pendiente`, `realizada`, `cancelada`, `reprogramada`; Valor inicial `pendiente` | «Elegí una opción» |
| `tema` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí tema» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_clases_alumno_id ON clases(alumno_id);
CREATE INDEX IF NOT EXISTS idx_clases_fecha ON clases(fecha);
CREATE INDEX IF NOT EXISTS idx_clases_estado ON clases(estado);
```

**Consultas base** (en `src/db/clases.ts`):

```ts
listar(): Promise<Clase[]>            // SELECT * FROM clases ORDER BY id DESC
obtener(id: number): Promise<Clase | null>   // SELECT * FROM clases WHERE id = ?
crear(datos: NuevoClase): Promise<number>   // INSERT INTO clases (alumno_id, fecha, hora, duracion_min, estado, tema) VALUES (?, ?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoClase): Promise<void>   // UPDATE clases SET alumno_id = ?, fecha = ?, hora = ?, duracion_min = ?, estado = ?, tema = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM clases WHERE id = ?
listarPorAlumno(alumno_id: number): Promise<Clase[]>   // WHERE alumno_id = ?
```

### 3.3 `pagos`

Pagos mensuales por alumno.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `alumno_id` | INTEGER → `number` | Selector de alumnos | Obligatorio; Debe existir en `alumnos` | «Elegí un registro» |
| `periodo` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí periodo» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_pagos_alumno_id ON pagos(alumno_id);
CREATE INDEX IF NOT EXISTS idx_pagos_fecha ON pagos(fecha);
```

**Consultas base** (en `src/db/pagos.ts`):

```ts
listar(): Promise<Pago[]>            // SELECT * FROM pagos ORDER BY id DESC
obtener(id: number): Promise<Pago | null>   // SELECT * FROM pagos WHERE id = ?
crear(datos: NuevoPago): Promise<number>   // INSERT INTO pagos (alumno_id, periodo, monto, fecha) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoPago): Promise<void>   // UPDATE pagos SET alumno_id = ?, periodo = ?, monto = ?, fecha = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM pagos WHERE id = ?
listarPorAlumno(alumno_id: number): Promise<Pago[]>   // WHERE alumno_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Alumno {
  id: number;
  nombre: string;
  telefono: string | null;
  materia: string | null;
  mensualidad: number;
}
export type NuevoAlumno = Omit<Alumno, 'id'>;

export interface Clase {
  id: number;
  alumno_id: number;
  fecha: string;
  hora: string;
  duracion_min: number;
  estado: string;
  tema: string | null;
}
export type NuevoClase = Omit<Clase, 'id'>;

export interface Pago {
  id: number;
  alumno_id: number;
  periodo: string;
  monto: number;
  fecha: string;
}
export type NuevoPago = Omit<Pago, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`clases.estado`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `pendiente` | Pendiente |
| `realizada` | Realizada |
| `cancelada` | Cancelada |
| `reprogramada` | Reprogramada |

```ts
export const CLASES_ESTADO = ['pendiente', 'realizada', 'cancelada', 'reprogramada'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 3 | Enlazar la clase nueva con la original al reprogramar. |
| 3 | 5 | Minutos de aviso de clase y plantillas de mensaje. |

**Migración 2** (fase 3)

```sql
ALTER TABLE clases ADD COLUMN reprogramada_de INTEGER REFERENCES clases(id);
```

**Migración 3** (fase 5)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE alumnos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT, materia TEXT, mensualidad REAL NOT NULL DEFAULT 0);
CREATE TABLE clases (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE, fecha TEXT NOT NULL, hora TEXT NOT NULL, duracion_min INTEGER NOT NULL DEFAULT 60, estado TEXT NOT NULL DEFAULT 'pendiente', tema TEXT);
CREATE TABLE pagos (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE, periodo TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** Una clase tiene estados: programada, realizada, cancelada o reprogramada.
- **RN-02** Reprogramar una clase crea una nueva clase y deja la original como reprogramada.
- **RN-03** No puede haber dos clases superpuestas en el mismo horario.
- **RN-04** La mensualidad se paga por mes (AAAA-MM); un alumno debe si el mes actual no está pagado pasado el día de cobro.
- **RN-05** Las clases canceladas por el profesor no se descuentan; las canceladas por el alumno quedan a criterio del profesor (sin descuento automático).
- **RN-06** El recordatorio de clase se programa antes del inicio según los minutos configurados.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
