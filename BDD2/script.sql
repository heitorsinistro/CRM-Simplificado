CREATE DATABASE IF NOT EXISTS crm_2tes;
USE crm_2tes;

DROP TABLE IF EXISTS log_acesso;
DROP TABLE IF EXISTS interacoes;
DROP TABLE IF EXISTS oportunidades;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    cargo ENUM('admin','vendedor') DEFAULT 'vendedor',
    bloqueado BOOLEAN DEFAULT FALSE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    empresa VARCHAR(120),
    email VARCHAR(120),
    telefone VARCHAR(20),
    categoria ENUM('Lead Frio','Lead Morno','Lead Quente','Cliente','Ex-cliente') DEFAULT 'Lead Frio',
    anotacoes TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    criado_por VARCHAR(50),
    FOREIGN KEY (criado_por) REFERENCES usuarios(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE oportunidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    valor DECIMAL(12,2),
    etapa ENUM('Contato','Proposta','Negociação','Fechado') DEFAULT 'Contato',
    anotacoes TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    cliente_id INT NOT NULL,
    criado_por VARCHAR(50),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (criado_por) REFERENCES usuarios(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE interacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Ligação','Reunião','WhatsApp','E-mail','Anotação','Outro') NOT NULL,
    descricao TEXT NOT NULL,
    proxima_acao TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    cliente_id INT NOT NULL,
    oportunidade_id INT NULL,
    usuario_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE CASCADE,
    FOREIGN KEY (oportunidade_id) REFERENCES oportunidades(id)
        ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE log_acesso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id VARCHAR(50),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    descricao VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

-- 02_inserts.sql

INSERT INTO usuarios (id, nome, email, cargo, bloqueado, criado_em) VALUES
('u1','Ana Pereira','ana.pereira@2tes.com','admin', FALSE,'2024-02-01 09:10:00'),
('u2','Bruno Lima','bruno.lima@2tes.com','vendedor', FALSE,'2024-03-05 10:20:00'),
('u3','Carla Souza','carla.souza@2tes.com','vendedor', FALSE,'2024-04-10 11:45:00'),
('u4','Diego Alves','diego.alves@2tes.com','vendedor', FALSE,'2024-05-12 12:00:00'),
('u5','Elisa Ramos','elisa.ramos@2tes.com','vendedor', FALSE,'2024-06-15 09:30:00'),
('u6','Felipe Costa','felipe.costa@2tes.com','vendedor', FALSE,'2024-07-20 14:50:00'),
('u7','Gabriela Rocha','gabriela.rocha@2tes.com','vendedor', FALSE,'2024-08-22 16:10:00'),
('u8','Hugo Martins','hugo.martins@2tes.com','vendedor', TRUE,'2024-09-01 08:00:00');

INSERT INTO clientes (nome, empresa, email, telefone, categoria, anotacoes, criado_em, criado_por) VALUES
('Acme Comércio','Acme Comércio Ltda','contato@acme.com','(11)99999-0001','Lead Quente','Contato via feira - interesse em solução.', '2024-01-15 10:00:00','u2'),
('Beta Serviços','Beta Serviços SA','contato@beta.com','(11)99999-0002','Cliente','Contrato renovado em 2025-03-01','2024-02-20 09:30:00','u3'),
('Certa Indústria','Certa Indústria Ltda','vendas@certa.com','(21)99999-0003','Lead Morno','Aguardar retorno do financeiro.','2024-03-10 11:15:00','u4'),
('Delta Tech','Delta Tech S/A','parcerias@delta.com','(21)99999-0004','Lead Quente','Demo marcada para 2024-12-05.','2024-03-15 10:10:00','u2'),
('Epsilon LTDA','Epsilon LTDA','comercial@epsilon.com','(31)99999-0005','Lead Frio','Encontrado no LinkedIn.','2024-04-01 08:40:00','u5'),
('Fenix Solutions','Fenix Solutions','contato@fenix.com','(31)99999-0006','Cliente','Contrato vigente até 2026.','2024-04-22 12:00:00','u3'),
('Gamma Distribuição','Gamma Distribuição','vendas@gamma.com','(41)99999-0007','Lead Morno','Pedir orçamento.','2024-05-03 13:20:00','u6'),
('Hidra Agro','Hidra Agro','contato@hidra.com','(41)99999-0008','Lead Quente','Interesse em integração.','2024-05-15 09:45:00','u2'),
('Icarus Media','Icarus Media','hello@icarus.com','(51)99999-0009','Cliente','Cliente desde 2023.','2024-06-01 10:30:00','u4'),
('Jupiter Logistics','Jupiter Logistics','ops@jupiter.com','(51)99999-0010','Lead Frio','Sem urgência.','2024-06-12 11:00:00','u5'),
('Kappa Health','Kappa Health','contato@kappa.com','(61)99999-0011','Lead Morno','Agendar reunião técnica.','2024-06-20 15:20:00','u6'),
('Lambda Retail','Lambda Retail','vendas@lambda.com','(61)99999-0012','Lead Quente','Pedido piloto solicitado.','2024-07-02 09:10:00','u3'),
('Mu Energy','Mu Energy','comercial@mu.com','(71)99999-0013','Lead Frio','Cliente em potencial.', '2024-07-15 14:40:00','u7'),
('Nu Finance','Nu Finance','contato@nufin.com','(71)99999-0014','Cliente','Contrato anual.','2024-07-30 10:05:00','u2'),
('Omicron Foods','Omicron Foods','compras@omicron.com','(81)99999-0015','Lead Morno','Esperando proposta.', '2024-08-01 11:33:00','u4'),
('Pi Construtora','Pi Construtora','suporte@pi.com','(81)99999-0016','Lead Quente','Visita técnica agendada.', '2024-08-10 09:00:00','u5'),
('Rho Telecom','Rho Telecom','vendas@rho.com','(91)99999-0017','Lead Frio','Registrar para contato futuro.', '2024-08-25 16:20:00','u6'),
('Sigma Auto','Sigma Auto','contato@sigma.com','(11)99999-0018','Cliente','Grande potencial de upsell.', '2024-09-05 10:15:00','u3'),
('Tau Eventos','Tau Eventos','eventos@tau.com','(21)99999-0019','Lead Morno','Feira local em 2025.', '2024-09-15 13:00:00','u7'),
('Upsilon Labs','Upsilon Labs','info@upsilon.com','(21)99999-0020','Lead Quente','Solicitou proposta detalhada.', '2024-10-01 09:30:00','u2'),
('Vega Fashion','Vega Fashion','contato@vega.com','(31)99999-0021','Cliente','Reuniões mensais.', '2024-10-10 11:20:00','u4'),
('Weta Transportes','Weta Transportes','log@weta.com','(31)99999-0022','Lead Frio','Sem interesse no momento.', '2024-10-20 12:40:00','u5'),
('Xeno Labs','Xeno Labs','contato@xeno.com','(41)99999-0023','Lead Quente','Prova de conceito iniciada.', '2024-11-01 10:00:00','u6'),
('Ypsilon Media','Ypsilon Media','hello@ypsilon.com','(41)99999-0024','Lead Morno','Negociação em andamento.', '2024-11-12 09:50:00','u2'),
('Zeta Serviços','Zeta Serviços','contato@zeta.com','(51)99999-0025','Lead Quente','Promessa de assinatura próximo mês.', '2024-11-20 14:30:00','u3'),
('Alpha Agro','Alpha Agro','comercial@alphaagro.com','(61)99999-0026','Cliente','Bom histórico de pagamentos.', '2024-11-25 08:20:00','u7'),
('Beta2 Tech','Beta2 Tech','contato@beta2.com','(71)99999-0027','Lead Morno','Aguardando análise.', '2024-11-28 15:15:00','u5'),
('Gamma2 Distrib','Gamma2 Distrib','vendas@gamma2.com','(81)99999-0028','Lead Frio','Registrar follow-up em 6 meses.', '2024-11-30 10:00:00','u6'),
('Delta2 Systems','Delta2 Systems','info@delta2.com','(91)99999-0029','Lead Quente','Piloto aprovado, negociar contrato.', '2024-12-02 09:00:00','u2');

INSERT INTO oportunidades (nome, valor, etapa, anotacoes, criado_em, cliente_id, criado_por) VALUES
('Projeto Acme - Automação', 12000.00, 'Proposta', 'Proposta enviada, atento a tweaks.', '2024-02-10 10:10:00', 1, 'u2'),
('Manutenção Beta', 5000.00, 'Contato', 'Necessidade de SLA.', '2024-02-25 09:00:00', 2, 'u3'),
('Upgrade Certa', 8000.00, 'Negociação', 'Condições de pagamento em análise.', '2024-03-20 11:00:00', 3, 'u4'),
('Piloto Delta', 3000.00, 'Contato', 'Piloto para 3 meses.', '2024-03-25 15:20:00', 4, 'u2'),
('Contrato Epsilon', 15000.00, 'Fechado', 'Assinado 2025-03-01.', '2024-04-05 10:00:00', 5, 'u5'),
('Solução Fenix', 22000.00, 'Proposta', 'Espera aprovação da diretoria.', '2024-04-30 12:00:00', 6, 'u3'),
('Distribuição Gamma', 7000.00, 'Contato', 'Mapear necessidades.', '2024-05-10 09:00:00', 7, 'u6'),
('Integração Hidra', 11000.00, 'Proposta', 'Reunião técnica concluída.', '2024-05-20 10:40:00', 8, 'u2'),
('Renovação Icarus', 6000.00, 'Fechado', 'Renovado automaticamente.', '2024-06-05 08:20:00', 9, 'u4'),
('Transporte Jupiter', 2500.00, 'Contato', 'Aguardar cotação.', '2024-06-15 11:50:00', 10, 'u5'),
('Saúde Kappa', 9000.00, 'Proposta', 'Pedido de ajuste técnico.', '2024-06-22 14:00:00', 11, 'u6'),
('Retail Lambda', 16000.00, 'Negociação', 'Stakeholders reunidos.', '2024-07-10 09:30:00', 12, 'u3'),
('Energia Mu', 4500.00, 'Contato', 'Primeiro contato.', '2024-07-18 13:20:00', 13, 'u7'),
('Finance Nu', 20000.00, 'Fechado', 'Contrato fechado Q2.', '2024-07-25 10:10:00', 14, 'u2'),
('Alimentos Omicron', 6700.00, 'Proposta', 'Ajuste de preço pendente.', '2024-08-03 12:00:00', 15, 'u4'),
('Construtora Pi', 18000.00, 'Contato', 'Visita técnica inicial.', '2024-08-15 09:40:00', 16, 'u5'),
('Telecom Rho', 3100.00, 'Lead', 'Registrar näk', '2024-08-20 16:00:00', 17, 'u6'),
('Auto Sigma', 24000.00, 'Negociação', 'Discussão final de termos.', '2024-09-01 10:00:00', 18, 'u3'),
('Eventos Tau', 4200.00, 'Proposta', 'Ver datas.', '2024-09-10 11:10:00', 19, 'u7'),
('Labs Upsilon', 5200.00, 'Contato', 'Solicitou informações técnicas.', '2024-10-05 09:20:00', 20, 'u2'),
('Fashion Vega', 13000.00, 'Fechado', 'Contrato anual.', '2024-10-15 12:30:00', 21, 'u4'),
('Transportes Weta', 2900.00, 'Contato', 'Sem pressa.', '2024-10-25 14:00:00', 22, 'u5'),
('PoC Xeno', 2000.00, 'Proposta', 'PoC em execução.', '2024-11-03 10:00:00', 23, 'u6'),
('Media Ypsilon', 3600.00, 'Negociação', 'Ajuste do escopo.', '2024-11-12 09:45:00', 24, 'u2'),
('Serviços Zeta', 8800.00, 'Proposta', 'Em avaliação.', '2024-11-22 15:10:00', 25, 'u3'),
('Agro Alpha', 15000.00, 'Fechado', 'Contrato longo prazo.', '2024-11-28 08:30:00', 26, 'u7'),
('Beta2 PoC', 3200.00, 'Contato', 'Avaliar integração.', '2024-11-30 10:50:00', 27, 'u5'),
('Distrib Gamma2', 4100.00, 'Proposta', 'Aguardando orçamento.', '2024-12-01 11:40:00', 28, 'u6'),
('Delta2 Project', 12500.00, 'Negociação', 'Termos finais.', '2024-12-05 09:00:00', 29, 'u2'),
('Extra Oportunidade 1', 4800.00, 'Contato', 'Teste 1', '2024-12-06 10:10:00', 1, 'u3'),
('Extra Oportunidade 2', 5200.00, 'Proposta', 'Teste 2', '2024-12-07 11:11:00', 2, 'u4'),
('Extra Oportunidade 3', 7500.00, 'Negociação', 'Teste 3', '2024-12-08 12:12:00', 3, 'u5'),
('Extra Oportunidade 4', 9800.00, 'Contato', 'Teste 4', '2024-12-09 13:13:00', 4, 'u6'),
('Extra Oportunidade 5', 11000.00, 'Proposta', 'Teste 5', '2024-12-10 14:14:00', 5, 'u2');

INSERT INTO interacoes (tipo, descricao, proxima_acao, data, cliente_id, oportunidade_id, usuario_id) VALUES
('Ligação','Contato inicial por telefone.','Enviar proposta','2024-02-16 10:30:00',1,1,'u2'),
('E-mail','Enviei apresentação com anexo.','Aguardar resposta','2024-02-17 11:00:00',1,1,'u2'),
('Reunião','Kickoff com equipe técnica.','Preparar POC','2024-02-20 14:00:00',2,2,'u3'),
('WhatsApp','Confirmação de horário da reunião.','Enviar lembrete','2024-02-21 08:00:00',2,2,'u3'),
('Anotação','Cliente solicitou desconto para 1º mês.','Registrar proposta ajustada','2024-03-01 09:10:00',3,3,'u4'),
('Ligação','Perguntou sobre SLA.','Agendar call técnica','2024-03-05 10:50:00',3,3,'u4'),
('E-mail','Enviei orçamento revisado.','Aguardar aprovação','2024-03-22 15:05:00',4,4,'u2'),
('WhatsApp','Cliente respondeu positivo.','Marcar visita','2024-03-26 09:30:00',4,4,'u2'),
('Ligação','Confirmação de renovação.','Nenhuma','2024-04-06 10:05:00',6,9,'u4'),
('Anotação','Pagamento recebido.','Arquivo nota fiscal','2024-04-07 12:00:00',6,9,'u4'),
('Reunião','Demonstração ao time de vendas.','Enviar manual','2024-04-28 11:45:00',6,6,'u3'),
('E-mail','Solicitar documentos fiscais.','Aguardar envio','2024-05-11 09:00:00',7,7,'u6'),
('Ligação','Confirmação de integração.','Agendar suporte','2024-05-21 10:00:00',8,8,'u2'),
('WhatsApp','Detalhes técnicos enviados.','Follow-up 3 dias','2024-05-22 16:10:00',8,8,'u2'),
('Anotação','Cliente falou sobre volume futuro.','Revisar pacote','2024-06-02 13:00:00',9,9,'u4'),
('E-mail','Enviei proposta de renovação.','Aguardar','2024-06-16 12:10:00',10,10,'u5'),
('Ligação','Primeiro contato depois da feira.','Registrar lead qualificado','2024-06-23 14:30:00',11,11,'u6'),
('Reunião','Reunião com CFO.', 'Enviar termo', '2024-07-11 10:00:00',12,12,'u3'),
('E-mail','Pedido de alteração técnica.',NULL,'2024-07-19 15:00:00',13,13,'u7'),
('Ligação','Negociação de preço.','Enviar nova proposta','2024-07-26 16:45:00',14,14,'u2'),
('Anotação','Esclarecer dúvidas sobre contrato.','Passar para jurídico','2024-08-04 09:20:00',15,15,'u4'),
('Reunião','Visita técnica no canteiro.','Enviar relatório','2024-08-16 10:30:00',16,16,'u5'),
('E-mail','Enviei PoC instructions.','Aguardar feedback','2024-09-02 11:10:00',23,23,'u6'),
('Ligação','Confirmar participação em feira.','Enviar convite','2024-09-11 09:00:00',19,19,'u7'),
('WhatsApp','Confirmação de testes.',NULL,'2024-10-06 14:45:00',20,20,'u2'),
('E-mail','Ajuste de escopo solicitado.','Reenviar escopo','2024-10-17 10:00:00',24,24,'u2'),
('Anotação','Reunião com purchasing.',NULL,'2024-10-27 11:30:00',21,21,'u4'),
('Ligação','Discussão sobre integração.',NULL,'2024-11-04 09:20:00',22,22,'u5'),
('Reunião','Revisão contrato.',NULL,'2024-11-13 10:00:00',24,24,'u3'),
('E-mail','Enviei proposta atualizada.','Aguardar validação','2024-11-23 09:40:00',25,25,'u3'),
('Ligação','Confirmação de datas.',NULL,'2024-11-29 15:50:00',26,26,'u7'),
('Anotação','Contato interno realizado.',NULL,'2024-12-01 12:00:00',27,27,'u5'),
('E-mail','Confirmação de requisitos.','Follow-up 7 dias','2024-12-02 13:20:00',28,28,'u6'),
('Ligação','Revisão financeira.','Enviar aditivo','2024-12-03 09:00:00',29,29,'u2'),
('Anotação','Cliente pediu esclarecimentos fiscais.','Encaminhar para contabilidade','2024-12-04 10:30:00',30,30,'u3'),
('E-mail','Contato pós venda.','Nenhuma','2024-12-04 11:00:00',9,9,'u4'),
('WhatsApp','Agendado follow-up técnico.','Reunião técnica','2024-12-04 12:15:00',1,1,'u2'),
('Ligação','Checagem de maturidade do projeto.','Ajustar cronograma','2024-12-04 14:00:00',12,12,'u3');

INSERT INTO log_acesso (usuario_id, data, descricao) VALUES
('u1','2024-02-01 09:12:00','Conta criada.'),
('u2','2024-03-05 10:21:00','Primeiro login.'),
('u3','2024-04-10 11:46:00','Primeiro login.'),
('u4','2024-05-12 12:01:00','Primeiro login.'),
('u5','2024-06-15 09:31:00','Primeiro login.'),
('u6','2024-07-20 14:51:00','Primeiro login.'),
('u7','2024-08-22 16:11:00','Primeiro login.'),
('u8','2024-09-01 08:01:00','Conta bloqueada manualmente.'),
('u2','2024-12-01 09:00:00','Acessou dashboard'),
('u3','2024-12-01 09:05:00','Acessou clientes');

-- 03_queries.sql

-- 1) JOIN simples (uso: listar oportunidades com cliente)
-- Uso pretendido: mostrar lista no painel de oportunidades (nome, cliente, valor, etapa).
SELECT o.id, o.nome AS oportunidade, c.nome AS cliente, o.valor, o.etapa, o.criado_em
FROM oportunidades o
JOIN clientes c ON o.cliente_id = c.id
ORDER BY o.criado_em DESC
LIMIT 50;

-- 2) JOIN com 3+ tabelas (uso: relatório detalhado de interações)
-- Uso pretendido: exibir histórico de interações com dados do cliente, oportunidade e usuário que registrou.
SELECT i.id, i.data, i.tipo, i.descricao, c.nome AS cliente, o.nome AS oportunidade, u.nome AS responsavel
FROM interacoes i
LEFT JOIN clientes c ON i.cliente_id = c.id
LEFT JOIN oportunidades o ON i.oportunidade_id = o.id
LEFT JOIN usuarios u ON i.usuario_id = u.id
WHERE i.data >= '2024-11-01' AND i.data < '2024-12-01'
ORDER BY i.data DESC;

