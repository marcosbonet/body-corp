import React from "react";
import "../styles.css";
import { getReport } from "../services/apis";
import { useState, useEffect } from "react";
import { getData } from "../services/apis";
import Chart from "chart.js/auto";

function Report() {
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

  const [reportData, setReportData] = useState(null);
  const [weightChart, setWeightChart] = useState(null);
  const [muscleMassChart, setMuscleMassChart] = useState(null);
  const [sumOfFoldsChart, setSumOfFoldsChart] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("measurements");
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (reportData) {
      createWeightChart();
      createMuscleMassChart();
      createSumOfFoldsChart();
    }
    return () => {
      if (weightChart) weightChart.destroy();
      if (muscleMassChart) muscleMassChart.destroy();
      if (sumOfFoldsChart) sumOfFoldsChart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportData]);

  const createWeightChart = () => {
    const ctx = document.getElementById("weightChart");
    if (ctx) {
      if (weightChart) weightChart.destroy(); // Destroy previous chart if exists
      const newWeightChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: reportData.map((measurement, index) => index + 1),
          datasets: [
            {
              label: "Evolución del Peso",
              data: reportData.map((measurement) => measurement.weight),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.5,
            },
          ],
        },
      });
      setWeightChart(newWeightChart);
    }
  };

  const createMuscleMassChart = () => {
    const ctx = document.getElementById("muscleMassChart");
    if (ctx) {
      if (muscleMassChart) muscleMassChart.destroy(); // Destroy previous chart if exists
      const newMuscleMassChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: reportData.map((measurement, index) => index + 1),
          datasets: [
            {
              label: "Evolución de la Masa Muscular",
              data: reportData.map((measurement) =>
                calculateMuscleMass(measurement)
              ),
              borderColor: "rgb(255, 99, 132)",
              tension: 0.5,
            },
          ],
        },
      });
      setMuscleMassChart(newMuscleMassChart);
    }
  };

  const createSumOfFoldsChart = () => {
    const ctx = document.getElementById("sumOfFoldsChart");
    if (ctx) {
      if (sumOfFoldsChart) sumOfFoldsChart.destroy(); // Destroy previous chart if exists
      const newSumOfFoldsChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: reportData.map((measurement, index) => index + 1),
          datasets: [
            {
              label: "Evolución de la Suma de Pliegues",
              data: reportData.map(
                (measurement) =>
                  measurement.iliacCrest +
                  measurement.supraSpinal +
                  measurement.abdominal
              ),
              borderColor: "rgb(54, 162, 235)",
              tension: 0.5,
            },
          ],
        },
      });
      setSumOfFoldsChart(newSumOfFoldsChart);
    }
  };

  if (reportData) {
    const weight = reportData[reportData.length - 1].weight;
    const height = reportData[reportData.length - 1].height;
    let sumOfFolds = 0;
    for (
      let i = reportData.length - 1;
      i >= Math.max(reportData.length - 3, 0);
      i--
    ) {
      const measurement = reportData[i];
      sumOfFolds +=
        measurement.iliacCrest +
        measurement.supraSpinal +
        measurement.abdominal;
    }

    const muscleMass = calculateMuscleMass(
      reportData[reportData.length - 1]
    ).toFixed(2);

    const muscleMassCurrent = muscleMass;
    const muscleMassMedicion3 = calculateMuscleMass(
      reportData[reportData.length - 3]
    );
    const comparisonMuscleMass = muscleMassCurrent - muscleMassMedicion3;

    const currentMeasurement = reportData[reportData.length - 1];
    const lastMeasurement = reportData[reportData.length - 2];
    const comparisonPliegues = {
      iliacCrest: currentMeasurement.iliacCrest - lastMeasurement.iliacCrest,
      supraSpinal: currentMeasurement.supraSpinal - lastMeasurement.supraSpinal,
      abdominal: currentMeasurement.abdominal - lastMeasurement.abdominal,
    };
    if (!reportData) {
      return <div>Loading...</div>;
    }
    console.log(reportData);
    return (
      <div>
        <h2>Reporte de condicion corporal</h2>

        <div>
          <h3>Peso y Altura</h3>
          <p>Peso: {weight} kg</p>
          <p>Altura: {height} cm</p>
          <canvas id="weightChart"></canvas>
        </div>
        <div>
          <h3>Comparativa entre sumatoria de pliegues y ultima medicion</h3>
          <p>Pliegue Cresta Iliaca: {comparisonPliegues.iliacCrest}</p>
          <p>Pliegue Supraspinal: {comparisonPliegues.supraSpinal}</p>
          <p>Pliegue Abdominal: {comparisonPliegues.abdominal}</p>
        </div>
        <div>
          <h3>Sumatoria de pliegues</h3>
          <p> {sumOfFolds}</p>
          <canvas id="sumOfFoldsChart"></canvas>
        </div>

        <div>
          <h3>Masa muscular</h3>
          <p> {muscleMass}</p>
          <h3>Comparative entre la masa muscular y la ultima medicion</h3>
          <p>{comparisonMuscleMass.toFixed(2)}</p>
          <canvas id="muscleMassChart"></canvas>
        </div>

        <button className="buttonSubmit" type="submit" onClick={handleDownload}>
          Descargar Informe
        </button>
      </div>
    );
  }
}

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
export default Report;
