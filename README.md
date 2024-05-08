# Sistema de Gerenciamento de Jogadores e Batalhas

Este é um sistema desenvolvido em Node.js usando o framework Express e o PostgreSQL como banco de dados. Ele permite gerenciar jogadores de futebol e realizar batalhas entre eles.

## Requisitos

Certifique-se de ter o Node.js e o PostgreSQL instalados em seu sistema.

- Node.js: [Download](https://nodejs.org/)
- PostgreSQL: [Download](https://www.postgresql.org/download/)

## Configuração do Banco de Dados

1. Certifique-se de que o PostgreSQL esteja em execução.
2. Crie um banco de dados chamado `jogadores`.
3. Execute o script `database.sql` fornecido para criar a tabela `jogadores`.




## Endpoints
Jogadores
 - GET /jogadores: Retorna todos os jogadores cadastrados.
 -  GET /jogadores/:id: Retorna um jogador pelo ID.
 - GET /jogadores?nome=nomeDoJogador: Retorna um jogador pelo nome.
 - POST /jogadores: Adiciona um novo jogador.
 - PUT /jogadores/:id: Atualiza um jogador pelo ID.
 - DELETE /jogadores/:id: Deleta um jogador pelo ID.
 
Batalhas
 - GET /batalha: Realiza uma batalha entre dois jogadores.


## Contribuição
Sinta-se à vontade para contribuir com melhorias ou correções para este projeto. Basta fazer um fork e enviar uma pull request!