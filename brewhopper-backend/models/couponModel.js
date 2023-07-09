import mongoose from "mongoose";

const couponSchema = mongoose.Schema(
  {
    prize: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Achievement",
    },
    qrCode: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
