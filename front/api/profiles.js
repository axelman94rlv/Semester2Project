import { getCollection } from "./payload.js";

/** Le portfolio n'affiche qu'un profil : on retourne le premier document. */
export async function getProfile() {
  const data = await getCollection("profiles?limit=1&depth=1");

  return data?.docs?.[0] ?? null;
}

export async function getProfiles() {
  const data = await getCollection("profiles?depth=1");

  return data?.docs ?? [];
}
