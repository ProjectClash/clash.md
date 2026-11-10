// Clash module example 3: a panel script
// Reads the count and time the scheduled script stored, and shows them in the module's Panels.
const count = $persistentStore.read("clash-example.count");
const last = $persistentStore.read("clash-example.last");

$done({
  title: "Reminder",
  content: count ? "Ran " + count + " times\nLast: " + last : "Hasn't run yet",
});
