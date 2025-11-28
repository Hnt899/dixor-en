// api/order.ts
// @ts-nocheck

export default function handler(req: any, res: any) {
    console.log("[api/order] simple test handler, method =", req.method);
  
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: true,
        method: req.method,
        test: "order api is alive",
      })
    );
  }
  