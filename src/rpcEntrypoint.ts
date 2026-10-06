import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

export function resolveRpcEntrypoint(): { command: string; baseArgs: string[] } {
  const require = createRequire(import.meta.url);
  let packageDir: string;
  try {
    packageDir = dirname(require.resolve("@walletchan/rpc/package.json"));
  } catch {
    throw new Error("Could not resolve @walletchan/rpc. Install this package's dependencies first.");
  }
  const entrypoint = join(packageDir, "dist", "index.js");
  if (!existsSync(entrypoint)) {
    throw new Error("Could not find @walletchan/rpc's built entrypoint. Install a published @walletchan/rpc package or build your linked RPC checkout first.");
  }
  return { command: process.execPath, baseArgs: [entrypoint] };
}
