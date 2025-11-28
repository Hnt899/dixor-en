// api/order.ts
// @ts-nocheck  // чтобы TS не мешался в серверной функции

const BOT_API_URL = process.env.BOT_API_URL;

export default async function handler(req: any, res: any) {
  console.log("[api/order] handler called. Method:", req.method);

  try {
    // Разрешаем только POST
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: "Method not allowed" }));
      return;
    }

    // Проверяем наличие BOT_API_URL
    if (!BOT_API_URL) {
      console.error("[api/order] BOT_API_URL is not configured");
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error: "BOT_API_URL is not configured on server",
        })
      );
      return;
    }

    // Тело запроса: у Vercel иногда уже есть req.body, а иногда нужно читать поток
    let body: any = req.body;

    if (!body || typeof body !== "object") {
      // читаем сырое тело как строку
      const chunks: Uint8Array[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const rawBody = Buffer.concat(chunks).toString("utf8");

      try {
        body = rawBody ? JSON.parse(rawBody) : {};
      } catch (e) {
        console.error("[api/order] Failed to parse JSON body:", rawBody);
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            success: false,
            error: "Invalid JSON in request body",
          })
        );
        return;
      }
    }

    const { name, phone, email, budget, description } = body || {};

    if (!name || !phone) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error: "Поля name и phone обязательны",
        })
      );
      return;
    }

    console.log("[api/order] new request:", {
      name,
      phone,
      email,
      budget,
      description,
    });

    // Отправляем данные в Python-бота (ngrok /new_order)
    const upstreamRes = await fetch(BOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email: email || undefined,         // опционально
        budget: budget || undefined,       // опционально
        comment: description || undefined, // описание → comment
      }),
    });

    const raw = await upstreamRes.text();
    let upstreamJson: any = {};

    try {
      upstreamJson = raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("[api/order] upstream not JSON:", raw);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error: "Некорректный ответ от бота",
        })
      );
      return;
    }

    if (!upstreamRes.ok || upstreamJson.success === false) {
      console.error("[api/order] upstream error:", upstreamJson);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error:
            upstreamJson.error ||
            `Ошибка при запросе к боту (status ${upstreamRes.status})`,
        })
      );
      return;
    }

    // Всё ок → отдаём JSON дальше на фронт
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(upstreamJson));
  } catch (err: any) {
    console.error("Error in /api/order:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: false,
        error: err?.message || "Внутренняя ошибка сервера",
      })
    );
  }
}
