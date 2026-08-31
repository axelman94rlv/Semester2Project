import { API_BASE_URL } from "./config.js";

export async function getCollection(collectionName) {
  try {
    const response = await fetch(`${API_BASE_URL}/${collectionName}`);

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération Payload :", error);
    return null;
  }
}

export async function apiPost(path, body) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur Payload détaillée :", data);
      throw new Error(`Erreur API : ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi Payload :", error);
    return null;
  }
}