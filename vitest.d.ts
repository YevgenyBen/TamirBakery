import "vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

// vitest-axe still augments the old global `Vi` namespace; register its matcher types with Vitest.
declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
  interface Assertion<T = unknown> extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
