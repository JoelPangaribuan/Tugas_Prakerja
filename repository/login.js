import dbPool from "../ultils/db.js";

export const getDataLogin = () => {
  const sql = "SELECT nim, name, email, password FROM login";

  return dbPool.query(sql);
};

export const createDataLogin = (nim, name, email, password) => {
  const sql =
    "INSERT INTO login (nim,name, email, password) VALUE (?, ?, ?, ?)";
  const value = [nim, name, email, password];
  const result = dbPool.query(sql, value);

  return result;
};

export const updateDataLogin = (nim, name, email, password, id) => {
  const sql =
    "UPDATE login SET nim=?,name = ?, email=?, password=? WHERE id_daftar = ?";
  const value = [nim, name, email, password, id];
  const result = dbPool.query(sql, value);

  return result;
};

export const deleteDataLogin = (id) => {
  const sql = "DELETE FROM login WHERE id_daftar = ?";
  const result = dbPool.query(sql, [id]);

  return result;
};

export const getDataByIdLogin = (id, name, email, password) => {
  const sql = "SELECT * FROM login WHERE id_daftar = ?";
  const value = [id, name, email, password];
  const result = dbPool.query(sql, value);

  return result;
};

export const getDataByEmail = (email) => {
  const sql =
    "SELECT id_daftar, name, email, password FROM login WHERE email = ?";

  return dbPool.query(sql, [email]);
};

export const getDataById = (id) => {
  const sql =
    "SELECT id_daftar, name, email, password FROM login WHERE id_daftar = ?";

  return dbPool.query(sql, [id]);
};