-- 3) GROUP BY + HAVING (uso: identificar clientes com muitas oportunidades)
-- Uso pretendido: alerta de "conta quente" — clientes com >= 2 oportunidades abertas.
SELECT c.id, c.nome, COUNT(o.id) AS total_oportunidades
FROM clientes c
LEFT JOIN oportunidades o ON o.cliente_id = c.id
WHERE o.etapa <> 'Fechado' OR o.etapa IS NULL
GROUP BY c.id, c.nome
HAVING COUNT(o.id) >= 2
ORDER BY total_oportunidades DESC;

-- 4) Subconsulta (IN) (uso: encontrar clientes com interações recentes)
-- Uso pretendido: preparar campanha de follow-up para clientes com interações na última semana.
SELECT *
FROM clientes
WHERE id IN (
    SELECT DISTINCT cliente_id FROM interacoes WHERE data >= DATE_SUB(NOW(), INTERVAL 7 DAY)
)
ORDER BY nome;

-- 5) Funções de agregação + ordenação (uso: KPI valor por etapa)
-- Uso pretendido: calcular total em pipeline por etapa ordenado por valor total (maior primeiro).
SELECT etapa, COUNT(*) AS qtde, SUM(valor) AS total_valor, AVG(valor) AS valor_medio
FROM oportunidades
GROUP BY etapa
ORDER BY total_valor DESC;

