import { LoginClient } from "./LoginClient";

type LoginPageProps = {
  searchParams: Promise<{
    signup?: string;
    redirect?: string;
    error?: string;
    plan?: string;
  }>;
};

/** Force dynamic so query params (signup, redirect, error) are always fresh on navigation. */
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const sp = await searchParams;

  return (
    <LoginClient
      initialSignup={sp.signup === "true"}
      initialRedirect={sp.redirect ?? null}
      initialError={sp.error ?? null}
    />
  );
}
