// Firestore security rules tests (PLAN.md "Testing"), run against the emulator:
//   npm run test:rules
// The emulator uses a demo- project ID, so nothing here can touch a real project.
import { readFileSync } from "node:fs";
import {
  assertFails,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";

const ADMIN_EMAIL = "admin@example.com";

let env: RulesTestEnvironment;

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-tamir-bakery",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});

afterAll(async () => {
  await env?.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  // Seed data the way the Admin SDK will, bypassing the rules.
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, "admins", ADMIN_EMAIL), { addedBy: "seed" });
    await setDoc(doc(db, "products", "challah"), { name: { he: "חלה", en: "Challah" }, price: 30 });
    await setDoc(doc(db, "orders", "order-1"), { phone: "0500000000", total: 30 });
    await setDoc(doc(db, "settings", "global"), { pickup: true });
  });
});

// Every caller the browser can be. The server uses the Admin SDK, which skips the rules.
const callers = {
  anonymous: () => env.unauthenticatedContext().firestore(),
  "signed-in non-admin": () =>
    env.authenticatedContext("user-1", { email: "someone@example.com", email_verified: true }).firestore(),
  "admin with unverified email": () =>
    env.authenticatedContext("user-2", { email: ADMIN_EMAIL, email_verified: false }).firestore(),
  "verified admin": () =>
    env.authenticatedContext("user-3", { email: ADMIN_EMAIL, email_verified: true }).firestore(),
};

const paths = ["admins/" + ADMIN_EMAIL, "products/challah", "orders/order-1", "settings/global"];

// Rules are deny-all until the data model exists (PLAN.md checklist item 2).
// When a path opens (e.g. public read of products), change its expectations here first.
describe("locked-down rules", () => {
  for (const [who, db] of Object.entries(callers)) {
    describe(who, () => {
      for (const path of paths) {
        it(`cannot read ${path}`, async () => {
          await assertFails(getDoc(doc(db(), path)));
        });
        it(`cannot write ${path}`, async () => {
          await assertFails(setDoc(doc(db(), path), { hacked: true }));
        });
        it(`cannot delete ${path}`, async () => {
          await assertFails(deleteDoc(doc(db(), path)));
        });
      }
      it("cannot list orders", async () => {
        await assertFails(getDocs(collection(db(), "orders")));
      });
      it("cannot create a new order directly", async () => {
        await assertFails(setDoc(doc(db(), "orders/new-order"), { total: 1 }));
      });
    });
  }
});
