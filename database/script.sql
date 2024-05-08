CREATE DATABASE jogadores;

-- Tabela de herois
CREATE TABLE jogadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    idade INT NOT NULL,
    velocidade INT NOT NULL,
    habilidade VARCHAR(50) NOT NULL,
    posicao VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL
);

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Cássio', 35, 50, 'Goleiro', 'Goleiro', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Fagner', 33, 70, 'Drible', 'Lateral Direito', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Gil', 34, 60, 'Marcação', 'Zagueiro', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('João Victor', 22, 75, 'Recuperação', 'Zagueiro', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Fábio Santos', 36, 65, 'Passe', 'Lateral Esquerdo', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Gabriel', 29, 70, 'Desarme', 'Volante', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Cantillo', 29, 68, 'Visão de Jogo', 'Volante', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Luan', 28, 74, 'Finalização', 'Meia', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Gustavo Mosquito', 24, 82, 'Drible', 'Atacante', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Jô', 34, 68, 'Finalização', 'Atacante', 'Corinthians');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Weverton', 34, 55, 'Defesas', 'Goleiro', 'Palmeiras');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Gustavo Gómez', 28, 60, 'Desarme', 'Zagueiro', 'Palmeiras');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Rony', 26, 80, 'Drible', 'Atacante', 'Palmeiras');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Everton Ribeiro', 32, 70, 'Passe', 'Meia', 'Flamengo');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Giorgian De Arrascaeta', 27, 75, 'Visão de Jogo', 'Meia', 'Flamengo');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Marinho', 31, 78, 'Drible', 'Atacante', 'Santos');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Kaio Jorge', 20, 72, 'Finalização', 'Atacante', 'Santos');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Vanderlei', 38, 50, 'Defesas', 'Goleiro', 'Grêmio');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Diego Souza', 36, 65, 'Finalização', 'Atacante', 'Grêmio');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Jean Pyerre', 23, 68, 'Passe', 'Meia', 'Grêmio');

INSERT INTO jogadores (nome, idade, velocidade, habilidade, posicao, time) 
VALUES ('Rodrigo Garro', 25, 110, 'Drible', 'Atacante', 'Corinthians');




-- Tabela de batalhas
CREATE TABLE batalhas (
    id SERIAL PRIMARY KEY,
    jogador1_id INT REFERENCES jogadores(id),
    jogador2_id INT REFERENCES jogadores(id),
    vencedor_id INT REFERENCES jogadores(id),
    FOREIGN KEY (jogador1_id) REFERENCES jogadores(id),
    FOREIGN KEY (jogador2_id) REFERENCES jogadores(id),
    FOREIGN KEY (vencedor_id) REFERENCES jogadores(id)
);
