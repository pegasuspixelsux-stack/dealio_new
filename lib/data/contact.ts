import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";

const COLLECTION = "contactMessages";

export interface CreateContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export async function createContactMessage(input: CreateContactMessageInput): Promise<void> {
  await getAdminDb()
    .collection(COLLECTION)
    .add({
      ...input,
      createdAt: FieldValue.serverTimestamp(),
    });
}
