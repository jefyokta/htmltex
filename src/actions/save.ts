import { convertHtmlToLatex } from "../converter";

type SaveOptions = {
  element: HTMLElement | null;
  endpoint: string;
  callback?: (response: Response) => void;
};

export const Save = async (opt: SaveOptions) => {
  const { element, endpoint, callback } = opt;
  if (!element) {
    return;
  }
  const content = element.innerHTML;
  const latex = convertHtmlToLatex(content);

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ content: latex }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  callback && callback(response);
};
