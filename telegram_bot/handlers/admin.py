from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext

from config import ADMIN_IDS
from database import Database, OrderStatus
from states import CancelOrderStates

router = Router()
db = Database()


def is_admin(user_id: int) -> bool:
    """Проверка, является ли пользователь администратором"""
    return user_id in ADMIN_IDS


def format_order_info(order: dict) -> str:
    """Форматирование информации о заказе"""
    text = f"📋 Заказ №{order['order_number']}\n\n"
    text += f"👤 Имя: {order['name']}\n"
    text += f"📞 Телефон: {order['phone']}\n"
    
    if order.get('email'):
        text += f"📧 Почта: {order['email']}\n"
    
    if order.get('comment'):
        text += f"💬 Комментарий: {order['comment']}\n"
    
    text += f"\n🔢 Номер заказа: {order['order_number']}"
    
    if order['status'] == OrderStatus.CANCELLED.value and order.get('cancellation_reason'):
        text += f"\n\n❌ Причина отмены: {order['cancellation_reason']}"
    
    return text


def get_status_emoji(status: str) -> str:
    """Получить эмодзи для статуса"""
    if status == OrderStatus.IN_WORK_ORANGE.value:
        return "🟠"
    elif status == OrderStatus.IN_WORK_GREEN.value:
        return "🟢"
    elif status == OrderStatus.COMPLETED.value:
        return "🟢"
    elif status == OrderStatus.CANCELLED.value:
        return "🔴"
    return ""


@router.message(Command("start"))
async def cmd_start(message: Message):
    """Обработка команды /start"""
    if not is_admin(message.from_user.id):
        await message.answer("❌ У вас нет доступа к этому боту.")
        return
    
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🕒 Заказы ожидающие принятия", callback_data="menu_pending")],
        [InlineKeyboardButton(text="🔧 Заказы в работе", callback_data="menu_in_work")],
        [InlineKeyboardButton(text="📚 История заказов", callback_data="menu_history")]
    ])
    
    await message.answer(
        "👋 Добро пожаловать в панель управления заказами!\n\n"
        "Выберите раздел:",
        reply_markup=keyboard
    )


