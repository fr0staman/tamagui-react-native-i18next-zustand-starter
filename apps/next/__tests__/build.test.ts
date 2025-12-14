import { type ChildProcess, exec } from "node:child_process";
import path from "node:path";

import { afterAll, expect, test } from "vitest";

let buildProcess: ChildProcess | null = null;

afterAll(() => {
  if (buildProcess?.pid) {
    try {
      process.kill(buildProcess.pid, 0); // Check if process exists
      process.kill(buildProcess.pid); // Kill the process if it exists
    } catch (error) {
      // Process doesn't exist or we don't have permission to kill it
      console.info("Process already terminated or cannot be killed.");
    }
  }
});

test("Next.js build completes", async () => {
  try {
    buildProcess = exec("yarn build", {
      cwd: path.resolve(__dirname, ".."),
    });

    const buildOutput = new Promise<string>((resolve, reject) => {
      let output = "";
      buildProcess?.stdout?.on("data", (data) => {
        output += data.toString();
      });
      buildProcess?.stderr?.on("data", (data) => {
        output += data.toString();
      });
      buildProcess?.on("close", (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(`Build process exited with code ${code}`));
        }
      });
    });

    const result = await buildOutput;

    // Check for yarn build output
    expect(result).toContain("built @my/config");
    expect(result).toContain("built @my/ui");

    // Check for Next.js version and build process
    expect(result).toContain("Next.js 16");
    expect(result).toContain("Creating an optimized production build");

    // Check for route information
    expect(result).toContain("Route (app)");
    expect(result).toContain("Route (pages)");

    // Check for specific route patterns
    expect(result).toContain("○ /");
    expect(result).toContain("○ /_not-found");
    expect(result).toContain("ƒ /[locale]/user/[id]");
    expect(result).toContain("/_app");
    expect(result).toContain("[locale]/pages-example");
    expect(result).toContain("[locale]/pages-example-user/[id]");

    // Check for static and dynamic route indicators
    expect(result).toContain("○  (Static)   prerendered as static content");
    expect(result).toContain("ƒ  (Dynamic)  server-rendered on demand");
  } finally {
    // The process kill check has been moved to the afterAll block
  }
}, 60_000);
