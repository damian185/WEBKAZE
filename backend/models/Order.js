const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      color: String,
      size: String,
    }
  ],
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Đã nhận hàng', 'Hoàn thành', 'Đã huỷ'],
    default: 'Chờ xác nhận'
  },
  cancelReason: { type: String, default: '' },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
