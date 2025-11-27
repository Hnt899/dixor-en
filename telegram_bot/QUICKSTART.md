# Быстрый старт

## 1. Установка зависимостей

```bash
cd telegram_bot
pip install -r requirements.txt
```

## 2. Настройка бота

1. Создайте бота через [@BotFather](https://t.me/BotFather) в Telegram
2. Скопируйте токен бота
3. Узнайте свой Telegram ID через [@userinfobot](https://t.me/userinfobot)

## 3. Настройка config.py

Откройте `telegram_bot/config.py` и укажите:

```python
BOT_TOKEN = "ваш_токен_от_BotFather"

ADMIN_IDS: List[int] = [
    123456789,  # Ваш Telegram ID
]
```

Или используйте переменные окружения:

```bash
export BOT_TOKEN="ваш_токен"
```

## 4. Запуск бота

### Для разработки (polling):
```bash
python bot_polling.py
```

### Для продакшена (webhook):
```bash
python bot.py
```

## 5. Интеграция с сайтом

Отправляйте POST-запросы на `/new_order`:

```javascript
fetch('http://your-domain.com/new_order', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'Иван Иванов',
        phone: '+79991234567',
        email: 'ivan@example.com',  // опционально
        comment: 'Нужна консультация'  // опционально
    })
});
```

## Готово! 🎉

Бот готов к работе. Отправьте `/start` боту в Telegram для начала работы.

