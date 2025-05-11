# Используем базовый образ Python
FROM python:3.10-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только требования и устанавливаем зависимости
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы приложения
COPY backend/ .

# Открываем порт 5000 для Flask
EXPOSE 5000

# Запуск Flask сервера
CMD ["python", "app.py"]
