import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function redirectToContact(request: Request, status: "sent" | "error") {
  return NextResponse.redirect(new URL(`/contact?status=${status}`, request.url), 303);
}

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();

  if (readField(formData, "botcheck")) {
    return redirectToContact(request, "sent");
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return redirectToContact(request, "error");
  }

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const subject = readField(formData, "subject");
  const message = readField(formData, "message");

  if (!name || !email || !subject || !message) {
    return redirectToContact(request, "error");
  }

  const payload = new FormData();
  payload.append("access_key", accessKey);
  payload.append("name", name);
  payload.append("email", email);
  payload.append("subject", subject);
  payload.append("message", message);
  payload.append("from_name", "Portfolio Contact Form");

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    return redirectToContact(request, "error");
  }

  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
  } | null;

  return redirectToContact(request, result?.success ? "sent" : "error");
}