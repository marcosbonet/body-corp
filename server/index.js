import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import measurementRoutes from "./routes/measurementRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Error de conexión a la base de datos:")
);
db.once("open", () => console.log("Conexión exitosa a la base de datos"));

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());
app.use("/", measurementRoutes); // Assuming you want to prefix all measurement routes with '/api'
// Escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
