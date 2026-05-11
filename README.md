# CRM-Simplificado

## Descrição
CRM Simplificado é uma aplicação web para gerenciar clientes, oportunidades comerciais, interações e usuários em um processo de vendas. O sistema permite operações completas de CRUD, oferecendo uma interface centralizada para acompanhar o ciclo comercial de forma organizada.

## Objetivo
O objetivo do projeto é resolver a necessidade de um controle simples e eficiente de relacionamento com clientes, ajudando equipes de vendas a registrar contatos, acompanhar oportunidades e registrar interações de forma estruturada.

## Tecnologias utilizadas
- Node.js
- Express.js
- EJS
- MySQL (mysql2)
- Joi
- dotenv
- nodemon
- HTML, CSS, JavaScript

## Pré-requisitos
- Node.js instalado (versão 18+ recomendada)
- MySQL instalado e em execução
- Um banco de dados MySQL configurado para o projeto
- Uma cópia do arquivo `.env` com as variáveis de ambiente necessárias

## Instalação e configuração
1. Clone o repositório:
   ```bash
   git clone https://github.com/heitorsinistro/CRM-Simplificado.git
   cd CRM-Simplificado
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados MySQL e crie o schema `crm_simplificado`.
4. Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=crm_simplificado
   PORT=3000
   ```
5. Opcional: ajuste as configurações de banco em `src/config/db.js` se necessário.

## Como executar
- Para iniciar em modo de desenvolvimento com reinicialização automática:
  ```bash
  npm run dev
  ```
- Para iniciar em modo normal:
  ```bash
  npm start
  ```

Depois, abra no navegador:

```text
http://localhost:3000
```

## Exemplos de uso
- Acesse `http://localhost:3000/login` para entrar no sistema.
- Use `http://localhost:3000/clientes` para listar e adicionar clientes.
- Use `http://localhost:3000/oportunidades` para gerenciar oportunidades.
- Use `http://localhost:3000/interacoes` para registrar interações.
- Use `http://localhost:3000/usuarios` para visualizar usuários.

## Estrutura de pastas
```text
CRM-Simplificado/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── public/
│   │   └── styles/
│   └── views/
├── server.js
├── package.json
└── README.md
```

## Contribuição
Contribuições são bem-vindas! Para colaborar:
1. Faça um fork do repositório.
2. Crie uma branch com sua feature ou correção (`git checkout -b minha-feature`).
3. Faça os commits necessários e envie para sua branch.
4. Abra um pull request descrevendo as mudanças.

## Licença
Este projeto está licenciado sob a licença `ISC`.

## Contato
- Heitor Cabral
- Isabela Tostes
- Lazaro Souza
- Leonardo Benine

Para dúvidas ou sugestões, abra uma issue no repositório GitHub.
