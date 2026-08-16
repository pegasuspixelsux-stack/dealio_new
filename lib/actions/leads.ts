"use server";

import { createLead } from "@/lib/data/leads";

export interface SubmitLeadInput {
  vehicleId: string;
  vehicleTitle: string;
  name: string;
  email: string;
  message: string;
}

export interface SubmitLeadResult {
  ok: boolean;
  error?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLeadAction(input: SubmitLeadInput): Promise<SubmitLeadResult> {
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
    await createLead({ vehicleId: input.vehicleId, vehicleTitle: input.vehicleTitle, name, email, message });
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not send your message. Please try again in a moment." };
  }
}
