// Clash 模块示例三：面板脚本
// 读出定时脚本存下的次数和时间，显示在模块详情的“面板”里。
const count = $persistentStore.read("clash-example.count");
const last = $persistentStore.read("clash-example.last");

$done({
  title: "定时提醒",
  content: count ? "已运行 " + count + " 次\n上次：" + last : "还没有运行过",
});
