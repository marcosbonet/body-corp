import { Router } from "express";
import Measurement from "../models/Measurement.js";
import generatePDF from "../report/reportGenerator.js";

const router = Router();

router.post("/measurements", async (req, res) => {
  console.log(req);
  try {
    const measurement = new Measurement(req.body);
    await measurement.save();
    res
      .status(201)
      .json({ message: "Medición creada exitosamente", data: measurement });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/measurements", async (req, res) => {
  try {
    const measurements = await Measurement.find();
    res.json(measurements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/report", async (req, res) => {
  try {
    // Obtener los datos de la base de datos (ejemplo)
    const measurements = await Measurement.find().sort({ createdAt: 1 });

    // Generar el informe en PDF con los datos obtenidos
    const pdfBuffer = await generatePDF(measurements);

    // Devolver el PDF como una respuesta al cliente
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=informe.pdf",
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error al generar el informe en PDF:", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
