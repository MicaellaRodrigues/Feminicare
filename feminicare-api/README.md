# Feminicare API

Feminicare API é um projeto desenvolvido em TypeScript que fornece uma interface para gerenciar informações relacionadas a profissionais de saúde, artigos, conteúdos e usuários. Esta API é construída sobre o framework Express e utiliza um banco de dados MySQL para armazenar dados.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
feminicare-api
├── src
│   ├── index.ts                # Ponto de entrada da aplicação
│   ├── config                   # Configurações da aplicação
│   │   ├── database.ts          # Gerenciamento da conexão com o banco de dados
│   │   └── env.ts               # Carregamento de variáveis de ambiente
│   ├── controllers              # Controladores para gerenciar a lógica da aplicação
│   │   ├── adminController.ts    # Operações relacionadas aos administradores
│   │   ├── articleController.ts   # Operações relacionadas aos artigos
│   │   ├── authController.ts      # Autenticação e recuperação de senha
│   │   ├── contentController.ts    # Operações relacionadas ao conteúdo
│   │   ├── professionalController.ts # Operações relacionadas aos profissionais
│   │   ├── searchController.ts     # Busca na API
│   │   └── userController.ts       # Operações relacionadas aos usuários
│   ├── middleware                # Middleware para a aplicação
│   │   ├── auth.ts               # Proteção de rotas
│   │   ├── errorHandler.ts        # Tratamento de erros
│   │   └── validation.ts          # Validação de dados
│   ├── models                    # Modelos de dados
│   │   ├── Administrator.ts       # Entidade Administrador
│   │   ├── Article.ts             # Entidade Artigo
│   │   ├── Content.ts             # Entidade Conteúdo
│   │   ├── Professional.ts         # Entidade Profissional
│   │   └── User.ts                # Entidade Usuário
│   ├── routes                    # Definição das rotas da API
│   │   ├── adminRoutes.ts         # Rotas para administradores
│   │   ├── articleRoutes.ts       # Rotas para artigos
│   │   ├── authRoutes.ts          # Rotas de autenticação
│   │   ├── contentRoutes.ts       # Rotas para conteúdo
│   │   ├── professionalRoutes.ts   # Rotas para profissionais
│   │   ├── searchRoutes.ts        # Rotas de busca
│   │   └── userRoutes.ts          # Rotas para usuários
│   ├── types                     # Tipos e interfaces
│   │   ├── express.d.ts           # Extensões para o Express
│   │   └── index.ts               # Tipos e interfaces do projeto
│   └── utils                     # Utilitários
│       ├── ApiError.ts            # Classe para erros personalizados
│       └── validators.ts           # Funções de validação
├── .env                           # Variáveis de ambiente
├── .env.example                   # Exemplo de arquivo .env
├── .gitignore                     # Arquivos a serem ignorados pelo Git
├── jest.config.js                 # Configuração do Jest
├── package.json                   # Configuração do npm
├── tsconfig.json                  # Configuração do TypeScript
└── README.md                      # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd feminicare-api
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Crie um arquivo `.env` com as variáveis de ambiente necessárias, utilizando o arquivo `.env.example` como referência.

## Uso

Para iniciar o servidor, execute o seguinte comando:

```
npm start
```

A API estará disponível em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.