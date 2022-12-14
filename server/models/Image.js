import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    originFileName: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Image = mongoose.model('image', ImageSchema);

export {
  Image
}