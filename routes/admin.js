const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
 require("../models/Categoria");
const Categoria = mongoose.model("categorias");
require("../models/Postagens");
const Postagem = mongoose.model("postagens");
const { eAdmin }= require("../helpers/eAdmin");


router.get('/',  eAdmin, (req, res) =>{
res.render("admin/index");
});
router.get("/posts", eAdmin, (req, res) =>{
   res.send("Página de pots");
});
router.get("/categorias", eAdmin, (req, res) =>{
   Categoria.find().sort({data: "desc" }).then((categorias) =>{
      res.render("admin/categorias" , {categorias: categorias});
   }).catch((err) =>{
      req.flash("error_msg" , "Houve um erro ao listar Categorias ");
      res.render("/admin");
   })
})
router.get("/categorias/add", eAdmin ,(req, res) =>{
   res.render("admin/addcategorias")
})
router.post("/categorias/nova",eAdmin, (req, res) =>{
//validacao de formulario

var erros = [  ];
if( !req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
erros.push( {texto: "Nome Inválido" })
}
if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug ==null ){
   erros.push({texto:  "Slug inválido" })
}
if(req.body.nome.length < 2){
erros.push({ texto: "Nome de categoria muito pequeno"});
}
if(erros.length > 0){
   res.render("admin/addcategorias" , { erros: erros})
}
else{
   const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
   }
   new Categoria(novaCategoria).save().then( () =>{
      req.flash("success_msg", "Categoria cadastrada com sucesso! ")
     res.redirect("/admin/categorias");
   }).catch((err) =>{
      req.flash("error_msg", "Houve um erro ao salvar a categoria tente novamente");
     res.redirect("/admin");
   });
}});
router.get("/categorias/edit/:id", eAdmin , (req, res) =>{
   Categoria.findOne( { _id: req.params.id}).then((categoria) =>{
res.render("admin/editecategorias" , { categoria: categoria})
   }).catch((err) =>{
req.flash("error_msg", "Está categoria não existe");
res.redirect("/admin/categorias")
   })
});

router.post("/categorias/edit" , eAdmin ,(req, res)=>{
   //Validacao dos dados
   var erros = [  ];
   if( !req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
   erros.push( {texto: "Nome Inválido" })
   }
   if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug ==null ){
      erros.push({texto:  "Slug inválido" })
   }
   if(req.body.nome.length < 2){
   erros.push({ texto: "Nome de categoria muito pequeno"});
   }
   if(erros.length > 0){
      res.render("admin/addcategorias" , { erros: erros})
   }
   else{
   Categoria.findOne( { _id: req.body.id}).then((novaCategoria) =>{
novaCategoria.nome = req.body.nome,
novaCategoria.slug = req.body.slug
novaCategoria.save().then(() =>{
   req.flash("success_msg" , "Categoria editada com sucesso");
   res.redirect("/admin/categorias");
}).catch((err) =>{
   req.flash("error_msg" , "Houve um erro interno ao salvar a edição de categoria");
   res.redirect("/admin/categorias");
})
   }).catch((err) =>{
      req.flash("error_msg", "Houve um erro ao editar categoria");
   res.redirect("/admin/categorias");
   })}
})

router.post("/categorias/deletar", eAdmin , (req, res) =>{
   Categoria.remove( {_id: req.body.id}).then(() =>{
      req.flash("success_msg", "Categoria deletada com sucesso! ");
      res.redirect("/admin/categorias");
   }).catch((err) =>{
      req.flash("error_msg", "Houve um erro ao deletar categoria");
      res.redirect("/admin/categorias");
   });
});

