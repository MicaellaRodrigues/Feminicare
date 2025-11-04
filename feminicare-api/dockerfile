# Etapa 1: Build da aplicação
FROM node:18 AS builder

# Diretório de trabalho
WORKDIR /app

# Copia arquivos necessários
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instala as dependências
RUN npm install

# Compila TypeScript para JavaScript
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:18 AS runner

# Diretório de trabalho
WORKDIR /app

# Apenas dependências para produção
COPY package*.json ./
RUN npm install --only=production

# Copia os arquivos compilados da etapa anterior
COPY --from=builder /app/dist ./dist

# Define a porta que será exposta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]