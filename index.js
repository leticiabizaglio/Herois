const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'jogadores',
    password: 'ds564',
    port: 7007,
});

// CRUD dos Jogadores

// Retorna todos os jogadores
app.get('/jogadores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jogadores');
        res.json({
            // total: result.rows,
            jogadores: result.rows
        })
    } catch (error) {
        console.log("Erro ao obter jogadores: " + error);
        res.sendStatus(500).send("Erro ao obter todos os jogadores");
    }
});

// Retorna um jogador pelo id
app.get('/jogadores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM jogadores WHERE id = $1', [id]);
        if (!result.rowCount === 0) {
            res.status(404).send({ message: "Jogador não encontrado" });
        } else {
            res.status(200).send({ message: "Jogador encontrado", jogadores: result.rows[0] });
        }
    } catch (error) {
        console.log("Erro ao obter jogador: " + error);
        res.sendStatus(500).send("Erro ao obter o jogador");
    }
});


// Rota para buscar um jogador pelo nome
app.get('/jogadores/nome/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const result = await pool.query('SELECT * FROM jogadores WHERE nome = $1', [nome]);
        if (!result.rowCount === 0) {
            res.status(404).send({ message: "Jogador não encontrado" });
        } else {
            res.status(200).send({ message: "Jogador encontrado", jogadores: result.rows[0] });
        }
    } catch (error) {
        console.log("Erro ao obter jogador: " + error);
        res.sendStatus(500).send("Erro ao obter o jogador");
    }
});


//Rota para adicionar um novo jogador
app.post('/jogadores', async (req, res) => {
    try {
        const {nome, idade, velocidade, habilidade, posicao, time} = req.body;

        await pool.query('INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, velocidade, habilidade, posicao, time]);
        res.sendStatus(201).send("Jogador criado com sucesso");

    } catch (error) {
        console.log("Erro ao criar jogador: " + error);
        res.sendStatus(500).send("Erro ao criar o jogador");
    }
});


// Rota para atualizar um jogador
app.put('/jogadores/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { nome, idade, velocidade, habilidade, posicao, time } = req.body;

        await pool.query('UPDATE jogadores SET nome = $1, idade = $2, velocidade = $3, habilidade = $4, posicao = $5, time = $6 WHERE id = $7', [nome, idade, velocidade, habilidade, posicao, time, id]);
        res.sendStatus(200).send("Jogador atualizado com sucesso");
    } catch (error) {
        console.log("Erro ao atualizar jogador: " + error);
        res.sendStatus(500).send("Erro ao atualizar o jogador");
    }
});


// Rota para deletar um jogador
app.delete('/jogadores/:id', async (req, res) => {
    try{
        const { id } = req.params;

        await pool.query('DELETE FROM jogadores WHERE id = $1', [id]);
        res.sendStatus(200).send("Jogador deletado com sucesso");
    } catch (error) {
        console.log("Erro ao deletar jogador: " + error);
        res.sendStatus(500).send("Erro ao deletar o jogador");
    }
});


// Rota de teste
app.get('/', (req, res) => {
    res.send({message: 'Servidor funcionando!'});
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
})