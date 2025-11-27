from aiohttp import web
from aiogram import Bot

from database import Database
from config import ADMIN_IDS

bot: Bot | None = None
db = Database()


def set_bot(new_bot: Bot) -> None:
    global bot
    bot = new_bot


async def handle_new_order(request: web.Request) -> web.Response:
    if bot is None:
        return web.json_response(
            {"success": False, "error": "Bot is not initialized"},
            status=500,
        )

    try:
        data = await request.json()
    except Exception:
        return web.json_response(
            {"success": False, "error": "Invalid JSON"},
            status=400,
        )

    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    comment = data.get("comment")
    budget = data.get("budget")

    if not name or not phone:
        return web.json_response(
            {"success": False, "error": "Missing required fields: name, phone"},
            status=400,
        )

    order_number = db.create_order(
        name=name,
        phone=phone,
        email=email,
        comment=comment,
        budget=budget,
    )

    lines = [
        f"🆕 Новый заказ №{order_number}",
        "",
        f"👤 Имя: {name}",
        f"📞 Телефон: {phone}",
    ]

    if email:
        lines.append(f"📧 Почта: {email}")

    if budget:
        lines.append(f"💰 Бюджет: {budget}")

    if comment:
        lines.append(f"💬 Комментарий: {comment}")

    lines.append("")
    lines.append(f"🔢 Номер заказа: {order_number}")

    text = "\n".join(lines)

    for admin_id in ADMIN_IDS:
        try:
            await bot.send_message(admin_id, text)
        except Exception:
            pass

    return web.json_response(
        {"success": True, "order_number": order_number},
        status=200,
    )


def setup_webhook_routes(app: web.Application) -> None:
    app.router.add_post("/new_order", handle_new_order)
