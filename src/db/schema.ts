// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE alumnos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT, materia TEXT, mensualidad REAL NOT NULL DEFAULT 0);
CREATE TABLE clases (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE, fecha TEXT NOT NULL, hora TEXT NOT NULL, duracion_min INTEGER NOT NULL DEFAULT 60, estado TEXT NOT NULL DEFAULT 'pendiente', tema TEXT);
CREATE TABLE pagos (id INTEGER PRIMARY KEY AUTOINCREMENT, alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE, periodo TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL);`,
];

export const TABLAS = ['alumnos', 'clases', 'pagos'] as const;
