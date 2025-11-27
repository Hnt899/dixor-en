import sqlite3
import random
import string
from typing import Optional, List, Dict
from enum import Enum

from config import DB_PATH


class OrderStatus(Enum):
    PENDING = "pending"          # Ожидает принятия
    IN_WORK_ORANGE = "in_work_orange"  # В работе (оранжевый)
    IN_WORK_GREEN = "in_work_green"    # В работе (зелёный)
    COMPLETED = "completed"      # Выполнен
    CANCELLED = "cancelled"      # Отменён


class Database:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.init_db()

    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_number TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                email TEXT,
                phone TEXT NOT NULL,
                budget TEXT,
                comment TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                cancellation_reason TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        conn.commit()
        conn.close()

    def generate_order_number(self) -> str:
        while True:
            order_number = "".join(random.choices(string.digits, k=5))
            if not self.order_exists(order_number):
                return order_number

    def order_exists(self, order_number: str) -> bool:
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM orders WHERE order_number = ?", (order_number,))
        exists = cursor.fetchone() is not None
        conn.close()
        return exists

    def create_order(
        self,
        name: str,
        phone: str,
        email: Optional[str] = None,
        comment: Optional[str] = None,
        budget: Optional[str] = None,
    ) -> str:
        conn = self.get_connection()
        cursor = conn.cursor()

        order_number = self.generate_order_number()

        cursor.execute(
            """
            INSERT INTO orders (order_number, name, email, phone, budget, comment, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                order_number,
                name,
                email or None,
                phone,
                budget or None,
                comment or None,
                OrderStatus.PENDING.value,
            ),
        )

        conn.commit()
        conn.close()
        return order_number

    def get_order(self, order_number: str) -> Optional[Dict]:
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM orders WHERE order_number = ?", (order_number,))
        row = cursor.fetchone()
        conn.close()

        if row:
            return dict(row)
        return None

    def get_orders_by_status(self, status: OrderStatus) -> List[Dict]:
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT * FROM orders
            WHERE status = ?
            ORDER BY created_at DESC
            """,
            (status.value,),
        )
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]

    def update_order_status(
        self,
        order_number: str,
        status: OrderStatus,
        cancellation_reason: Optional[str] = None,
    ) -> None:
        conn = self.get_connection()
        cursor = conn.cursor()

        if cancellation_reason:
            cursor.execute(
                """
                UPDATE orders
                SET status = ?, cancellation_reason = ?, updated_at = CURRENT_TIMESTAMP
                WHERE order_number = ?
                """,
                (status.value, cancellation_reason, order_number),
            )
        else:
            cursor.execute(
                """
                UPDATE orders
                SET status = ?, updated_at = CURRENT_TIMESTAMP
                WHERE order_number = ?
                """,
                (status.value, order_number),
            )

        conn.commit()
        conn.close()

    def get_all_pending_orders(self) -> List[Dict]:
        return self.get_orders_by_status(OrderStatus.PENDING)

    def get_all_in_work_orders(self) -> List[Dict]:
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT * FROM orders
            WHERE status IN (?, ?)
            ORDER BY created_at DESC
            """,
            (OrderStatus.IN_WORK_ORANGE.value, OrderStatus.IN_WORK_GREEN.value),
        )
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]

    def get_all_history_orders(self) -> List[Dict]:
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT * FROM orders
            WHERE status IN (?, ?)
            ORDER BY created_at DESC
            """,
            (OrderStatus.COMPLETED.value, OrderStatus.CANCELLED.value),
        )
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
