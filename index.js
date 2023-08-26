import e from "express";
import loginRouter from "./routes/loginRoutes.js";
import { errorResponse } from "./ultils/response.js";

const app = e();
const port = 8080;
const host = "localhost";

app.use(e.json());
app.use("/daftar", loginRouter);

app.use((error, request, response, next) => {
  const message = "internal server error";
  console.log(error.message);
  errorResponse(response, message, 500);
});

app.listen(port, host, () => {
  console.log(`server berjalan di http://${host}:${port}`);
});
