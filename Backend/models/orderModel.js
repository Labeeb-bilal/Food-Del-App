const mongoose = require('mongoose');
const { default: Stripe } = require('stripe');

const orderSchema  = new mongoose.Schema({
   userId : {
    type : String,
    required : true,
   },
   items : {
    type : Array,
    required : true,
   },
   amount :{
    type : Number,
    required : true,
   },
   status :{
      type : String,
      default : 'Food Preparing',
      required : true,
     },
   address : {
    type : Object,
    required : true,
   },
   date: {
      type: Date,
      default: Date.now, // ✅ Automatically adds current server date/time
      required: true,
    },    
   payment : {
    type : Boolean,
    default : false,
   }
},{autoIndex: false})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema);

module.exports = orderModel