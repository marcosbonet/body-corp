import React from "react";
import "../styles.css";

function MeasurementForm({
  formData,
  onInputChange,
  onSubmit,
  weightAvg,
  heightAvg,
  iliacCrestAvg,
  supraSpinalAvg,
  abdominalAvg,
  thighAvg,
  forearmAvg,
  legAvg,
}) {
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
          <label htmlFor="height1">Size (cm)</label>
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
          <label htmlFor="iliacCrest1">Iliac Crest (mm)</label>
        </div>
        <input
          type="number"
          name="iliacCrest1"
          value={formData.iliacCrest1}
          onChange={onInputChange}
          step="0.1"
          required
        />
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
          <label htmlFor="supraSpinal1">Supraespinal (mm)</label>
        </div>
        <input
          type="number"
          name="supraSpinal1"
          value={formData.supraSpinal1}
          onChange={onInputChange}
          step="0.1"
          required
        />
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
          <label htmlFor="abdominal1">Abdominal (mm)</label>
        </div>
        <input
          type="number"
          name="abdominal1"
          value={formData.abdominal1}
          onChange={onInputChange}
          step="0.1"
          required
        />
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
          <label htmlFor="thigh1">Thigh (cm)</label>
        </div>
        <input
          type="number"
          name="thigh1"
          value={formData.thigh1}
          onChange={onInputChange}
          step="0.1"
          required
        />
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
          <label htmlFor="forearm1">Forearm (cm)</label>
        </div>
        <input
          type="number"
          name="forearm1"
          value={formData.forearm1}
          onChange={onInputChange}
          step="0.1"
          required
        />
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
          <label htmlFor="leg1">Leg (cm)</label>
        </div>
        <input
          type="number"
          name="leg1"
          value={formData.leg1}
          onChange={onInputChange}
          step="0.1"
          required
        />
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

      <button type="submit">Ver Informe</button>
    </form>
  );
}
export default MeasurementForm;
