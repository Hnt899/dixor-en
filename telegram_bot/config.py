import os
from typing import List

# Токен бота (получить у @BotFather)
BOT_TOKEN = os.getenv("BOT_TOKEN", "")

# ID администраторов (можно несколько)
ADMIN_IDS: List[int] = [
    # Добавьте сюда ID администраторов
    # Пример: 123456789
]

# Настройки вебхука
WEBHOOK_HOST = os.getenv("WEBHOOK_HOST", "localhost")
WEBHOOK_PORT = int(os.getenv("WEBHOOK_PORT", "8443"))
WEBHOOK_PATH = "/webhook"
WEBHOOK_URL = f"https://{WEBHOOK_HOST}:{WEBHOOK_PORT}{WEBHOOK_PATH}"

# Настройки сервера для вебхука
WEBHOOK_LISTEN = "0.0.0.0"
WEBHOOK_PORT_LISTEN = int(os.getenv("WEBHOOK_PORT_LISTEN", "8443"))

# Путь к базе данных
DB_PATH = "telegram_bot/orders.db"