-- 6) Filtro por intervalo (datas/valores) (uso: relatório financeiro)
-- Uso pretendido: extrair oportunidades fechadas entre datas com valor acima de X.
SELECT id, nome, cliente_id, valor, criado_em
FROM oportunidades
WHERE etapa = 'Fechado'
  AND criado_em BETWEEN '2024-07-01' AND '2024-12-31'
  AND valor >= 5000
ORDER BY criado_em DESC;

-- 7) Consulta extra: contabilizar interações por usuário (uso: performance)
-- Uso pretendido: montar dashboard com quantidade de interações por vendedor no mês.
SELECT u.id, u.nome, COUNT(i.id) AS total_interacoes
FROM usuarios u
LEFT JOIN interacoes i ON i.usuario_id = u.id
WHERE i.data BETWEEN '2024-11-01' AND '2024-11-30'
GROUP BY u.id, u.nome
ORDER BY total_interacoes DESC;

-- 04_views.sql

-- 1) View relatório (agregações): total por etapa e qtde (usada em relatório de pipeline)
CREATE OR REPLACE VIEW v_pipeline_resumo AS
SELECT etapa, COUNT(*) AS qtde, SUM(valor) AS soma_valor, AVG(valor) AS media_valor
FROM oportunidades
GROUP BY etapa;

