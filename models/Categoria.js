const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = new Schema({
   nome:{
      type:String,
      requerid:true
   },
   slug:{
      type:String,
      requerid:true
   },
   data:{
      type: Date,
      default: Date.now()
      //o default é padrao se ninguem passar
   }
})
 mongoose.model("categorias", Categoria);