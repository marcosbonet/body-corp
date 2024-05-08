import React, { useState } from "react";
import "../styles.css";

function MeasurementForm({
  formData,
  onInputChange,
  onSubmit,
  setVoiceRecognitionActive,
  handleVoiceCommand,
  voiceRecognitionActive,
  toggleFormValidation,
  formValidationActive,
  weightAvg,
  heightAvg,
  iliacCrestAvg,
  supraSpinalAvg,
  abdominalAvg,
  thighAvg,
  forearmAvg,
  legAvg,
}) {
  const [recognition, setRecognition] = useState(null);

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.onstart = () => console.log("Voice recognition started");
    recognition.onend = () => console.log("Voice recognition stopped");
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript;
      console.log("Command:", command);
      handleVoiceCommand(command);
    };
    setRecognition(recognition);
    recognition.start();
    setVoiceRecognitionActive(true);
  };

  const stopVoiceRecognition = () => {
    if (recognition) {
      recognition.stop();
      setVoiceRecognitionActive(false);
    }
  };
  const [focusedField, setFocusedField] = useState(null);
  const [focusedMessage, setFocusedMessage] = useState(null);
  const handleFocus = (fieldName, measurementType) => {
    const measurementInstructions = {
      supraSpinal1:
        "Coloque la pinza a 1 cm a la derecha del punto medio del borde inferior de la escápula, en línea con el ángulo inferior del omóplato.",
      abdominal1:
        "Coloque la pinza a 2 cm a la derecha del ombligo, en línea horizontal con este.",
      thigh1:
        "Coloque la cinta métrica alrededor del muslo, en la parte más sobresaliente de los glúteos y las caderas, pasando por la parte superior de la rótula.",
      forearm1:
        "Coloque la cinta métrica alrededor del antebrazo, en el punto medio entre el codo y la muñeca.",
      leg1: "Coloque la cinta métrica alrededor de la pierna, en el punto medio entre la rodilla y el tobillo.",
    };
    setFocusedField(fieldName);
    setFocusedMessage(measurementInstructions[fieldName]);
  };
  const handleBlur = () => {
    setFocusedField(null);
    setFocusedMessage(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <div className="input-title">
          <label htmlFor="weight1">Peso (kg)</label>
        </div>

        <input
          type="number"
          name="weight1"
          value={formData.weight1}
          onChange={onInputChange}
          step="0.1"
          required
        />
        <input
          type="number"
          name="weight2"
          value={formData.weight2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="weight3"
          value={formData.weight3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{weightAvg} %</span>
      </div>
      <div className="input-group">
        <div className="input-title">
          <label htmlFor="height1">Talla (cm)</label>
        </div>
        <input
          type="number"
          name="height1"
          value={formData.height1}
          onChange={onInputChange}
          step="0.1"
          required
        />

        <input
          type="number"
          name="height2"
          value={formData.height2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="height3"
          value={formData.height3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{heightAvg} %</span>
      </div>
      <div className="input-group">
        <div className="input-title">
          <label htmlFor="iliacCrest1">Pliegue Cresta ilíaca (mm)</label>
        </div>
        <input
          type="number"
          name="iliacCrest1"
          value={formData.iliacCrest1}
          onChange={onInputChange}
          step="0.1"
          required
          onFocus={() => handleFocus("iliacCrest1")}
          onBlur={handleBlur}
        />
        {focusedField === "iliacCrest1" && (
          <div className="instruction-message">{focusedMessage}</div>
        )}
        <input
          type="number"
          name="iliacCrest2"
          value={formData.iliacCrest2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="iliacCrest3"
          value={formData.iliacCrest3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{iliacCrestAvg} %</span>
      </div>

      <div className="input-group">
        <div className="input-title">
          <label htmlFor="supraSpinal1">Pliegue Supraespinal (mm)</label>
        </div>
        <input
          type="number"
          name="supraSpinal1"
          value={formData.supraSpinal1}
          onChange={onInputChange}
          step="0.1"
          required
          onFocus={() => handleFocus("supraSpinal1")}
          onBlur={handleBlur}
        />
        {focusedField === "supraSpinal1" && (
          <div className="instruction-message">{focusedMessage}</div>
        )}
        <input
          type="number"
          name="supraSpinal2"
          value={formData.supraSpinal2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="supraSpinal3"
          value={formData.supraSpinal3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{supraSpinalAvg} %</span>
      </div>

      <div className="input-group">
        <div className="input-title">
          <label htmlFor="abdominal1">Pliegue Abdominal (mm)</label>
        </div>
        <input
          type="number"
          name="abdominal1"
          value={formData.abdominal1}
          onChange={onInputChange}
          step="0.1"
          required
          onFocus={() => handleFocus("abdominal1")}
          onBlur={handleBlur}
        />
        {focusedField === "abdominal1" && (
          <div className="instruction-message">{focusedMessage}</div>
        )}
        <input
          type="number"
          name="abdominal2"
          value={formData.abdominal2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="abdominal3"
          value={formData.abdominal3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{abdominalAvg} %</span>
      </div>
      <div className="input-group">
        <div className="input-title">
          <label htmlFor="thigh1">Perímetro corregido muslo (cm)</label>
        </div>
        <input
          type="number"
          name="thigh1"
          value={formData.thigh1}
          onChange={onInputChange}
          step="0.1"
          required
          onFocus={() => handleFocus("thigh1")}
          onBlur={handleBlur}
        />
        {focusedField === "thigh1" && (
          <div className="instruction-message">{focusedMessage}</div>
        )}
        <input
          type="number"
          name="thigh2"
          value={formData.thigh2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="thigh3"
          value={formData.thigh3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{thighAvg} %</span>
      </div>
      <div className="input-group">
        <div className="input-title">
          <label htmlFor="forearm1">Perímetro corregido antebrazo (cm)</label>
        </div>
        <input
          type="number"
          name="forearm1"
          value={formData.forearm1}
          onChange={onInputChange}
          step="0.1"
          required
          onFocus={() => handleFocus("forearm1")}
          onBlur={handleBlur}
        />
        {focusedField === "forearm1" && (
          <div className="instruction-message">{focusedMessage}</div>
        )}
        <input
          type="number"
          name="forearm2"
          value={formData.forearm2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="forearm3"
          value={formData.forearm3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{forearmAvg} %</span>
      </div>
      <div className="input-group">
        <div className="input-title">
          <label htmlFor="leg1">Perímetro corregido pierna (cm)</label>
        </div>
        <input
          type="number"
          name="leg1"
          value={formData.leg1}
          onChange={onInputChange}
          step="0.1"
          required
          onFocus={() => handleFocus("leg1")}
          onBlur={handleBlur}
        />
        {focusedField === "leg1" && (
          <div className="instruction-message">{focusedMessage}</div>
        )}
        <input
          type="number"
          name="leg2"
          value={formData.leg2}
          onChange={onInputChange}
          step="0.1"
        />
        <input
          type="number"
          name="leg3"
          value={formData.leg3}
          onChange={onInputChange}
          step="0.1"
        />
        <span className="result">{legAvg} %</span>
      </div>
      <div className="buttons">
        <div className="buttonsMicro">
          {voiceRecognitionActive ? (
            <button className="buttonMicro" onClick={stopVoiceRecognition}>
              <img
                src="/nomicro.png"
                alt="Mudo"
                width="15px"
                title="Detener reconocimiento de voz"
              />
            </button>
          ) : (
            <button className="buttonMicro" onClick={startVoiceRecognition}>
              <img
                src="/micro.png"
                alt="Micrófono"
                width="15px"
                title="Comenzar reconocimiento de voz: diga nombre de medida y valor numerico"
              />
            </button>
          )}
        </div>

        <button className="buttonSubmit" type="submit">
          Ver Informe
        </button>
      </div>
    </form>
  );
}

export default MeasurementForm;