-- Uso: alimentar um card no dashboard com total e total em pipeline.

-- 2) View de conveniência (simplifica joins): oportunidades com nome do cliente e responsável
CREATE OR REPLACE VIEW v_oportunidade_completa AS
SELECT o.id AS oportunidade_id, o.nome AS oportunidade, o.valor, o.etapa,
       c.id AS cliente_id, c.nome AS cliente_nome,
       u.id AS usuario_id, u.nome AS usuario_nome,
       o.criado_em
FROM oportunidades o
LEFT JOIN clientes c ON o.cliente_id = c.id
LEFT JOIN usuarios u ON o.criado_por = u.id;

-- Uso: simplifica consultas no front-end sem repetir JOINS.

-- 3) View parametrizável (genérica): últimos registros de interações para um cliente (filtros aplicados na consulta)
CREATE OR REPLACE VIEW v_interacoes_basica AS
SELECT i.id, i.data, i.tipo, i.descricao, i.proxima_acao,
       i.cliente_id, i.oportunidade_id, i.usuario_id
FROM interacoes i;
-- Uso: a view já contém joins mínimos; o front-end/relatório aplica WHERE cliente_id = ? e ORDER BY data DESC.

-- 4) View de segurança (oculta colunas sensíveis): usuários sem email completo (apenas iniciais)
CREATE OR REPLACE VIEW v_usuarios_publico AS
SELECT id, nome,
       CONCAT(LEFT(email,1),'****@',SUBSTRING_INDEX(email,'@',-1)) AS email_masked,
       cargo, criado_em
