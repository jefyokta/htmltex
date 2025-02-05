import { KatexComponents } from "./components/katex";

const escapeLatex = (text: string): string => {
  return text
    .replace(/\\/g, "\\textbackslash ")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\$/g, "\\$")
    .replace(/%/g, "\\%")
    .replace(/_/g, "\\_")
    .replace(/#/g, "\\#")
    .replace(/&/g, "\\&")
    .replace(/~/g, "\\textasciitilde ")
    .replace(/\^/g, "\\textasciicircum ");
};
export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export const latexPlaceHolder = (latex: string) => {
  return latex.replace(/\\([a-zA-Z]+)/g, "_tex.bs.$1");
};

export const parseLatexPlaceHolder = (placeholder: string) =>
  placeholder.replace(/_tex\.bs\.(\w+)/g, "\\$1");

export const createKatexElement = () => {
  customElements.define("katex", KatexComponents);
};

export const CenteredLabeledImage: string =
  "display:flex;flex-direction:column;align-items:center;";

/**
 * @param newTagName
 * @param mutating
 */
export const changeLineTag = (
  newTagName: string,
  mutating: (newElement: HTMLElement) => void,
) => {
  const selection = window.getSelection();

  if (selection && selection.anchorNode) {
    const anchorNode = selection.anchorNode;
    const lineElement =
      anchorNode.nodeType === 3 ? anchorNode.parentNode : anchorNode;

    if (lineElement instanceof HTMLElement) {
      const newElement = document.createElement(newTagName);

      if (lineElement.tagName === newElement.tagName) {
        lineElement.replaceWith("p");
        return;
      }

      newElement.innerHTML = lineElement.innerHTML;

      mutating(newElement);

      lineElement.replaceWith(newElement);
    }
  }
};

export default escapeLatex;
