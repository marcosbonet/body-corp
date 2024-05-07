import React from "react";
import "../styles.css";
import { getReport } from "../services/apis";

function Report({
  weightAvg,
  heightAvg,
  iliacCrestAvg,
  supraSpinalAvg,
  abdominalAvg,
  thighAvg,
  forearmAvg,
  legAvg,
}) {
  const handleDownload = async () => {
    const success = await getReport("report");
    window.location.reload();
    if (success) {
      console.log("Informe generado correctamente");
      window.location.reload();
    } else {
      console.error("Error al crear informe");
    }
  };

  return (
    <div>
      <h2>Generated Report</h2>
      <p>Weight Average: {weightAvg} kg</p>
      <p>Height Average: {heightAvg} cm</p>
      <p>Iliac Crest Average: {iliacCrestAvg} mm</p>
      <p>Supraespinal Average: {supraSpinalAvg} mm</p>
      <p>Abdominal Average: {abdominalAvg} mm</p>
      <p>Thigh Average: {thighAvg} cm</p>
      <p>Forearm Average: {forearmAvg} cm</p>
      <p>Leg Average: {legAvg} cm</p>
      <button type="submit" onClick={handleDownload}>
        Descargar Informe
      </button>
    </div>
  );
}
export default Report;