@router.callback_query(F.data == "menu_main")
async def show_main_menu(callback: CallbackQuery):
    """Показать главное меню"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🕒 Заказы ожидающие принятия", callback_data="menu_pending")],
        [InlineKeyboardButton(text="🔧 Заказы в работе", callback_data="menu_in_work")],
        [InlineKeyboardButton(text="📚 История заказов", callback_data="menu_history")]
    ])
    
    await callback.message.edit_text(
        "👋 Добро пожаловать в панель управления заказами!\n\n"
        "Выберите раздел:",
        reply_markup=keyboard
    )
    await callback.answer()


@router.callback_query(F.data == "menu_pending")
async def show_pending_orders(callback: CallbackQuery):
    """Показать заказы ожидающие принятия"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    orders = db.get_all_pending_orders()
    
    if not orders:
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")]
        ])
        await callback.message.edit_text(
            "🕒 Нет заказов ожидающих принятия.",
            reply_markup=keyboard
        )
        await callback.answer()
        return
    
    keyboard_buttons = []
    for order in orders:
        button_text = f"{order['name']} – №{order['order_number']}"
        keyboard_buttons.append([
            InlineKeyboardButton(text=button_text, callback_data=f"order_{order['order_number']}")
        ])
    
    keyboard_buttons.append([InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")])
    keyboard = InlineKeyboardMarkup(inline_keyboard=keyboard_buttons)
    
    await callback.message.edit_text(
        "🕒 Заказы ожидающие принятия:",
        reply_markup=keyboard
    )
    await callback.answer()


@router.callback_query(F.data.startswith("order_"))
async def show_order_details(callback: CallbackQuery, state: FSMContext):
    """Показать детали заказа"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    order_number = callback.data.split("_")[1]
    order = db.get_order(order_number)
    
    if not order:
        await callback.answer("❌ Заказ не найден.", show_alert=True)
        return
    
    status = order['status']
    text = format_order_info(order)
    
    keyboard_buttons = []
    
    if status == OrderStatus.PENDING.value:
        # Заказ ожидает принятия
        keyboard_buttons = [
            [InlineKeyboardButton(text="✅ Принять", callback_data=f"accept_{order_number}")],
            [InlineKeyboardButton(text="⏸ Оставить", callback_data="menu_pending")],
            [InlineKeyboardButton(text="◀️ Назад", callback_data="menu_pending")]
        ]
    
    elif status == OrderStatus.IN_WORK_ORANGE.value:
        # Заказ в работе (оранжевый)
        keyboard_buttons = [
            [InlineKeyboardButton(text="⏸ Перенести в ожидание", callback_data=f"move_to_pending_{order_number}")],
            [InlineKeyboardButton(text="✅ Принять заказ", callback_data=f"accept_final_{order_number}")],
            [InlineKeyboardButton(text="❌ Отмена заказа", callback_data=f"cancel_{order_number}")],
            [InlineKeyboardButton(text="↩️ Отмена редактирования", callback_data="menu_in_work")]
        ]
    
    elif status == OrderStatus.IN_WORK_GREEN.value:
        # Заказ в работе (зелёный)
        keyboard_buttons = [
            [InlineKeyboardButton(text="⏸ Приостановить работу", callback_data=f"pause_{order_number}")],
            [InlineKeyboardButton(text="✅ Заказ выполнен", callback_data=f"complete_{order_number}")],
            [InlineKeyboardButton(text="❌ Отмена заказа", callback_data=f"cancel_{order_number}")],
            [InlineKeyboardButton(text="◀️ Назад", callback_data="menu_in_work")]
        ]
    
    elif status in [OrderStatus.COMPLETED.value, OrderStatus.CANCELLED.value]:
        # Заказ в истории
        keyboard_buttons = [
            [InlineKeyboardButton(text="✅ Закончить просмотр", callback_data="menu_history")]
        ]
    
    keyboard = InlineKeyboardMarkup(inline_keyboard=keyboard_buttons)
    await callback.message.edit_text(text, reply_markup=keyboard)
    await callback.answer()


@router.callback_query(F.data.startswith("accept_"))
async def accept_order(callback: CallbackQuery):
    """Принять заказ (перевести в работу)"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    order_number = callback.data.split("_", 1)[1]
    order = db.get_order(order_number)
    
    if not order:
        await callback.answer("❌ Заказ не найден.", show_alert=True)
        return
    
    if order['status'] == OrderStatus.PENDING.value:
        db.update_order_status(order_number, OrderStatus.IN_WORK_ORANGE)
        await callback.answer(f"✅ Заказ №{order_number} принят", show_alert=True)
        await show_in_work_orders(callback)
    else:
        await callback.answer("❌ Заказ уже обработан.", show_alert=True)


@router.callback_query(F.data.startswith("accept_final_"))
async def accept_final_order(callback: CallbackQuery):
    """Принять заказ окончательно (пометить зелёным)"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    order_number = callback.data.split("_", 2)[2]
    order = db.get_order(order_number)
    
    if not order:
        await callback.answer("❌ Заказ не найден.", show_alert=True)
        return
    
    db.update_order_status(order_number, OrderStatus.IN_WORK_GREEN)
    await callback.answer(f"✅ Заказ №{order_number} принят окончательно", show_alert=True)
    await show_main_menu(callback)


@router.callback_query(F.data.startswith("move_to_pending_"))
async def move_to_pending(callback: CallbackQuery):
    """Перенести заказ в ожидание"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    order_number = callback.data.split("_", 3)[3]
    order = db.get_order(order_number)
    
    if not order:
        await callback.answer("❌ Заказ не найден.", show_alert=True)
        return
    
    db.update_order_status(order_number, OrderStatus.PENDING)
    await callback.answer(f"✅ Заказ №{order_number} перенесён в ожидание", show_alert=True)
    await show_pending_orders(callback)


@router.callback_query(F.data.startswith("pause_"))
async def pause_order(callback: CallbackQuery):
    """Приостановить работу над заказом"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    order_number = callback.data.split("_")[1]
    order = db.get_order(order_number)
    
    if not order:
        await callback.answer("❌ Заказ не найден.", show_alert=True)
        return
    
    db.update_order_status(order_number, OrderStatus.IN_WORK_ORANGE)
    await callback.answer(f"⏸ Заказ №{order_number} приостановлен", show_alert=True)
    await show_main_menu(callback)


@router.callback_query(F.data.startswith("complete_"))
async def complete_order(callback: CallbackQuery):
    """Пометить заказ как выполненный"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    order_number = callback.data.split("_")[1]
    order = db.get_order(order_number)
    
    if not order:
        await callback.answer("❌ Заказ не найден.", show_alert=True)
        return
    
    db.update_order_status(order_number, OrderStatus.COMPLETED)
    await callback.answer(f"✅ Заказ №{order_number} выполнен", show_alert=True)
    await show_history_orders(callback)


@router.callback_query(F.data.startswith("cancel_"))
async def cancel_order_start(callback: CallbackQuery, state: FSMContext):
    """Начать процесс отмены заказа"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    order_number = callback.data.split("_")[1]
    order = db.get_order(order_number)
    
    if not order:
        await callback.answer("❌ Заказ не найден.", show_alert=True)
        return
    
    await state.update_data(order_number=order_number)
    await state.set_state(CancelOrderStates.waiting_for_reason)
    
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="❌ Отменить отмену", callback_data=f"order_{order_number}")]
    ])
    
    await callback.message.edit_text(
        f"❌ Отмена заказа №{order_number}\n\n"
        "Пожалуйста, введите причину отмены:",
        reply_markup=keyboard
    )
    await callback.answer()


@router.message(CancelOrderStates.waiting_for_reason)
async def cancel_order_reason(message: Message, state: FSMContext):
    """Обработать причину отмены заказа"""
    if not is_admin(message.from_user.id):
        await message.answer("❌ У вас нет доступа.")
        await state.clear()
        return
    
    data = await state.get_data()
    order_number = data.get("order_number")
    
    if not order_number:
        await message.answer("❌ Ошибка: номер заказа не найден.")
        await state.clear()
        return
    
    reason = message.text
    db.update_order_status(order_number, OrderStatus.CANCELLED, cancellation_reason=reason)
    
    await message.answer(f"✅ Заказ №{order_number} отменён. Причина: {reason}")
    await state.clear()
    
    # Показать историю заказов
    await show_history_orders_message(message)


@router.callback_query(F.data == "menu_in_work")
async def show_in_work_orders(callback: CallbackQuery):
    """Показать заказы в работе"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    orders = db.get_all_in_work_orders()
    
    if not orders:
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")]
        ])
        await callback.message.edit_text(
            "🔧 Нет заказов в работе.",
            reply_markup=keyboard
        )
        await callback.answer()
        return
    
    keyboard_buttons = []
    for order in orders:
        emoji = get_status_emoji(order['status'])
        button_text = f"{emoji} {order['name']} – №{order['order_number']}"
        keyboard_buttons.append([
            InlineKeyboardButton(text=button_text, callback_data=f"order_{order['order_number']}")
        ])
    
    keyboard_buttons.append([InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")])
    keyboard = InlineKeyboardMarkup(inline_keyboard=keyboard_buttons)
    
    await callback.message.edit_text(
        "🔧 Заказы в работе:",
        reply_markup=keyboard
    )
    await callback.answer()


@router.callback_query(F.data == "menu_history")
async def show_history_orders(callback: CallbackQuery):
    """Показать историю заказов"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ У вас нет доступа.", show_alert=True)
        return
    
    orders = db.get_all_history_orders()
    
    if not orders:
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")]
        ])
        await callback.message.edit_text(
            "📚 История заказов пуста.",
            reply_markup=keyboard
        )
        await callback.answer()
        return
    
    keyboard_buttons = []
    for order in orders:
        emoji = get_status_emoji(order['status'])
        button_text = f"{emoji} {order['name']} – №{order['order_number']}"
        keyboard_buttons.append([
            InlineKeyboardButton(text=button_text, callback_data=f"order_{order['order_number']}")
        ])
    
    keyboard_buttons.append([InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")])
    keyboard = InlineKeyboardMarkup(inline_keyboard=keyboard_buttons)
    
    await callback.message.edit_text(
        "📚 История заказов:\n\n"
        "🟢 — выполненные заказы\n"
        "🔴 — отменённые заказы",
        reply_markup=keyboard
    )
    await callback.answer()


async def show_history_orders_message(message: Message):
    """Показать историю заказов через сообщение"""
    orders = db.get_all_history_orders()
    
    if not orders:
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")]
        ])
        await message.answer(
            "📚 История заказов пуста.",
            reply_markup=keyboard
        )
        return
    
    keyboard_buttons = []
    for order in orders:
        emoji = get_status_emoji(order['status'])
        button_text = f"{emoji} {order['name']} – №{order['order_number']}"
        keyboard_buttons.append([
            InlineKeyboardButton(text=button_text, callback_data=f"order_{order['order_number']}")
        ])
    
    keyboard_buttons.append([InlineKeyboardButton(text="◀️ Назад", callback_data="menu_main")])
    keyboard = InlineKeyboardMarkup(inline_keyboard=keyboard_buttons)
    
    await message.answer(
        "📚 История заказов:\n\n"
        "🟢 — выполненные заказы\n"
        "🔴 — отменённые заказы",
        reply_markup=keyboard
    )

