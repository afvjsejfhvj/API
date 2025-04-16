const express = require('express') //importar modulo express do npm 

const app = express() // inicializa servidor express e salva na variavel app
const PORT = 8000 // separa uma porta para rodar o servidor

const banco = []
//criar minhas rotas
app.get('/aula', (req, res)=>(res.send('aula de desenvolvimento de sistemas ')))
app.post('/aulas', (req, res)=>(res.send('criando uma aula ')) )

app.listen(PORT, ()=>(console.log('servidor online'))) // ()=>('executa isso') isso é um callback, coloca o servidor para ouvir 

