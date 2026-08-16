import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";

const COLLECTION = "leads";

export interface CreateLeadInput {
  vehicleId: string;
  vehicleTitle: string;
  name: string;
  email: string;
  message: string;
}

export async function createLead(input: CreateLeadInput): Promise<void> {
  await getAdminDb()
    .collection(COLLECTION)
    .add({
      ...input,
      createdAt: FieldValue.serverTimestamp(),
    });
}
