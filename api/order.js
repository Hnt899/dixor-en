// api/order.js

const BOT_API_URL = process.env.BOT_API_URL;

async function handler(req, res) {
  // Для проверки через браузер: GET /api/order
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'order API is alive',
      hasBotUrl: !!BOT_API_URL,
    });
  }

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

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Поля name и phone обязательны',
      });
    }

    console.log('[api/order] new request:', {
      name,
      phone,
      email,
      budget,
      description,
    });

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
        comment: description || undefined,  // описание → comment
      }),
    });

    const raw = await upstreamRes.text();
    let upstreamJson = {};

    try {
      upstreamJson = raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error('[api/order] upstream not JSON:', raw);
      return res.status(500).json({
        success: false,
        error: 'Некорректный ответ от бота',
      });
    }

    if (!upstreamRes.ok || upstreamJson.success === false) {
      console.error('[api/order] upstream error:', upstreamJson);
      return res.status(500).json({
        success: false,
        error:
          upstreamJson.error ||
          `Ошибка при запросе к боту (status ${upstreamRes.status})`,
      });
    }

    return res.status(200).json(upstreamJson);
  } catch (err) {
    console.error('Error in /api/order:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Внутренняя ошибка сервера',
    });
  }
}

// 👇 вот это главное
module.exports = handler;       // для CommonJS
module.exports.default = handler; // чтобы Vercel увидел default-export
