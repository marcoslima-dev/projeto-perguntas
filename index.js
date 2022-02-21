const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//Database
connection
    .authenticate()
    .then(() => {
        console.log('Banco de dados conectado')
    })
    .catch((msgErro) => {
        console.log('Mensagem de erro')
    })



//Estou dizendo para o express usar o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Body Parser


//Rotas
    app.get("/",(req,res)=>{
    Pergunta.findAll({
        raw: true,
        order: [
            ['id','DESC']
        ]
    }).then(perguntas =>{
        res.render("index",{
            perguntas:perguntas,
        }) 
    })
    
    
    //.render - renderiza um html do EJS
})

app.get("/perguntar", (req,res)=>{
    res.render("perguntar",{
        
    })
})

app.post("/salvarpergunta", (req,res) => { //método POST - os dados são recebidos direto pela requisição(ótimo para proteger dados de formulários)
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao: descricao,
    }).then(()=>{
        res.redirect("/")
    })
});

app.get("/pergunta/:id", (req,res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta => {
        if(pergunta != undefined) {


            Resposta.findAll({
                where:{perguntaId:pergunta.id},
               order:[['id','DESC']] 
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                });
            })
        }else {
            res.redirect("/")
        }
    });
});

app.post("/responder", (req,res)=> {
    let corpo = req.body.corpo;
    let perguntaId= req.body.pergunta;
    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId,
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    });

})

app.listen(4000,()=>{ //.listen - cria meu servidor express
    console.log('App rodando')
})
