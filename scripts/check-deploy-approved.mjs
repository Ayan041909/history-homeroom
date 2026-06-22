/**
 * Netlify "ignore" hook — controls whether a Git push triggers a build.
 *
 * Exit 0 → skip build (default)
 * Exit 1 → run build (only when NETLIFY_DEPLOY_APPROVED=true in Netlify env vars)
 *
 * To deploy: Netlify → Environment variables → set NETLIFY_DEPLOY_APPROVED=true
 *            → Trigger deploy → Clear cache and deploy site
 *            → set back to false (or delete) when done
 */
const approved = process.env.NETLIFY_DEPLOY_APPROVED === "true";
process.exit(approved ? 1 : 0);
