# FeminiCare

FeminiCare é um aplicativo React projetado para fornecer informações e recursos sobre saúde feminina em diferentes fases da vida. O aplicativo inclui páginas dedicadas a temas como puberdade, saúde reprodutiva e menopausa, além de funcionalidades para gerenciamento de perfil e recuperação de senha.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
feminicare-react
├── public
│   ├── index.html
│   └── img
├── src
│   ├── index.js
│   ├── App.js
│   ├── components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Cards.js
│   ├── pages
│   │   ├── Home.js
│   │   ├── SobreNos.js
│   │   ├── SaudeMulher.js
│   │   ├── Puberdade.js
│   │   ├── Reprodutiva.js
│   │   ├── Menopausa.js
│   │   ├── MeuPerfil.js
│   │   └── EsqueciSenha.js
│   ├── styles
│   │   ├── global.css
│   │   ├── header.css
│   │   ├── home.css
│   │   ├── sobrenos.css
│   │   ├── saudemulher.css
│   │   ├── fase.css
│   │   ├── perfil.css
│   │   └── esqueci-senha.css
│   ├── context
│   │   └── AuthContext.js
│   └── services
│       └── api.js
├── package.json
└── README.md
```

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```
   git clone <URL do repositório>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd feminicare-react
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

## Uso

Após iniciar o servidor, você pode acessar o aplicativo em `http://localhost:3000`. Navegue pelas diferentes páginas para explorar as informações sobre saúde feminina.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.