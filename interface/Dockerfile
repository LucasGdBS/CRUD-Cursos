# Dockerfile para o aplicativo React
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Build do aplicativo React
RUN npm run build

# Expõe a porta usada pelo Vite (por padrão, 5173)
EXPOSE 5173

# Inicia o servidor de desenvolvimento Vite
CMD ["npm", "run", "dev", "--", "--host"]
