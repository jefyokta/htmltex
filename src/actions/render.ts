import { parseLatexPlaceHolder } from "../utils";

export const handleFigureCaption = (el: HTMLElement | null) => {
  el?.querySelectorAll("figure").forEach((figure) => {
    const content: string = figure.getAttribute("content") || "";
    figure.innerHTML = content;
  });
};

export const reRenderKatex = (el: HTMLElement | null) => {
  el?.querySelectorAll("katex").forEach((tex) => {
    const content: string = tex.innerHTML;
    tex.innerHTML = parseLatexPlaceHolder(content);
  });
};
