# Usa Docker Compose para construir tudo
FROM docker/compose:1.29.2

WORKDIR /app

# Copia todos os arquivos necessários
COPY docker-compose.yml .
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Expõe as portas do frontend e backend
EXPOSE 3000 5000

# Comando para iniciar todos os serviços
CMD ["docker-compose", "up", "--build"]
