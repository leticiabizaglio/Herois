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
        let query;
        let params;

        if (nome) {
            query = 'SELECT * FROM jogadores WHERE nome = $1';
            params = [nome];
        } else {
            query = 'SELECT * FROM jogadores';
            params = [];
        }

        const { rows } = await pool.query(query, params); 

        res.json(rows); // Retorna os resultados como JSON
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
app.post('/batalha', async (req, res) => {
    try {
        const result1 = await pool.query('SELECT * FROM jogadores ');
        const result2 = await pool.query('');
        
        const jogador1 = result1.rows[0];
        const jogador2 = result2.rows[0];

        const velocidadeJogador1 = jogador1.time === 'Corinthians' ? jogador1.velocidade + 22 : jogador1.velocidade;
        const velocidadeJogador2 = jogador2.time === 'Corinthians' ? jogador2.velocidade + 22 : jogador2.velocidade;

        let vencedor;
        if (velocidadeJogador1 > velocidadeJogador2) {
            vencedor = jogador1;
        } else if (velocidadeJogador2 > velocidadeJogador1) {
            vencedor = jogador2;
        } else {
            vencedor = Math.random() < 0.5 ? jogador1 : jogador2;
        }

        await pool.query('INSERT INTO BATALHAS (jogador1_id, jogador2_id, vencedor_id, nome, idade, velocidade, habilidade, posicao, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [jogador1.id, jogador2.id, vencedor.nome, vencedor.idade, vencedor.velocidade, vencedor.habilidade, vencedor.posicao, vencedor.time]);
        res.status(200).send({ message: "Batalha realizada com sucesso", vencedor });

    } catch (error) {
        console.log("Erro ao realizar a batalha: " + error);
        res.status(500).send("Erro ao realizar a batalha");
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