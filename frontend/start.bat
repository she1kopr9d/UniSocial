@echo off
echo Starting UniSocial Frontend...

REM Проверяем подключение к Docker Hub
echo Checking Docker Hub connection...
curl -s https://registry-1.docker.io/v2/ >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Cannot connect to Docker Hub
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

REM Останавливаем и удаляем существующий контейнер
echo Stopping and removing existing container...
docker stop unisocial-frontend 2>nul
docker rm unisocial-frontend 2>nul

REM Удаляем старый образ
echo Removing old image...
docker rmi unisocial-frontend 2>nul

REM Собираем новый образ с повторными попытками
echo Building new image...
set MAX_RETRIES=3
set RETRY_COUNT=0

:retry_build
if %RETRY_COUNT% lss %MAX_RETRIES% (
    docker build -t unisocial-frontend .
    if %errorlevel% equ 0 goto build_success
    set /a RETRY_COUNT+=1
    if %RETRY_COUNT% lss %MAX_RETRIES% (
        echo Build failed, retrying... (Attempt %RETRY_COUNT% of %MAX_RETRIES%)
        timeout /t 2 >nul
        goto retry_build
    ) else (
        echo Failed to build image after %MAX_RETRIES% attempts
        pause
        exit /b 1
    )
)

:build_success
REM Запускаем контейнер
echo Starting container...
docker run -d -p 8080:80 --name unisocial-frontend unisocial-frontend

REM Проверяем, что контейнер запущен
docker ps -q -f name=unisocial-frontend >nul
if %errorlevel% equ 0 (
    echo UniSocial Frontend is running!
    echo Open http://localhost:8080 in your browser
    echo.
    echo Available routes:
    echo - http://localhost:8080/login
    echo - http://localhost:8080/register
    echo - http://localhost:8080/feed
    echo - http://localhost:8080/friends
    echo - http://localhost:8080/messages
    echo - http://localhost:8080/groups
    echo - http://localhost:8080/notifications
    
    echo.
    echo Container logs:
    docker logs unisocial-frontend
) else (
    echo Failed to start container
    echo Check logs with: docker logs unisocial-frontend
)

pause 