import PDFDocument from "pdfkit";
import fs from "fs";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

const generatePDF = async (measurements) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const pdfStream = fs.createWriteStream("informe.pdf");
      doc.pipe(pdfStream);
      doc.fontSize(16).text("Informe de Mediciones", { align: "center" });
      doc.moveDown();
      doc
        .fontSize(12)
        .text(`Peso: ${measurements[measurements.length - 1].weight} kg`, {
          align: "center",
        });

      const sumOfFoldsData = measurements.map((measurement) => {
        return (
          measurement.iliacCrest +
          measurement.supraSpinal +
          measurement.abdominal
        );
      });
      const valueAvg = sumOfFoldsData[sumOfFoldsData.length - 1];
      doc.text(`Suma de Pliegues:: ${valueAvg} cm`, {
        align: "center",
      });
      doc.moveDown();

      const weightData = measurements.map((measurement) => measurement.weight);
      const weightCanvas = await createChartCanvas(
        weightData,
        "Evolución del Peso"
      );
      if (measurements.length > 1) {
        const lastMeasurement = measurements[measurements.length - 1];
        const prevMeasurement = measurements[measurements.length - 2];
        const comparisonData = {
          iliacCrest: lastMeasurement.iliacCrest - prevMeasurement.iliacCrest,
          supraSpinal:
            lastMeasurement.supraSpinal - prevMeasurement.supraSpinal,
          abdominal: lastMeasurement.abdominal - prevMeasurement.abdominal,
        };
        doc
          .fontSize(12)
          .text("Comparativa con la ultima medicion de pliegues en cm:", {
            align: "center",
          });
        doc.text(`Iliac Crest: ${comparisonData.iliacCrest}`, {
          align: "center",
        });
        doc.text(`Supra Spinal: ${comparisonData.supraSpinal}`, {
          align: "center",
        });
        doc.text(`Abdominal: ${comparisonData.abdominal}`, { align: "center" });
      }
      const muscleMassData = measurements.map(calculateMuscleMass);
      const roundedMuscleMass =
        muscleMassData[muscleMassData.length - 1].toFixed(2);
      doc.text(`Masa muscular: ${roundedMuscleMass} kg`, {
        align: "center",
      });
      if (measurements.length > 1) {
        const lastMuscleMass = muscleMassData[muscleMassData.length - 1];
        const prevMuscleMass = muscleMassData[muscleMassData.length - 2];
        const muscleMassComparison = lastMuscleMass - prevMuscleMass;
        doc
          .fontSize(12)
          .text("Comparativa con la ultima medicion de Masa Muscular en kg:", {
            align: "center",
          });
        doc.text(` ${muscleMassComparison.toFixed(2)}`, {
          align: "center",
        });
      }
      doc.image(weightCanvas, { align: "center" });
      doc.moveDown(13);

      const foldsCanvas = await createChartCanvas(
        sumOfFoldsData,
        "Evolución de la Suma de Pliegues"
      );
      doc.image(foldsCanvas, { align: "center" });
      doc.moveDown(13);
      const muscleMassCanvas = await createChartCanvas(
        muscleMassData,
        "Evolución de la Masa Muscular"
      );
      doc.image(muscleMassCanvas, { align: "center" });
      doc.moveDown();
      doc.end();
      pdfStream.on("finish", () => {
        const pdfBuffer = fs.readFileSync("informe.pdf");
        fs.unlinkSync("informe.pdf");
        resolve(pdfBuffer);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const calculateMuscleMass = (measurement) => {
  const height = parseFloat(measurement.height);
  const thigh = parseFloat(measurement.thigh);
  const forearm = parseFloat(measurement.forearm);
  const leg = parseFloat(measurement.leg);

  return (
    (height * 0.0553 * Math.pow(thigh, 2) +
      0.0987 * Math.pow(forearm, 2) +
      0.0331 * Math.pow(leg, 2) -
      2554) /
    1000
  );
};

const createChartCanvas = async (data, label) => {
  const chartNode = new ChartJSNodeCanvas({
    width: 470,
    height: 150,
  });
  const configuration = {
    type: "line",
    data: {
      labels: Array.from({ length: data.length }, (_, i) => i + 1),
      datasets: [{ label, data }],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.5,
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: "rgb(75, 192, 192)",
      pointBorderColor: "rgba(75, 192, 192, 0.2)",
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "rgb(75, 192, 192)",
      pointHoverBorderColor: "rgba(75, 192, 192, 0.2)",
    },
  };
  const chartCanvas = await chartNode.renderToBuffer(configuration);
  return chartCanvas;
};

export default generatePDF;
