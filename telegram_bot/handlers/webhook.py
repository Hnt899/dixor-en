from aiohttp import web
from aiogram import Bot
import json
import logging

from config import ADMIN_IDS
from database import Database

logger = logging.getLogger(__name__)
db = Database()

# Глобальная переменная для бота (будет установлена при инициализации)
bot_instance: Bot = None


def set_bot(bot: Bot):
    """Установить экземпляр бота"""
    global bot_instance
    bot_instance = bot


async def handle_new_order(request: web.Request) -> web.Response:
    """Обработка новой заявки с сайта"""
    try:
        data = await request.json()
        
        # Проверка обязательных полей
        name = data.get("name")
        phone = data.get("phone")
        
        if not name or not phone:
            return web.json_response(
                {"error": "Missing required fields: name, phone"},
                status=400
            )
        
        email = data.get("email", "")
        comment = data.get("comment", "")
        
        # Создание заказа
        order_number = db.create_order(
            name=name,
            phone=phone,
            email=email if email else None,
            comment=comment if comment else None
        )
        
        # Отправка уведомления администраторам
        order = db.get_order(order_number)
        message_text = (
            f"🆕 Новый заказ!\n\n"
            f"📋 Заказ №{order_number}\n"
            f"👤 Имя: {name}\n"
            f"📞 Телефон: {phone}\n"
        )
        
        if email:
            message_text += f"📧 Почта: {email}\n"
        
        if comment:
            message_text += f"💬 Комментарий: {comment}\n"
        
        # Отправка всем администраторам
        if bot_instance:
            for admin_id in ADMIN_IDS:
                try:
                    await bot_instance.send_message(admin_id, message_text)
                except Exception as e:
                    logger.error(f"Failed to send message to admin {admin_id}: {e}")
        
        return web.json_response({
            "success": True,
            "order_number": order_number
        })
    
    except json.JSONDecodeError:
        return web.json_response(
            {"error": "Invalid JSON"},
            status=400
        )
    except Exception as e:
        logger.error(f"Error processing new order: {e}")
        return web.json_response(
            {"error": "Internal server error"},
            status=500
        )


def setup_webhook_routes(app: web.Application):
    """Настройка маршрутов вебхука"""
    app.router.add_post("/new_order", handle_new_order)

