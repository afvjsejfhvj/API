const { log } = require('console')
const express = require('express') //importar modulo express do npm 
const fs = require('fs')
const app = express() // inicializa servidor express e salva na variavel app
const PORT = 8000 // separa uma porta para rodar o servidor
app.use(express.json()) // fala para o servidor que vai receber dados em json

//criar minhas rotas
app.get('/aulas', (req, res)=>{
    fs.readFile('./bancodedados.json', 'utf-8', (err, data)=> {
        if(err){
            res.status(500).json({msg:"erro no servidor"})
        }
        const dados = JSON.parse(data)
        res.status(200).send(dados)

    }) 
}) 

app.get('/aulas/:id', (req, res)=>{ //procurar usuario pelo id
    const id = req.params.id //pegando o id da url
    fs.readFile('./bancodedados.json', 'utf-8', (err, data)=> { //abrindo o aquivo banco de dados e lendo ele no formato utf-8
        if(err){ //testa se houve erro
            res.status(500).json({msg:"erro no servidor"})
        } //em caso de erro, DEVOLVA CODIGO 500 para o usuario
        const aulas = JSON.parse(data) // converte o arquivo texto -> json
        const aula = aulas.find(aulas.id == id) // procura na array de usuario e compara o seu id com o id procurado
        if(aula){ // se achar o usuario
            res.status(200).json(aula) //retorna msg de sucesso
        }
        res.status(404).json({msg:"Usuario nao encontardo"}) // nao achou e deu erro 404
    }) 
})

app.post('/aulas', (req, res)=>{
    const dados = req.body
    fs.readFile('bancodedados.json', 'utf-8', (err, data)=> {
        if(err){
           res.status(500).json({msg:"erro no servidor"})
       }
        const aulas = JSON.parse(data) //converte texto para json
        //cria id 
        dados['id'] = aulas.length +1
        //adicionar nova aula no array aulas 
        aulas.push(dados)
        fs.writeFile('bancodedados.json', JSON.stringify(aulas), (err)=>{
            if(err){
                res.status(500).json({msg:"Erro no servidor"})
            }
            res.status(201).json(dados)
        })
    })

})


app.put('/aulas/:id', (req, res) =>{
    //pegar id da rota
    const id = req.params.id
    // procurar o id do array
    fs.readFile('bancodedados.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).json({msg:"erro do servidor"})
        }
        const aulas = JSON.parse(data)
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if(aulaIndex !== -1){
            const dados = req.body;
            for(key in dados){
                aulas[aulaIndex][key] = dados[key]
            }
            fs.writeFile('bancodedados.json', JSON.stringify(aulas), (err) => 
            {
                if(err){
                    res.status(500).json({msg:" erro do servidor"})
                }
                res.status(201).json(dados)
            })
        }else{
            res.status(404).json({msg:'Aula nao encontrada'})
        }
    })
})
   
app.delete('/aulas/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('bancodedados.json', 'utf-8', (err, data) => {
        if(err){
            res.status(500).json({msg:"erro do servidor"})
        }
        const aulas = JSON.parse(data)
        const aulaIndex = aulas.findIndex(aula => aula.id == id);
        if(aulaIndex !== -1){
            aulas.splice(aulaIndex, 1)
            fs.writeFile( 'bancoDeDados. json', JSON. stringify(aulas), (err) => {
            if (err) {
                res.status(500).json({ msg: 'Erro no servidor' })
            }
                res.status (204).send()
        })
    } else {
        res.status(404).json({msg: "Not Found"})
        }
    })
})

app.listen(PORT, ()=>{console.log('servidor online')}) // ()=>{'executa isso'} isso é um callback, coloca o servidor para ouvir 