FROM usuarios;
-- Uso: expor lista de usuários a pessoas sem permissão para ver emails completos (API pública interna).

-- Descrever cenários de uso:
-- v_pipeline_resumo: usado para mostrar KPI no dashboard.
-- v_oportunidade_completa: usado por telas que listam oportunidades com nome do cliente e vendedor.
-- v_interacoes_basica: usado por relatórios que aplicam filtro dinâmico (parâmetro cliente_id).
-- v_usuarios_publico: usado por endpoints que retornam lista pública sem expor emails.

-- 05_procs_funcs.sql

DELIMITER $$

-- 1) Procedure transacional de CRUD: inserir oportunidade com validação (commit/rollback)
CREATE PROCEDURE sp_inserir_oportunidade(
    IN p_nome VARCHAR(150),
    IN p_valor DECIMAL(12,2),
    IN p_etapa ENUM('Contato','Proposta','Negociação','Fechado'),
    IN p_anotacoes TEXT,
    IN p_cliente_id INT,
    IN p_criado_por VARCHAR(50)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;

  -- pré-condição: cliente existe
  IF (SELECT COUNT(*) FROM clientes WHERE id = p_cliente_id) = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cliente inexistente';
  END IF;

  INSERT INTO oportunidades (nome, valor, etapa, anotacoes, cliente_id, criado_por)
  VALUES (p_nome, p_valor, p_etapa, p_anotacoes, p_cliente_id, p_criado_por);

  COMMIT;
END$$

-- Exemplo de chamada:
-- CALL sp_inserir_oportunidade('Nova Oportunidade X', 5200.00, 'Contato', 'Teste via proc', 3, 'u2');

-- 2) Função derivada: calcula faixa de valor (score)
CREATE FUNCTION fn_faixa_valor(p_valor DECIMAL(12,2)) RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
  DECLARE v_ret VARCHAR(20);
  IF p_valor IS NULL THEN
    SET v_ret = 'Indefinido';
  ELSEIF p_valor < 3000 THEN
    SET v_ret = 'Baixo';
  ELSEIF p_valor BETWEEN 3000 AND 10000 THEN
    SET v_ret = 'Médio';
  ELSE
    SET v_ret = 'Alto';
  END IF;
  RETURN v_ret;
