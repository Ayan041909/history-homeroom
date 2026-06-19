import { NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_NEWSLETTER_LIST_ID;

  if (!apiKey || !listId) {
    return NextResponse.json(
      { error: "Newsletter is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let email: string;
  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const parsedListId = Number(listId);
  if (!Number.isFinite(parsedListId)) {
    return NextResponse.json(
      { error: "Newsletter list is misconfigured." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [parsedListId],
        updateEnabled: true,
      }),
    });

    // 201 = created, 204 = updated (already subscribed)
    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ ok: true });
    }

    const payload = (await res.json().catch(() => null)) as { message?: string } | null;
    const message = payload?.message ?? "Could not subscribe right now.";

    if (res.status === 400 && message.toLowerCase().includes("already")) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    return NextResponse.json({ error: message }, { status: res.status >= 500 ? 502 : 400 });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the newsletter service. Please try again." },
      { status: 502 },
    );
  }
}
