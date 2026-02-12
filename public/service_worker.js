const iniciar = async () => {
  const sqlite3 = await sqlite3InitModule({
    print: console.log,
    printErr: console.error,
  });
  if ("opfs" in sqlite3) {
    db = new sqlite3.oo1.OpfsDb(NOMBRE_BASE_DE_DATOS);
    console.log(
      "OPFS is available, created persisted database at",
      db.filename,
    );
  } else {
    db = new sqlite3.oo1.DB(NOMBRE_BASE_DE_DATOS, "ct");
    console.log(
      "OPFS is not available, created transient database",
      db.filename,
    );
  }
  await db.exec(`CREATE TABLE IF NOT EXISTS personas(
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				nombre TEXT NOT NULL,
				fechaNacimiento TEXT NOT NULL)`);
};

const insertarPersona = async (nombre, fechaNacimiento) => {
  const filas = await db.exec({
    sql: "INSERT INTO personas(nombre, fechaNacimiento) VALUES (?, ?) RETURNING *",
    bind: [nombre, fechaNacimiento],
    returnValue: "resultRows",
    rowMode: "object",
  });
  return filas[0];
};
const obtenerPersonas = async () => {
  return await db.exec({
    sql: "SELECT id, nombre, fechaNacimiento FROM personas",
    returnValue: "resultRows",
    rowMode: "object",
  });
};
