import { API_BASE_URL } from "./config.js";

export async function getCollection(collectionName) {
  try {
    const response = await fetch(`${API_BASE_URL}/${collectionName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Erreur API Payload : ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Payload est probablement arrêté ou inaccessible : ${API_BASE_URL}/${collectionName}`,
      error
    );
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
      return null;
    }

    return data;
  } catch (error) {
    console.error(
      `Payload est probablement arrêté ou inaccessible : ${API_BASE_URL}${path}`,
      error
    );
    return null;
  }
}