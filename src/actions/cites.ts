import { bibToObject } from "../converter";

export const getBibFromDoi = async (doiurl: string): Promise<Cite> => {
  try {
    const response = await fetch(doiurl, {
      method: "GET",
      headers: {
        Accept: "application/x-bibtex",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return bibToObject(await response.text())[0];
  } catch (error) {
    console.error("Error fetching BibTeX:", error);
    throw new Error("Failed to fetch bib tex.");
  }
};
