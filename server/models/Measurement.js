import { Schema, model } from "mongoose";

const measurementSchema = new Schema(
  {
    weight: { type: Number },
    height: { type: Number },
    iliacCrest: { type: Number },
    supraSpinal: { type: Number },
    abdominal: { type: Number },
    thigh: { type: Number },
    forearm: { type: Number },
    leg: { type: Number },
  },
  { timestamps: true }
);

const Measurement = model("Measurement", measurementSchema);

export default Measurement;
