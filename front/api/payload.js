import { API_BASE_URL } from "./config.js";

export async function getCollection(collectionName) {
  try {
    const response = await fetch(`${API_BASE_URL}/${collectionName}`);

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération Payload :", error);
    return null;
  }
}