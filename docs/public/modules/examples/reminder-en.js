// Clash module example 3: a scheduled script
// Each run stores the count and time, posts a notification, and writes a log line.
const count = Number($persistentStore.read("clash-example.count") || 0) + 1;
const time = new Date().toLocaleString("en-US", { hour12: false });

$persistentStore.write(String(count), "clash-example.count");
$persistentStore.write(time, "clash-example.last");
$notification.post("Reminder", "", "Run " + count + " at " + time);
console.log("Run " + count);
$done();
