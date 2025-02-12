import { Parser } from "htmlparser2";
import { DomHandler, Element, Text, Node } from "domhandler";
import { LatexConverter, type NormalAttr } from "../htmltex";
import LatexVariable from "./tex-variable";
import { BeginEndConverter, type BeginEndParams } from "./additional";

export const convertHtmlToLatex = (html: string): string => {
  const handler = new DomHandler((e, dom) => {
    if (e) throw e;
  });
  const parser = new Parser(handler);
  parser.write(html);
  parser.end();

  const document = handler.dom;

  const convertNode = (node: Node): string => {
    if (node.type === "text") {
      return (node as Text).data;
    }

    if (node.type === "tag") {
      const element = node as Element;
      const tagName = element.tagName
        .toLowerCase()
        .replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      const converter = LatexConverter.htmlToTex[tagName];

      if (!converter) {
        return element.children.map(convertNode).join("");
      }

      const attrs = element.attribs || {};
      const content = element.children.map(convertNode).join("");

      return converter(attrs, content);
    }

    return "";
  };
  return document.map(convertNode).join("");
};

export const convertLatexToHtml = (latex: string): string => {
  const inlineMathPattern = /(?<!\w)\$(.+?)\$(?!\w)/g;
  const blockMathPattern = /^\s*\$\$(.*?)\$\$/gms;
  const latexPattern = /\\([a-z]+)(?:\{([^}]*)\}| ?(.+))?/g;
  const l = /\\([a-z]+)\{((?:[^{}]+|\{[^{}]*\})*)\}/g;
  const variablePattern = /\\([a-zA-Z0-9]+(?:[A-Z][a-z0-9]*)*)/g;
  const beginEnd =
    /\\begin\{([a-zA-Z]+)\}(?:\[(.*?)\])?(?:\{([^}]*)\})?([\s\S]*?)\\end\{\1\}/g;
  const BracketBracesPattern = /\\([a-zA-Z]+)\[(.*?)\]\{(.*?)\}/g;

  return latex
  .replace(blockMathPattern,(match,content,...args)=>{

    return `<x-math-block content="${content}"></x-math-block>`
  })
    .replace(inlineMathPattern,(match,content,...args)=>{      
      return `<x-math-inline content="${content}"></x-math-inline>`
    })

    .replace(variablePattern, (match, varname, ...others) => {
      const value = LatexVariable.get(varname);
      if (typeof value === "string") {
        return `<span var="${varname}">${value}</span>`;
      }
      return match;
    })
    .replace(
      beginEnd,
      (match, command, braces, bracket, content, ...others) => {
        return new BeginEndConverter()._call(command, {
          command,
          braces,
          bracket,
          content,
          match,
        } as BeginEndParams);
      },
    )
    .replace(
      BracketBracesPattern,
      (match, command, bracket, braces, num, raw, ...others) => {
        const converter = LatexConverter.texToHtml.bracketbraces[command];
        if (converter) {
          return converter({ match, braces, bracket });
        }

        return match;
      },
    )

    .replace(l, (match, command, content, text, num, raw, ...others) => {
      const converter = LatexConverter.texToHtml.bracesbracket[command];
      if (converter) {
        const attrs: NormalAttr = {
          color: content || "",
          src: content || "",
          href: content || "",
          content: content || "",
          num,
          raw,
          command,
          match,
          text,
          ...others,
        };
        return converter(attrs);
      }

      return match;
    })
    .replace(
      latexPattern,
      (match, command, content, text, num, raw, ...others) => {
        const converter = LatexConverter.texToHtml.bracesbracket[command];
        if (converter) {
          const attrs: NormalAttr = {
            color: content || "",
            src: content || "",
            href: content || "",
            content: content || "",
            num,
            raw,
            command,
            match,
            text,
            ...others,
          };

          return converter(attrs);
        }

        return match;
      },
    );
};
