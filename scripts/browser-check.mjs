import { writeFile } from "node:fs/promises";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3010";
const devtoolsUrl = process.env.DEVTOOLS_URL || "http://127.0.0.1:9223";
const password = process.env.SITE_PASSWORD;

if (!password) throw new Error("SITE_PASSWORD is required");

const pages = await fetch(`${devtoolsUrl}/json/list`).then((response) =>
  response.json(),
);
const page = pages.find((item) => item.type === "page");
if (!page) throw new Error("no browser page found");

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let commandId = 0;

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(String(event.data));
  if (!message.id) return;
  const handler = pending.get(message.id);
  if (!handler) return;
  pending.delete(message.id);
  if (message.error) handler.reject(new Error(message.error.message));
  else handler.resolve(message.result);
});

function command(method, params = {}) {
  commandId += 1;
  const id = commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text);
  }
  return result.result.value;
}

async function waitFor(selector) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (await evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`timed out waiting for ${selector}`);
}

async function screenshot(path) {
  const result = await command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(path, Buffer.from(result.data, "base64"));
}

await command("Page.enable");
await command("Network.enable");
await command("Emulation.setDeviceMetricsOverride", {
  width: 1280,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await command("Page.navigate", { url: `${baseUrl}/login` });
await waitFor("form");
await evaluate(`
  fetch("/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ password: ${JSON.stringify(password)}, next: "/" })
  }).then((response) => {
    if (!response.ok) throw new Error("login failed");
    return response.json();
  })
`);
await command("Page.navigate", { url: `${baseUrl}/` });
await waitFor(".hero-phone");

const desktop = await evaluate(`({
  title: document.title,
  heading: document.querySelector("h1")?.textContent,
  jobs: document.querySelectorAll(".hero-phone-jobs button").length,
  phone: document.querySelector(".hero-phone-header strong")?.textContent,
  quotes: document.querySelectorAll(".quote-row").length,
  grid: getComputedStyle(document.querySelector(".hero")).gridTemplateColumns,
  overflow: document.documentElement.scrollWidth <= window.innerWidth
})`);

if (desktop.title !== "Teradata x SpaceXAI") throw new Error("wrong title");
if (desktop.jobs !== 8) throw new Error(`expected 8 jobs, found ${desktop.jobs}`);
if (desktop.quotes !== 6) {
  throw new Error(`expected 6 quotes, found ${desktop.quotes}`);
}
if (!desktop.grid.includes(" ")) throw new Error("desktop hero is not two columns");
if (!desktop.overflow) throw new Error("desktop page overflows horizontally");
await evaluate(
  'document.querySelector(".hero-phone").scrollIntoView({ block: "center" })',
);
await new Promise((resolve) => setTimeout(resolve, 1200));
await screenshot("/tmp/teradata-hero-desktop.png");
await evaluate(
  'document.querySelector(".quotes").scrollIntoView({ block: "start" })',
);
await new Promise((resolve) => setTimeout(resolve, 120));
await screenshot("/tmp/teradata-quotes-desktop.png");

await evaluate('document.querySelectorAll(".hero-phone-jobs button")[1].click()');
await new Promise((resolve) => setTimeout(resolve, 120));
const selected = await evaluate(
  'document.querySelector(".hero-phone-header strong")?.textContent',
);
if (selected !== "Answer Agent") throw new Error("job pills do not update the phone");

await command("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await new Promise((resolve) => setTimeout(resolve, 150));
const mobile = await evaluate(`({
  grid: getComputedStyle(document.querySelector(".hero")).gridTemplateColumns,
  phoneWidth: document.querySelector(".hero-phone").getBoundingClientRect().width,
  overflow: document.documentElement.scrollWidth <= window.innerWidth
})`);
if (mobile.grid.includes(" ")) throw new Error("mobile hero did not stack");
if (mobile.phoneWidth > 390) throw new Error("phone is wider than the mobile viewport");
if (!mobile.overflow) throw new Error("mobile page overflows horizontally");
await evaluate(
  'document.querySelector(".hero-phone").scrollIntoView({ block: "center" })',
);
await new Promise((resolve) => setTimeout(resolve, 120));
await screenshot("/tmp/teradata-hero-mobile.png");

socket.close();
console.log(JSON.stringify({ desktop, selected, mobile }, null, 2));