router.get("/postagens" , eAdmin,  (req, res) =>{
   Postagem.find().populate("categoria").sort({data: "desc" }).then((postagens) => {
      res.render("admin/postagens" , {postagens:postagens});
   }).catch((err) =>{
      req.flash("error_msg" , "Houve um erro ao listar as postagens " );
      res.redirect("/admin");
   })
});
router.get("/postagens/add", eAdmin, (req, res) =>{
   Categoria.find().then((categorias) =>{
      res.render("admin/addpostagem" , {categorias: categorias});
   }).catch((err) =>{
req.flash("error_msg" , "Houve um erro ao carregar o formulario")
res.redirect("/admin/") ;
  })
})
router.post("/postagens/nova", eAdmin , (req, res) =>{

   var erros = [  ];
   if(req.body.categoria == "0"){
      erros.push( {texto: "Categoria inválida, registre uma categoria "});
   }
   if( !req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
      erros.push( {texto: "Postagem Inválida" })
      }
      if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug ==null ){
         erros.push({texto:  "Slug inválido" })
      }
      if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao ==null ){
         erros.push({texto:  "Descrição inválida" })
      }
      if(req.body.titulo.length < 2){
         erros.push({ texto: "Titulo  de postagens muito pequeno"});
      } 
      if( req.body.slug.length < 2){
      erros.push({ texto: "Slug de postagens muito pequeno"});
      }
      if(req.body.descricao.length < 2){
         erros.push({ texto: "Descricão de postagens muito pequena"});
      }
   if(erros.length > 0){
res.render("admin/addpostagem" , {erros: erros});
   }
   else{
const novaPostagem = {
   titulo: req.body.titulo,
   descricao: req.body.descricao,
   slug: req.body.slug,
   conteudo: req.body.conteudo,
    categoria: req.body.categoria
}
new Postagem(novaPostagem).save().then(() =>{
   req.flash("success_msg" , "Postagem criada com sucesso! ");
   res.redirect("/admin/postagens");
}).catch((err) =>{
   req.flash("error_msg" , "Houve um erro durante o salvamento da postagem ");
   res.redirect("/admin/postagens");
})}
})

router.get("/postagens/edit/:id" , eAdmin,  (req, res) =>{

   Postagem.findOne( {_id: req.params.id}).then((postagens)=>{
Categoria.find().then((categorias) =>{
   res.render("admin/editepostagens" , {categorias: categorias, postagens:postagens});
}).catch((err) =>{
   req.flash("error_msg", "Houve um erro ao listar categorias");
   res.redirect("/admin/postagens");
})
   }).catch((err) =>{
req.flash("error_msg" , "Houve um erro ao carregar o formulário de edição  ");
res.redirect("/admin/postagens");   
})
});
router.post("/postagens/edit", eAdmin , (req, res) =>{
   //Validacao dos dados
  
   var erros = [  ];
   if(req.body.categoria == "0"){
      erros.push( {texto: "Categoria inválida, registre uma categoria "});
   }
   if( !req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
      erros.push( {texto: "Postagem Inválida" })
      }
      if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug ==null ){
         erros.push({texto:  "Slug inválido" })
      }
      if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao ==null ){
         erros.push({texto:  "Descrição inválida" })
      }
      if(req.body.titulo.length < 2){
         erros.push({ texto: "Titulo  de postagens muito pequeno"});
      } 
      if( req.body.slug.length < 2){
      erros.push({ texto: "Slug de postagens muito pequeno"});
      }
      if(req.body.descricao.length < 2){
         erros.push({ texto: "Descricão de postagens muito pequena"});
      }
   if(erros.length > 0){
res.render("admin/postagens" , {erros: erros});
   }
   else{
   Postagem.findOne({_id: req.body.id}).then((postagens) =>{
    postagens.titulo = req.body.titulo
    postagens.slug = req.body.slug
    postagens.descricao = req.body.descricao
    postagens.conteudo = req.body.conteudo
    postagens.categoria = req.body.categoria
    postagens.save().then(() =>{
      req.flash("success_msg", "Editada com sucesso!");
   res.redirect("/admin/postagens");
    }).catch((err ) =>{
      console.log(err);
   res.redirect("/admin/postagens");
    })
   }).catch((err) =>{
      req.flash("erro_msg" , "Houve um erro ao salvar a edição");
      res.redirect("/admin/postagens");
   })
   }});
   router.get("/postagens/deletar/:id", eAdmin,  (req, res)=>{
      Postagem.remove({_id: req.params.id}).then(() =>{
         req.flash("success_msg", "Postagem deletada com sucesso");
        res.redirect("/admin/postagens");
      }).catch((err) =>{
req.flash("error_msg", "Houve um erro interno");
res.redirect("/admin/postagens");
      })
   })

module.exports = router;