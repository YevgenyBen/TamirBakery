import { defineConfig } from "vitest/config";

// Security rules tests run in Node against the Firestore emulator.
// Use `npm run test:rules`, which starts the emulator around this run.
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/rules/**/*.test.ts"],
    testTimeout: 15_000,
    hookTimeout: 30_000,
  },
});
