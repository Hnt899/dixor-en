from aiogram.fsm.state import State, StatesGroup


class CancelOrderStates(StatesGroup):
    """Состояния для отмены заказа"""
    waiting_for_reason = State()

