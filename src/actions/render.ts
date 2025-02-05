import { render } from "katex";
import { parseLatexPlaceHolder } from "../utils";

export const handleFigureCaption = (el: HTMLElement | null) => {
  el?.querySelectorAll("figcaption").forEach((figure) => {
    const content: string = figure.getAttribute("content") || "";
    figure.innerHTML = content;
  });
};
export const reRenderKatex = (el: HTMLElement | null) => {
  el?.querySelectorAll("katex").forEach((tex) => {
    const content: string = tex.innerHTML;
    tex.innerHTML = parseLatexPlaceHolder(content);
    render;
  });
};
