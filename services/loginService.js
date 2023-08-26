import * as LoginRepo from "../repository/login.js";
import { successResponse, errorResponse } from "../ultils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY_AT = "prakerja.com";
const SECRET_KEY_RT = "meti.com";

const login = [];
export const getLogin = async (request, response, next) => {
  try {
    const [result] = await LoginRepo.getDataLogin();
    successResponse(response, "success", result);
  } catch (error) {
    next(error);
  }
};

export const createLogin = async (request, response, next) => {
  try {
    let nim = request.body.nim;
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;

    const saltRound = 10;
    bcrypt.hash(password, saltRound, async (err, hash) => {
      const [result] = await LoginRepo.createDataLogin(nim, name, email, hash);
      let id = result.insertId;
      const [users] = await LoginRepo.getDataByIdLogin(id);
      successResponse(response, "success create daftar", users[0], 201);
    });
  } catch (error) {
    next(error);
  }
};

export const updateLogin = async (request, response, next) => {
  const id = request.params.id;
  const nim = request.body.nim;
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;

  const [result] = await LoginRepo.updateDataLogin(
    nim,
    name,
    email,
    password,
    id
  );
  try {
    if (result.affectedRows === 1) {
      successResponse(response, "Successfully update", {
        nim,
        name,
        email,
        password,
        id,
      });
    } else {
      errorResponse(response, "Data not found");
    }
  } catch (error) {
    errorResponse(response, "An error occurred", 500);
  }
};

export const deleteLogin = async (request, response, next) => {
  const id = request.params.id;

  const [result] = await LoginRepo.deleteDataLogin(id);
  try {
    if (result.affectedRows === 1) {
      successResponse(response, "Successfully deleted data", { id });
    } else {
      errorResponse(response, "Data not found");
    }
  } catch (error) {
    errorResponse(response, "An error occurred", 500);
  }
};

export const getDataByIdLogin = async (request, response, next) => {
  const id = request.params.id;

  const [result] = await LoginRepo.getDataById(id);
  try {
    if (result.affectedRows === 1) {
      successResponse(response, "Successfully deleted data", { id });
    } else {
      errorResponse(response, "Data not found");
    }
  } catch (error) {
    errorResponse(response, "An error occurred", 500);
  }
};

export const authenticationUser = async (request, response, next) => {
  try {
    let email = request.body.email;
    let password = request.body.password;
    const [result] = await LoginRepo.getDataByEmail(email);

    if (result.length > 0) {
      const user = result[0];

      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let claims = {
            id: user.id_daftar,
            name: user.name,
            email: user.email,
          };

          const accessToken = jwt.sign(claims, SECRET_KEY_AT, {
            expiresIn: "15m",
          });
          const refreshToken = jwt.sign(claims, SECRET_KEY_RT, {
            expiresIn: "30m",
          });
          let data = {
            access_token: accessToken,
            refresh_token: refreshToken,
          };
          successResponse(response, "berhasil login", data);
        }
      });
    } else {
      errorResponse(response, "email atau password tidak cocok");
    }
  } catch (error) {
    next(error);
  }
};
