import os
from typing import List

# Токен бота (получить у @BotFather)
BOT_TOKEN = os.getenv("BOT_TOKEN", "8578888336:AAGBfFsA9Vq8HgHsBNPnVWI21OA8OLWJW9o")

# ID администраторов (можно несколько)
ADMIN_IDS: List[int] = [
    875436063,
]

# Настройки вебхука
WEBHOOK_HOST = os.getenv("WEBHOOK_HOST", "localhost")
WEBHOOK_PORT = int(os.getenv("WEBHOOK_PORT", "8443"))
WEBHOOK_PATH = "/webhook"

# В проде лучше собрать из домена, но для ngrok проще захардкодить целиком:
# WEBHOOK_URL = "https://your-ngrok-or-domain-here/webhook"
WEBHOOK_URL = f"https://davin-autogenous-yasmin.ngrok-free.dev/webhook"

# Настройки сервера для вебхука
WEBHOOK_LISTEN = "0.0.0.0"
WEBHOOK_PORT_LISTEN = int(os.getenv("WEBHOOK_PORT_LISTEN", "8443"))

# Путь к базе данных
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "orders.db")
