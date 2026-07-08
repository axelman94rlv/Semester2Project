import { apiGet } from "./payload.js";

export async function getPosts() {
  const data = await apiGet("/Posts");

  return data?.docs ?? [];
}