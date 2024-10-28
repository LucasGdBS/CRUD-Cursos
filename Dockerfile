# Dockerfile
FROM python:3.12-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários primeiro
COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante dos arquivos da aplicação
COPY . .

# Comando para iniciar a aplicação
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
