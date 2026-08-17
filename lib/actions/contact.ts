"use server";

import { createContactMessage } from "@/lib/data/contact";

export interface SubmitContactInput {
  name: string;
  email: string;
  message: string;
}

export interface SubmitContactResult {
  ok: boolean;
  error?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactAction(input: SubmitContactInput): Promise<SubmitContactResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in all fields." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    await createContactMessage({ name, email, message });
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not send your message. Please try again in a moment." };
  }
}
