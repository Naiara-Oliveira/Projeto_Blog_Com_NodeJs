const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Model de usuario
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

module.exports = function(passport){
passport.use(new localStrategy({usernameField: "email"}, (email, senha ,done) =>{
   Usuario.findOne( {email: email}).then((usuarios) =>{
if(!usuarios){
   return done(null, false, {message: "Está conta não existe!"});
}
bcrypt.compare(senha, usuarios.senha, (erro, batem) =>{
   if(batem){
return done(null, user);
   }else{
      return done(null, false, {message: "Senha incorreta"});
   }
})
   })
}))

passport.serializeUser((usuario, done) =>{
   done(null, usuario.id);
})
passport.deserializeUser((id, done)=>{
User.findById((id, (err, usuario) =>{
done(err, user);
}))
})
}
