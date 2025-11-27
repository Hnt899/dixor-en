// api/order.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_API_URL =
  process.env.BOT_APT_URL || // твой текущий секрет с опечаткой
  process.env.BOT_API_URL;   // на будущее, если переименуешь

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  if (!BOT_API_URL) {
    console.error('BOT_API_URL (или BOT_APT_URL) не задан в переменных окружения');
    return res.status(500).json({
      success: false,
      error: 'Сервер не настроен (BOT_API_URL отсутствует)',
    });
  }

  try {
    const { name, phone, email, budget, description } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Поля name и phone обязательны',
      });
    }

    // Прокидываем данные в твоего Python-бота
    const upstreamResponse = await fetch(BOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email: email || undefined,
        budget: budget || undefined,
        comment: description || undefined, // description -> comment
      }),
    });

    const upstreamJson = await upstreamResponse.json().catch(() => ({}));

    if (!upstreamResponse.ok || upstreamJson.success === false) {
      console.error('Bot upstream error:', upstreamJson);
      return res.status(500).json({
        success: false,
        error:
          upstreamJson.error ||
          `Ошибка при запросе к боту (status ${upstreamResponse.status})`,
      });
    }

    return res.status(200).json(upstreamJson);
  } catch (err: any) {
    console.error('Error in /api/order:', err);
    return res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера',
    });
  }
}
