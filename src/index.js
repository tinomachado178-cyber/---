import { createReadStream, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ASSETS_DIR = fileURLToPath(new URL("../assets/", import.meta.url));
const ROUTE_PREFIXES = [
  "/plugins/dsh-liang-rheostat-skin/assets",
  "/liang-rheostat",
];

export const name = "liang-rheostat-skin";
export const inject = ["webServer"];

export function apply(ctx) {
  ctx.effect(
    () => {
      const unregister = ROUTE_PREFIXES.map((path) =>
        ctx.webServer.register({
          kind: "prefix",
          path,
          handler: serveAsset,
        }),
      );
      return () => {
        for (const dispose of unregister) dispose();
      };
    },
    "liang-rheostat-skin: asset route",
  );
}

function fileFromPath(pathname) {
  for (const prefix of ROUTE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length + 1);
    }
  }
  return null;
}

function serveAsset(req, res) {
  const method = req.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return;
  }
  let pathname;
  try {
    pathname = new URL(req.url ?? "/", "http://dsh.local").pathname;
  } catch {
    res.writeHead(404).end();
    return;
  }
  const file = fileFromPath(pathname);
  if (!file || !/^frames\/frame_\d{2}\.jpg$/.test(file)) {
    res.writeHead(404).end();
    return;
  }
  const path = join(ASSETS_DIR, file);
  let stat;
  try {
    stat = statSync(path);
    if (!stat.isFile()) throw new Error("not a file");
  } catch {
    res.writeHead(404).end();
    return;
  }
  const headers = {
    "Content-Type": "image/jpeg",
    "Content-Length": String(stat.size),
    "Cache-Control": "public, max-age=86400",
    "X-Content-Type-Options": "nosniff",
  };
  if (method === "HEAD") {
    res.writeHead(200, headers);
    res.end();
    return;
  }
  res.writeHead(200, headers);
  createReadStream(path).pipe(res);
}