END$$

-- Exemplo:
-- SELECT fn_faixa_valor(7500.00); -- retorna 'Médio'

-- 3) Rotina relatorial: preenche tabela temporária com soma de oportunidades por usuário
CREATE PROCEDURE sp_relatorio_oportunidades_por_usuario(IN p_data_inicio DATE, IN p_data_fim DATE)
BEGIN
  DROP TEMPORARY TABLE IF EXISTS tmp_rel_op_usuario;
  CREATE TEMPORARY TABLE tmp_rel_op_usuario (
    usuario_id VARCHAR(50),
    nome_usuario VARCHAR(100),
    total_oportunidades INT,
    soma_valor DECIMAL(14,2)
  );

  INSERT INTO tmp_rel_op_usuario (usuario_id, nome_usuario, total_oportunidades, soma_valor)
  SELECT u.id, u.nome, COUNT(o.id) AS qt, COALESCE(SUM(o.valor),0) AS soma
  FROM usuarios u
  LEFT JOIN oportunidades o ON o.criado_por = u.id AND DATE(o.criado_em) BETWEEN p_data_inicio AND p_data_fim
  GROUP BY u.id, u.nome;

  SELECT * FROM tmp_rel_op_usuario ORDER BY soma_valor DESC;
END$$

-- Exemplo:
-- CALL sp_relatorio_oportunidades_por_usuario('2024-01-01','2024-12-31');

