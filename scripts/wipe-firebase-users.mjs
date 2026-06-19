/**
 * Deletes all Firebase Auth users and Firestore user data for History Homeroom.
 *
 * Requires a Firebase service account JSON file:
 *   1. Firebase Console → Project settings → Service accounts → Generate new private key
 *   2. Save the file as `service-account.json` in the project root (already gitignored)
 *   3. Run: npm run wipe-users
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import admin from "firebase-admin";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const serviceAccountPath = resolve(projectRoot, "service-account.json");

function loadProjectId() {
  const envPath = resolve(projectRoot, ".env.local");
  if (existsSync(envPath)) {
    const match = readFileSync(envPath, "utf8").match(/NEXT_PUBLIC_FIREBASE_PROJECT_ID=(.+)/);
    if (match?.[1]) return match[1].trim();
  }
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "history-homeroom-56f43";
}

function initAdmin() {
  if (admin.apps.length) return admin.app();

  if (!existsSync(serviceAccountPath)) {
    console.error("\nMissing service-account.json in the project root.");
    console.error("Download it from Firebase Console → Project settings → Service accounts → Generate new private key");
    console.error(`Expected path: ${serviceAccountPath}\n`);
    process.exit(1);
  }

  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: loadProjectId(),
  });
}

async function deleteCollection(db, name) {
  const snap = await db.collection(name).get();
  if (snap.empty) {
    console.log(`  ${name}: 0 documents`);
    return 0;
  }

  let deleted = 0;
  const batchSize = 400;
  let batch = db.batch();
  let ops = 0;

  for (const doc of snap.docs) {
    batch.delete(doc.ref);
    ops++;
    deleted++;
    if (ops >= batchSize) {
      await batch.commit();
      batch = db.batch();
      ops = 0;
    }
  }
  if (ops > 0) await batch.commit();
  console.log(`  ${name}: deleted ${deleted} document(s)`);
  return deleted;
}

async function deleteAllAuthUsers(auth) {
  let total = 0;
  let pageToken;

  do {
    const result = await auth.listUsers(1000, pageToken);
    if (result.users.length === 0) break;

    const uids = result.users.map((u) => u.uid);
    const deleteResult = await auth.deleteUsers(uids);
    total += deleteResult.successCount;

    if (deleteResult.failureCount > 0) {
      console.warn(`  Warning: ${deleteResult.failureCount} auth user(s) could not be deleted`);
    }

    pageToken = result.pageToken;
  } while (pageToken);

  console.log(`  auth: deleted ${total} user(s)`);
  return total;
}

async function main() {
  console.log("\nHistory Homeroom — wipe all user data\n");

  initAdmin();
  const auth = admin.auth();
  const db = admin.firestore();

  console.log("Deleting Firestore data…");
  await deleteCollection(db, "users");
  await deleteCollection(db, "progress");
  await deleteCollection(db, "badges");

  console.log("\nDeleting Firebase Auth accounts…");
  await deleteAllAuthUsers(auth);

  console.log("\nDone. Zero accounts and user documents remain in Firebase.");
  console.log("Also clear browser data: open /reset-data while signed in, or run clearAllLocalUserData() in DevTools.\n");
}

main().catch((err) => {
  console.error("\nWipe failed:", err.message ?? err);
  process.exit(1);
});
