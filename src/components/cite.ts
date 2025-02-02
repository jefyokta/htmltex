export const citeA = (cite: Cite) => {
  return `<a cite="a" citeId="${cite.id}">${formatAuthorName(cite.data?.author)} (${cite.data?.year})</a>`;
};

export const cite = (cite: Cite) => {
  return `<a cite="normal" citeId="${cite.id}">(${formatAuthorName(cite.data?.author)}, ${cite.data?.year})</a>`;
};

export const formatAuthorName = (names: string) => {
  if (!names) return "";

  const nameArray = names.split(" and ");

  if (nameArray.length > 5) {
    return nameArray.slice(0, 5).join(", ") + " dkk.";
  }

  if (nameArray.length > 1) {
    return (
      nameArray.slice(0, -1).join(", ") +
      " dan " +
      nameArray[nameArray.length - 1]
    );
  }

  return names;
};
