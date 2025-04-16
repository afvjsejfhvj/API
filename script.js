const express = require('express') //importar modulo express do npm 

const app = express() // inicializa servidor express e salva na variavel app
const PORT = 8000 // separa uma porta para rodar o servidor
app.use(express.json()) // fala para o servidor que vai receber dados em json

const banco = [
    {
        id:1,
        titulo:'desenvolvimento de sistemas',
        curso: 'tecnico em desenvolvimento de sistemas',
        turma:'3b',
        professor:'Ramon'
    }
]

//criar minhas rotas
app.get('/aulas', (req, res)=>{ 
    res.status(200).send(banco) 
}) 
app.get('/aulas/:id', (req, res)=>{ 
    console.log(req.params.id)
    // fazer uma busca do array banco, pelo id recebido
    
})

app.post('/aulas', (req, res)=>{
    const dados = req.body
    dados['id'] = banco.length +1 
    banco.push(dados) //.push adiciona itens em um array ->  array = [dado vai aqui]
    res.status(201).send(dados)
}) 

app.listen(PORT, ()=>{console.log('servidor online')}) // ()=>{'executa isso'} isso é um callback, coloca o servidor para ouvir 

