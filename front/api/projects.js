import { getCollection } from "./payload.js";

export async function getProjects() {
  const data = await getCollection("/Projects");

  return data?.docs ?? [];
}