-- 4) Rotina de negócio: marcar cliente como 'Ex-cliente' se não houver interações em 12 meses
CREATE PROCEDURE sp_marcar_inativos()
BEGIN
  DECLARE v_cutoff DATETIME;
  SET v_cutoff = DATE_SUB(NOW(), INTERVAL 12 MONTH);

  -- atualizar categoria para 'Ex-cliente' para clientes sem interacoes após cutoff
  UPDATE clientes c
  SET c.categoria = 'Ex-cliente'
  WHERE NOT EXISTS (
    SELECT 1 FROM interacoes i WHERE i.cliente_id = c.id AND i.data >= v_cutoff
  );
END$$

-- Exemplo:
-- CALL sp_marcar_inativos();

DELIMITER ;


-- 06_triggers.sql

-- tabela para auditoria de interacoes e oportunidades
DROP TABLE IF EXISTS audit_changes;
CREATE TABLE audit_changes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tabela VARCHAR(64),
  operacao VARCHAR(10),
  registro_id VARCHAR(64),
  usuario_id VARCHAR(50),
  descricao TEXT,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

-- Trigger 1: impedir exclusão indevida (regra de negócio)
-- Exemplo: impedir exclusão de cliente que tem oportunidades ativas (não-FECHADO)
CREATE TRIGGER trg_before_delete_cliente
BEFORE DELETE ON clientes
FOR EACH ROW
BEGIN
  IF EXISTS (SELECT 1 FROM oportunidades o WHERE o.cliente_id = OLD.id AND o.etapa <> 'Fechado') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Não é permitido excluir cliente com oportunidades ativas';
  END IF;
