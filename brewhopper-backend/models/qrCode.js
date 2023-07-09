import mongoose from "mongoose";

const qrCodeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prize: {
      type: String,
      required: true,
    },
    achivementBreweries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brewery",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QRCode = mongoose.model("QRCode", qrCodeSchema);
export default QRCode;
