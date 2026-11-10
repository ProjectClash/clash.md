// Clash module example 2: a response script
// Replaces the line with id="status" on the test page with the text given in argument.
const text = typeof $argument === "string" && $argument.trim() ? $argument.trim() : "Rewritten";
const body = $response.body;

if (typeof body !== "string") {
  // Without requires-body=true, the script gets no body.
  console.log("No body; check requires-body");
  $done({});
} else {
  const safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const changed = body.replace(/(<p id="status">)[\s\S]*?(<\/p>)/, (_, open, close) => open + safe + close);
  console.log(changed === body ? "The line to change was not found" : "Rewrote " + $request.url);
  $done({ body: changed });
}
