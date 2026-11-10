// Clash 模块示例三：定时运行的脚本
// 每次运行把次数和时间存起来，发一条通知，再写一行日志。
const count = Number($persistentStore.read("clash-example.count") || 0) + 1;
const time = new Date().toLocaleString("zh-CN", { hour12: false });

$persistentStore.write(String(count), "clash-example.count");
$persistentStore.write(time, "clash-example.last");
$notification.post("定时提醒", "", "第 " + count + " 次运行，" + time);
console.log("第 " + count + " 次运行");
$done();