END$$

-- Trigger 2: auditoria após insert/update/delete em oportunidades
CREATE TRIGGER trg_after_op_insert
AFTER INSERT ON oportunidades
FOR EACH ROW
BEGIN
  INSERT INTO audit_changes (tabela, operacao, registro_id, usuario_id, descricao)
  VALUES ('oportunidades','INSERT', NEW.id, NEW.criado_por, CONCAT('Inserida oportunidade: ', NEW.nome));
END$$

CREATE TRIGGER trg_after_op_update
AFTER UPDATE ON oportunidades
FOR EACH ROW
BEGIN
  INSERT INTO audit_changes (tabela, operacao, registro_id, usuario_id, descricao)
  VALUES ('oportunidades','UPDATE', NEW.id, NEW.criado_por, CONCAT('Atualizada oportunidade: ', NEW.nome, ' etapa->', NEW.etapa));
END$$

CREATE TRIGGER trg_after_op_delete
AFTER DELETE ON oportunidades
FOR EACH ROW
BEGIN
  INSERT INTO audit_changes (tabela, operacao, registro_id, usuario_id, descricao)
  VALUES ('oportunidades','DELETE', OLD.id, OLD.criado_por, CONCAT('Excluída oportunidade: ', OLD.nome));
END$$

DELIMITER ;

-- ============================================================
-- TRIGGER: Evitar exclusão de cliente com oportunidades
-- ============================================================

DELIMITER $$

CREATE TRIGGER trg_no_delete_cliente
BEFORE DELETE ON clientes
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM oportunidades WHERE id_cliente = OLD.id_cliente) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Não é possível excluir cliente com oportunidades vinculadas.';
    END IF;
END $$

DELIMITER ;


-- 07_transacao_exemplo.sql
-- Cenário: inserir oportunidade + inserir interação ligada; se falhar a interação, rollback tudo.

-- Suponha que cliente_id = 3 e usuario 'u2' existam
START TRANSACTION;

-- tentativa de inserir oportunidade
INSERT INTO oportunidades (nome, valor, etapa, anotacoes, cliente_id, criado_por)
VALUES ('Transação Teste Oportunidade', 7500.00, 'Contato', 'Criado via transacao exemplo', 3, 'u2');

-- pegar id gerado (MySQL session variable)
SET @last_op_id = LAST_INSERT_ID();

-- inserir interação relacionada
INSERT INTO interacoes (tipo, descricao, proxima_acao, data, cliente_id, oportunidade_id, usuario_id)
VALUES ('Anotação', 'Interação criada junto com oportunidade', NULL, NOW(), 3, @last_op_id, 'u2');

-- Se tudo ok:
COMMIT;

-- Simulação de falha (ex.: cliente inexistente): demonstrar rollback
START TRANSACTION;
-- suponhamos cliente_id = 9999 não exista -> inserir deve falhar na FK ou nossa validação
INSERT INTO oportunidades (nome, valor, etapa, anotacoes, cliente_id, criado_por)
VALUES ('Transacao Falha', 1000.00, 'Contato', 'Teste rollback', 9999, 'u2');

-- vai falhar por foreign key; então fazemos rollback manualmente (ou o DB retorna erro)
ROLLBACK;
