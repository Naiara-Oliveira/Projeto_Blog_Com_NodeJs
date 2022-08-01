//carregando modulos
const express = require("express");
const { engine } = require ("express-handlebars");
const bodyParser = require("body-parser");
//fazendo a validação dos dados
const { body, validationResult } = require("express-validator");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const { use } = require("./routes/admin");
require("./models/Postagens");
const Postagem = mongoose.model("postagens");
require("./models/Categoria");
const Categoria = mongoose.model("categorias");
const usuarios = require("./routes/usuario") ;
const passport = require("passport");
 require("./config/auth")(passport);

//configurações
//Sessao
app.use(session ({
  secret:"cursonode",  
  resave:true,
  saveUninitialized:true,
  cookie:{
maxAge: 3*60*1000
  }}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Middleware
app.use( (req, res, next) =>{
res.locals.success_msg =  req.flash("success_msg");
res.locals.error_msg = req.flash("error_msg");
res.locals.error = req.flash("error");
res.locals.user = req.user || null;
next();
})
  //Body Parser
  app.use(bodyParser.urlencoded ({extended: false}));
  app.use(bodyParser.json());

// Handlebars
app.engine("handlebars", engine ( {
  defaultLayout: "main" ,
  runtimeOptions: {
           allowProtoPropertiesByDefault: true,
           allowProtoMethodsByDefault: true,
         },
         } ))
 app.set("view engine" , 'handlebars')

//Configuranfo o  Mongoose 
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp").then(() => {
  console.log("Conectado ao MongoDb")
}).catch((err) =>{
  console.log("Houve um erro ao conectar com o MongoDb" +  err);
})

//Public 
//pra ele pegar o caminho absolute para a pasta public 
  app.use(express.static(path.join(__dirname, "public")));


//Rotas
app.get("/", (req, res) =>{
  Postagem.find().populate("categoria").sort({ data: "desc"}).then((postagens)=>{
    res.render("index" , {postagens:postagens});
  }).catch((err) =>{
    req.flash("error_msg", "Houve um erro interno");
    res.redirect("/404");
  })
});
app.get("/postagens/:slug" , (req, res) =>{
Postagem.findOne({ slug: req.params.slug}).then((postagem) =>{
  if(postagem){
res.render("postagens/index",{postagem:postagem} );
  }else{
req.flash("error_msg" , "Está postagem não existe");
res.redirect("/");
  }
}).catch((err) =>{
req.flash("error_msg", "Houve um erro interno");
res.redirect("/");
})
});
app.get("/categorias" ,(req, res) => {

Categoria.find().then((categorias) =>{
res.render("categorias/index" , {categorias:categorias});
}).catch((err) =>{
req.flash("error_msg", "Houve um erro ao listar as categorias ");
res.redirect("/")
})
});
app.get("/categorias/:slug", (req, res)=>{
  Categoria.findOne({slug: req.params.slug}).then((categoria) =>{
if(categoria){
  Postagem.find({categoria: categoria._id}).then((postagens) =>{
res.render("categorias/postagens", {postagens:postagens, categoria:categoria})
  }).catch((err) =>{
    req.flash("error_msg", "Houve um erro ao listar os posts! ");
    res.redirect("/");
  })
}else{
  req.flash("error_msg", "Está categoria não existe");
  res.redirect("/");
}
  }).catch((err) =>{
    req.flash("error_msg" , "Houve um erro ao carregar a página desta categoria");
    res.redirect("/");
  })
})
app.get("/404", (req, res)=>{
  res.send("/404");
})
app.use("/admin", admin);
//
app.use("/usuarios", usuarios);

//Outros
const PORT  = process.env.PORT || 8081;
app.listen(PORT, ()=>{
   console.log("Servidor rodando");
})