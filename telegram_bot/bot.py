import asyncio
import logging
import sys
from aiohttp import web
from aiogram import Bot, Dispatcher
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application
from aiogram.fsm.storage.memory import MemoryStorage

from config import BOT_TOKEN, WEBHOOK_URL, WEBHOOK_PATH, WEBHOOK_LISTEN, WEBHOOK_PORT_LISTEN, ADMIN_IDS
from handlers import admin, webhook

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


async def on_startup(bot: Bot) -> None:
    """Действия при запуске бота"""
    # Установка вебхука
    await bot.set_webhook(WEBHOOK_URL)
    logger.info(f"Bot started. Webhook URL: {WEBHOOK_URL}")
    
    # Отправка сообщения администраторам о запуске
    for admin_id in ADMIN_IDS:
        try:
            await bot.send_message(admin_id, "✅ Бот запущен и готов к работе!")
        except Exception as e:
            logger.error(f"Failed to send startup message to admin {admin_id}: {e}")


async def on_shutdown(bot: Bot) -> None:
    """Действия при остановке бота"""
    await bot.delete_webhook()
    logger.info("Bot stopped")


def main():
    """Главная функция запуска бота"""
    if not BOT_TOKEN:
        logger.error("BOT_TOKEN не установлен! Установите переменную окружения BOT_TOKEN.")
        sys.exit(1)
    
    if not ADMIN_IDS:
        logger.warning("ADMIN_IDS пуст! Добавьте ID администраторов в config.py")
    
    # Инициализация бота и диспетчера
    bot = Bot(token=BOT_TOKEN)
    dp = Dispatcher(storage=MemoryStorage())
    
    # Регистрация роутеров
    dp.include_router(admin.router)
    
    # Настройка вебхука
    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)
    
    # Создание приложения aiohttp
    app = web.Application()
    
    # Установка экземпляра бота для вебхука
    webhook.set_bot(bot)
    
    # Настройка маршрутов вебхука для приёма заявок
    webhook.setup_webhook_routes(app)
    
    # Настройка обработчика вебхука для Telegram
    webhook_requests_handler = SimpleRequestHandler(
        dispatcher=dp,
        bot=bot,
    )
    webhook_requests_handler.register(app, path=WEBHOOK_PATH)
    
    # Настройка приложения
    setup_application(app, dp, bot=bot)
    
    # Запуск сервера
    logger.info(f"Starting webhook server on {WEBHOOK_LISTEN}:{WEBHOOK_PORT_LISTEN}")
    web.run_app(app, host=WEBHOOK_LISTEN, port=WEBHOOK_PORT_LISTEN)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)

