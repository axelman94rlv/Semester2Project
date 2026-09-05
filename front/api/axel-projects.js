import { getCollection } from "./payload.js";

export async function getAxelProjects() {
  const data = await getCollection("axel-projects?sort=order&depth=1");

  return data?.docs ?? [];
}
