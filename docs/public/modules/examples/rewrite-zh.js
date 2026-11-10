// Clash 模块示例二：响应脚本
// 把测试页上 id="status" 那一行换成 argument 传进来的文字。
const text = typeof $argument === "string" && $argument.trim() ? $argument.trim() : "已改写";
const body = $response.body;

if (typeof body !== "string") {
  // 没有写 requires-body=true 时，拿不到正文。
  console.log("没有拿到正文，检查 requires-body");
  $done({});
} else {
  const safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const changed = body.replace(/(<p id="status">)[\s\S]*?(<\/p>)/, (_, open, close) => open + safe + close);
  console.log(changed === body ? "没有找到要改的那一行" : "已改写 " + $request.url);
  $done({ body: changed });
}
