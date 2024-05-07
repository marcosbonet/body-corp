import "./styles.css";
import React, { useState } from "react";
import MeasurementForm from "./components/MeasurementForm.js";
import Report from "./components/Report.js";
import { postData } from "./services/apis.js";

function App() {
  const [formData, setFormData] = useState({
    weight1: "",
    weight2: "" || undefined,
    weight3: "" || undefined,
    height1: "",
    height2: "" || undefined,
    height3: "" || undefined,
    iliacCrest1: "",
    iliacCrest2: "" || undefined,
    iliacCrest3: "" || undefined,
    supraSpinal1: "",
    supraSpinal2: "" || undefined,
    supraSpinal3: "" || undefined,
    abdominal1: "",
    abdominal2: "" || undefined,
    abdominal3: "" || undefined,
    thigh1: "",
    thigh2: "" || undefined,
    thigh3: "" || undefined,
    forearm1: "",
    forearm2: "" || undefined,
    forearm3: "" || undefined,
    leg1: "",
    leg2: "" || undefined,
    leg3: "" || undefined,
  });
  const [showReport, setShowReport] = useState(false);
  const handleInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      weight: weightAvg,
      height: heightAvg,
      iliacCrest: iliacCrestAvg,
      supraSpinal: supraSpinalAvg,
      abdominal: abdominalAvg,
      thigh: thighAvg,
      forearm: forearmAvg,
      leg: legAvg,
    };
    setShowReport(true);
    const success = await postData("measurements", dataToSend);
    if (success) {
      console.log("Datos guardados correctamente");
    } else {
      console.error("Error al guardar los datos");
    }
  };

  const weight =
    formData.weight2 === undefined && formData.weight3 === undefined
      ? parseFloat(formData.weight1)
      : (parseFloat(formData.weight1) +
          parseFloat(formData.weight2) +
          parseFloat(formData.weight3)) /
        3;
  const weightAvg = weight.toFixed(2);
  console.log(weightAvg);
  const height =
    formData.height2 === undefined && formData.height3 === undefined
      ? parseFloat(formData.height1)
      : (parseFloat(formData.height1) +
          parseFloat(formData.height2) +
          parseFloat(formData.height3)) /
        3;
  const heightAvg = height.toFixed(2);
  const iliacCrest =
    formData.iliacCrest2 === undefined && formData.iliacCrest3 === undefined
      ? parseFloat(formData.iliacCrest1)
      : (parseFloat(formData.iliacCrest1) +
          parseFloat(formData.iliacCrest2) +
          parseFloat(formData.iliacCrest3)) /
        3;
  const iliacCrestAvg = iliacCrest.toFixed(2);
  const supraSpinal =
    formData.supraSpinal2 === undefined && formData.supraSpinal3 === undefined
      ? parseFloat(formData.supraSpinal1)
      : (parseFloat(formData.supraSpinal1) +
          parseFloat(formData.supraSpinal2) +
          parseFloat(formData.supraSpinal3)) /
        3;
  const supraSpinalAvg = supraSpinal.toFixed(2);
  const abdominal =
    formData.abdominal2 === undefined && formData.abdominal3 === undefined
      ? parseFloat(formData.abdominal1)
      : (parseFloat(formData.abdominal1) +
          parseFloat(formData.abdominal2) +
          parseFloat(formData.abdominal3)) /
        3;
  const abdominalAvg = abdominal.toFixed(2);
  const thigh =
    formData.thigh2 === undefined && formData.thigh3 === undefined
      ? parseFloat(formData.thigh1)
      : (parseFloat(formData.thigh1) +
          parseFloat(formData.thigh2) +
          parseFloat(formData.thigh3)) /
        3;
  const thighAvg = thigh.toFixed(2);
  const forearm =
    formData.forearm2 === undefined && formData.forearm3 === undefined
      ? parseFloat(formData.forearm1)
      : (parseFloat(formData.forearm1) +
          parseFloat(formData.forearm2) +
          parseFloat(formData.forearm3)) /
        3;

  const forearmAvg = forearm.toFixed(2);
  const leg =
    formData.leg2 === undefined && formData.leg3 === undefined
      ? parseFloat(formData.leg1)
      : (parseFloat(formData.leg1) +
          parseFloat(formData.leg2) +
          parseFloat(formData.leg3)) /
        3;
  const legAvg = leg.toFixed(2);
  return (
    <div className="container">
      <h1>Formulario de Medicion Corporal</h1>
      {!showReport ? (
        <MeasurementForm
          formData={formData}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          weightAvg={weightAvg}
          heightAvg={heightAvg}
          iliacCrestAvg={iliacCrestAvg}
          supraSpinalAvg={supraSpinalAvg}
          abdominalAvg={abdominalAvg}
          thighAvg={thighAvg}
          forearmAvg={forearmAvg}
          legAvg={legAvg}
        />
      ) : (
        <Report />
      )}
    </div>
  );
}

export default App;
