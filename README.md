# Сайт объявлений Avito-skypro

Приложение для размещения и просмотра объявлений. "Клон" Авито.

Проект написан на языке typescript. Окружение: Redux Toolkit, RTK Query, Axios. Так же пробовал линтеры. 

## Инструкция по развертыванию бэка

1. Перейти в папку "back-skyVito", выполнив команду - cd back-skyVito
2. Запустить Docker на ПК
3. В терминале выполнить команду - docker-compose -f docker-compose-backend.yaml up -d
4. Вернуться в папку с проектом - cd ..
5. Перейти по адресу http://localhost:8090/

## Инструкция по сборке

1. Установка зависимостей - npm install
2. Запуск dev-сервера - npm run start
3. Product-сборка - npm run build
