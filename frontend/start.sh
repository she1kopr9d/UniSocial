#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting UniSocial Frontend...${NC}"

# Проверяем подключение к Docker Hub
echo "Checking Docker Hub connection..."
if ! curl -s https://registry-1.docker.io/v2/ > /dev/null; then
    echo -e "${RED}Error: Cannot connect to Docker Hub${NC}"
    echo "Please check your internet connection and try again"
    exit 1
fi

# Останавливаем и удаляем существующий контейнер
echo "Stopping and removing existing container..."
docker stop unisocial-frontend 2>/dev/null || true
docker rm unisocial-frontend 2>/dev/null || true

# Удаляем старый образ
echo "Removing old image..."
docker rmi unisocial-frontend 2>/dev/null || true

# Собираем новый образ с повторными попытками
echo "Building new image..."
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker build -t unisocial-frontend .; then
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
        echo -e "${YELLOW}Build failed, retrying... (Attempt $RETRY_COUNT of $MAX_RETRIES)${NC}"
        sleep 2
    else
        echo -e "${RED}Failed to build image after $MAX_RETRIES attempts${NC}"
        exit 1
    fi
done

# Запускаем контейнер
echo "Starting container..."
docker run -d -p 8080:80 --name unisocial-frontend unisocial-frontend

# Проверяем, что контейнер запущен
if [ "$(docker ps -q -f name=unisocial-frontend)" ]; then
    echo -e "${GREEN}UniSocial Frontend is running!${NC}"
    echo -e "Open http://localhost:8080 in your browser"
    echo -e "\nAvailable routes:"
    echo "- http://localhost:8080/login"
    echo "- http://localhost:8080/register"
    echo "- http://localhost:8080/feed"
    echo "- http://localhost:8080/friends"
    echo "- http://localhost:8080/messages"
    echo "- http://localhost:8080/groups"
    echo "- http://localhost:8080/notifications"
    
    # Показываем логи
    echo -e "\n${GREEN}Container logs:${NC}"
    docker logs unisocial-frontend
else
    echo -e "${RED}Failed to start container${NC}"
    echo "Check logs with: docker logs unisocial-frontend"
fi 