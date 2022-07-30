const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Model de usuario
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

module.exports = function(passport){
   passport.use(new localStrategy(
      { usernameField: 'email' ,
   passwordField: 'senha',
      failureFlash:true},  ( email, senha , done) =>{
   
      Usuario.findOne( {email: email}).then((usuario) =>{
   if(!usuario){
      return done(null, false, {message: "Está conta não existe!"});
   }
   
   bcrypt.compare(senha , usuario.senha, (erro, batem) =>{
      if(batem){
   return done(null , usuario, {message: "Seja bem-vindo"});
      }else{
         return done(null , false, {message: "Senha incorreta"});
      }})
   })
   }));
   
passport.serializeUser((usuario, done) => {
   done(null, usuario._id);
});

passport.deserializeUser(function(id, done) {
   Usuario.findById(id, function(err, Usuario) {
       done(err, Usuario);
   })})
}


