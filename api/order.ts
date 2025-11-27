// api/order.ts
// @ts-nocheck  // отключаем придирки TypeScript в этом файле

const BOT_API_URL = process.env.BOT_API_URL;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  if (!BOT_API_URL) {
    console.error('BOT_API_URL is not configured');
    return res.status(500).json({
      success: false,
      error: 'BOT_API_URL is not configured on server',
    });
  }

  try {
    const { name, phone, email, budget, description } = req.body || {};

    // можно добавить простую проверку
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Поля name и phone обязательны',
      });
    }

    // шлём данные в твоего Python-бота (ngrok /new_order)
    const upstreamRes = await fetch(BOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email: email || undefined,          // опционально
        budget: budget || undefined,        // опционально
        comment: description || undefined,  // описание → comment для бота
      }),
    });

    const upstreamJson = await upstreamRes.json().catch(() => ({}));

    if (!upstreamRes.ok || upstreamJson.success === false) {
      console.error('Bot upstream error:', upstreamJson);
      return res.status(500).json({
        success: false,
        error:
          upstreamJson.error ||
          `Ошибка при запросе к боту (status ${upstreamRes.status})`,
      });
    }

    return res.status(200).json(upstreamJson);
  } catch (err: any) {
    console.error('Error in /api/order:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Внутренняя ошибка сервера',
    });
  }
}
