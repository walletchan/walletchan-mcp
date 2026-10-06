import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import test from "node:test";
import { resolveRpcEntrypoint } from "../src/rpcEntrypoint.js";

test("managed RPC resolves and starts the installed published CLI without a sibling checkout", () => {
  const require = createRequire(import.meta.url);
  const expected = join(dirname(require.resolve("@walletchan/rpc/package.json")), "dist", "index.js");
  const entrypoint = resolveRpcEntrypoint();
  assert.deepEqual(entrypoint, { command: process.execPath, baseArgs: [expected] });
  const help = execFileSync(entrypoint.command, [...entrypoint.baseArgs, "--help"], { encoding: "utf8", timeout: 15000 });
  assert.match(help, /walletchan-rpc/);
  assert.match(help, /--wallet-transport/);
});
