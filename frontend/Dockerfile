# Используем Node image для Expo
FROM node:18-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install
RUN npm install -g @expo/ngrok


# Копируем остальные файлы
COPY frontend/ .

# Открываем порт 19000 для Expo
EXPOSE 8081

CMD ["npx", "expo", "start", "--tunnel"]


