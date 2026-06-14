import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
