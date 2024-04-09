export const getVilles = async (searchTerm) => {
  const url = `https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=nom,code&format=json&geometry=centre`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Réponse réseau non ok.");
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des villes:", error);
    throw error;
  }
};
