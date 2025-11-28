// api/order.ts
// @ts-nocheck

export default function handler(req: any, res: any) {
    try {
      // Просто тестовый ответ, без fetch, без env, без логики
      res.status(200).json({
        success: true,
        method: req.method,
        test: 'order api is alive',
      });
    } catch (err: any) {
      // На всякий случай лог + аккуратный ответ
      console.error('order.ts error:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Server error in order.ts',
      });
    }
  }
  