from aiogram.fsm.state import State, StatesGroup


class CancelOrderStates(StatesGroup):
    waiting_for_reason = State()
