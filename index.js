const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

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
        res.status(500).send("Erro ao obter todos os jogadores");
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
        res.status(500).send("Erro ao obter o jogador");
    }
});


// Rota para buscar um jogador pelo nome
app.get('/jogadores', async (req, res) => {
    try {
        const { nome } = req.query;
        console.log("Nome do jogador:", nome);

        let query;
        let params;

        if (nome) {
            query = 'SELECT * FROM jogadores WHERE nome LIKE $1';
            params = [`%${nome}%`];
        } else {
            query = 'SELECT * FROM jogadores';
            params = [];
        }

        console.log("Query:", query);

        const result = await pool.query(query, params);

        console.log("Resultados:", result.rows);

        if (result.rows.length === 0) {
            res.status(404).send("Nenhum jogador encontrado");
        } else {
            res.json(result.rows);
        }
    } catch (error) {
        console.error("Erro ao buscar jogadores: " + error);
        res.status(500).send("Erro ao buscar jogadores");
    }
});



// app.get('/jogadores/nome/:nome', async (req, res) => {
//     const { nome } = req.params;
//     try {
//        const { rows } = await pool.query('SELECT * FROM jogadores WHERE nome = $1', [nome]);
//        res.json(rows);
//     } catch(error) {
//        console.log("Erro ao obter jogador pelo nome: " + error);
//        res.status(500).send("Erro ao obter o jogador pelo nome");
//     } 
//  });


app.get('/jogadores/nome/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const result = await pool.query('SELECT * FROM jogadores WHERE nome = $1', [nome]);

        if (!result.rowCount === 0) {
            res.status(404).send({ message: "Jogador não encontrado" });
        } else {
            res.status(200).send({
                message: "Jogador encontrado", jogadores: result.rows[0]
            });
        }

    } catch (error) {
        console.log("Erro ao obter jogador pelo nome: " + error);
        res.status(500).send("Erro ao obter o jogador pelo nome");
    }
});

// Rota para adicionar um novo jogador
app.post('/jogadores', async (req, res) => {
    try {
        const { nome, idade, velocidade, habilidade, posicao, time } = req.body;

        await pool.query('INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, velocidade, habilidade, posicao, time]);
        res.status(201).send({ message: "Jogador criado com sucesso" });
    } catch (error) {
        console.log("Erro ao criar jogador: " + error);
        res.status(500).send("Erro ao criar o jogador");
    }
});


// Rota para atualizar um jogador
app.put('/jogadores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, velocidade, habilidade, posicao, time } = req.body;

        await pool.query('UPDATE jogadores SET nome = $1, idade = $2, velocidade = $3, habilidade = $4, posicao = $5, time = $6 WHERE id = $7', [nome, idade, velocidade, habilidade, posicao, time, id]);
        res.status(201).send({ message: "Jogador atualizado com sucesso" });
    } catch (error) {
        console.log("Erro ao atualizar jogador: " + error);

        res.status(500).send("Erro ao atualizar o jogador");
    }
});

// Rota para deletar um jogador
app.delete('/jogadores/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM jogadores WHERE id = $1', [id]);
        res.status(200).send({ message: "Jogador deletado com sucesso" });
    } catch (error) {
        console.log("Erro ao deletar jogador: " + error);
        res.status(500).send("Erro ao deletar o jogador");
    }
});


// BATALHAS

// Rota para realizar uma batalha entre dois jogadores
app.get('/batalha/:jogador1_id/:jogador2_id', async (req, res) => {
    try {
        const { jogador1_id, jogador2_id } = req.params;

        const resultJogador1 = await pool.query('SELECT * FROM jogadores WHERE id = $1', [jogador1_id]);
        if (resultJogador1.rows.length === 0) {
            res.status(404).send("Jogador 1 não encontrado");
            return;
        }
        const jogador1 = resultJogador1.rows[0];

        const resultJogador2 = await pool.query('SELECT * FROM jogadores WHERE id = $1', [jogador2_id]);
        if (resultJogador2.rows.length === 0) {
            res.status(404).send("Jogador 2 não encontrado");
            return;
        }
        const jogador2 = resultJogador2.rows[0];

        const velocidadeJogador1 = jogador1.time === 'Corinthians' ? jogador1.velocidade + 22 : jogador1.velocidade;
        const velocidadeJogador2 = jogador2.time === 'Corinthians' ? jogador2.velocidade + 22 : jogador2.velocidade;

        let vencedor;
        if (velocidadeJogador1 > velocidadeJogador2) {
            vencedor = jogador1_id;
        } else if (velocidadeJogador2 > velocidadeJogador1) {
            vencedor = jogador2_id;
        } else {
            vencedor = Math.random() < 0.5 ? jogador1_id : jogador2_id;
        }

        await pool.query('INSERT INTO BATALHAS (jogador1_id, jogador2_id, vencedor_id) VALUES ($1, $2, $3)', [jogador1_id, jogador2_id, vencedor]);

        res.status(200).send({ message: "Batalha realizada com sucesso", vencedor });

    } catch (error) {
        console.log("Erro ao realizar a batalha: " + error);
        res.status(500).send("Erro ao realizar a batalha");
    }
});





// Rota para obter histórico de batalhas
app.get('/batalhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM batalhas');
        res.json(result.rows);
    } catch (error) {
        console.log("Erro ao obter batalhas: " + error);
        res.status(500).send("Erro ao obter batalhas");
    }
});


// Rota de teste
app.get('/', (req, res) => {
    res.send({ message: 'Servidor funcionando!' });
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});