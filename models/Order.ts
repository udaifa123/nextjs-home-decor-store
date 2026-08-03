import mongoose, { Schema } from "mongoose";


const OrderSchema = new Schema(
{
  userId: String,  
  name: String,
  address: String,
  phone: String,
    

    items: [
      {
        _id: String,
        title: String,
        price: Number,
        image: String,
        qty: Number,
      }
    ],

    total: {
      type: Number,
      required: true,
    },

    date: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
mongoose.model("Order", OrderSchema);