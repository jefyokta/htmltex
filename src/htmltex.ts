import { convertLatexToHtml, Begin, End } from "./converter";
import type { FigureOptions } from "./tiptap-extensions";
import { latexPlaceHolder, parseLatexPlaceHolder } from "./utils";
export type NormalAttr = {
  color: string;
  src: string;
  href: string;
  content: string;
  num: number;
  raw: string;
  command: string;
  match: string;
  text: string;
};
export type BracketBracesAttr = {
  bracket: any;
  braces: any;
  match: any;
};

type HtmlConverterFunction = (
  attrs: Record<string, string> | any,
  content: string,
) => string;
type HtmlMapping = Record<string, HtmlConverterFunction>;

type BracesBracketFunc = (attrs: NormalAttr) => string;

type BracketBraceFunc = (attr: BracketBracesAttr) => string;

type LatexMapping = {
  bracesbracket: Record<string, BracesBracketFunc>;
  braces: any;
  bracketbraces: Record<string, BracketBraceFunc>;
};

type ConverterMap = {
  htmlToTex: HtmlMapping;
  texToHtml: LatexMapping;
};

const LatexConverter: ConverterMap = {
  htmlToTex: {
    // h1: (_: any, content: string) => `\\chapter{${content}}`,
    h2: (_: any, content: string) => `\\section{${content}}\n`,
    h3: (_: any, content: string) => `\\subsection{${content}}\n`,
    h4: (_: any, content: string) => `\\subsubsection{${content}}`,
    h5: (_: any, content: string) => `\\paragraph{${content}}`,
    h6: (_: any, content: string) => `\\subparagraph{${content}}`,
    b: (_: any, content: string) => `\\textbf{${content}}`,
    i: (_: any, content: string) => `\\textit{${content}}`,
    u: (_: any, content: string) => `\\underline{${content}}`,
    p: (_: any, content: string) => `\\par ${content}\n\n`,
    span: (attrs: any, content: any) => {
      //texvariable
      if (attrs.var) {
        return `\\${attrs.var}`;
      }
      return attrs.style?.includes("color")
        ? `\\textcolor{${getColor(attrs.style)}}{${content}}`
        : content;
    },
    br: () => `\\\\`,
    ul: (_: any, content: string) =>
      `\\begin{itemize}${content} \\end{itemize}`,
    ol: (_: any, content: string) =>
      `\\begin{enumerate}${content} \\end{enumerate}`,
    li: (_: any, content: string) => `\n \\item ${content} \n`,
    img: (attrs: any) => {
      return `\\includegraphics[width=${attrs.width || "0.5\\textwidth"}]{${attrs.src}}`;
    },
    a: (attrs: any, content: any) => `\\href{${attrs.href}}{${content}}`,
    hr: () => `\\noindent\\rule{\\textwidth}{0.4pt}`,
    blockquote: (_: any, content: string) =>
      `\\begin{quote}${content}\\end{quote}`,
    code: (_: any, content: string) => `\\texttt{${content}}`,
    pre: (_: any, content: string) =>
      `\\begin{verbatim}${content}\\end{verbatim}`,
    sup: (_: any, content: string) => `^{${content}}`,
    sub: (_: any, content: string) => `_{${content}}`,
    small: (_: any, content: string) => `\\footnotesize{${content}}`,
    strong: (_: any, content: string) => `\\textbf{${content}}`,
    figcaption: (_: any, content: any) => `\\caption{${content}}`,
    table: (attrs: any, content: any) =>
      `\\begin{tabular}{${attrs.records}}\n\\hline\n${content}\\end{tabular}\n\\vspace{1em}`,
    tr: (attrs: any, content: any) => {
      return `${content} \\\\\n\\hline`;
    },
    td: (attrs: any, content: any) => {
      let options = "";
      if (attrs.colspan)
        options += `\\multicolumn{${attrs.colspan}}{c}{${content}}`;
      if (attrs.rowspan)
        options += `\\multirow{${attrs.rowspan}}{*}{${content}}`;
      return options || `${content} &`;
    },
    th: (attrs: any, content: string) => {
      let options = "";
      if (attrs.colspan)
        options += `\\multicolumn{${attrs.colspan}}{c}{\\textbf{${content}}}`;
      if (attrs.rowspan)
        options += `\\multirow{${attrs.rowspan}}{*}{\\textbf{${content}}}`;
      return options || `\\textbf{${content}} &`;
    },
    figure: (attrs: FigureOptions, content: any) => {
      const center = attrs?.centered;
      return `
      \\begin{figure}
      ${center ? "\\centering" : ""}
      \\includegraphics[${attrs.width}]{${attrs.src}}
      \\caption{${attrs.caption} ${attrs.cite ? `\\cite{${attrs.cite}}` : ""}}
      \\end{figure}
      `;
    },
    katex: (_, content) => parseLatexPlaceHolder(content),
    cite: (attr, content) =>
      attr?.citeA ? `citeA{${attr.cite}}` : `cite${attr.cite}`,
    // div: (attrs: any, content: any) => {
    //   return `
    //   \\begin{${attrs.be}}${attrs.braces ? `[${attrs.data.braces}]` : ""}${attrs.data.bracket ? `{${attrs.braces}}` : ""}
    //   ${content}
    //   \\end{${attrs.be}}

    //   `;
    //   if (attrs?.begin) {
    //     return `\\begin{${attrs?.content}}\n`;
    //   }
    //   if (attrs?.end) {
    //     return `\\end{${attrs?.content}}\n`;
    //   }
    //   if (attrs?.tex) {
    //     return attrs.tex;
    //   }

    //   return "";
    // },
  },
  texToHtml: {
    bracketbraces: {
      includegraphics: (attr: BracketBracesAttr) => {
        const { braces, bracket } = attr;
        return `<img src="${braces}" ${bracket ? `style="${bracket.replace(/=/g, ":")}"` : ""} />`;
      },
      sqrt: (attr: BracketBracesAttr) =>
        `<katex>${latexPlaceHolder(attr.match)}</katex>`,
      begin: (attr: BracketBracesAttr) => {
        return "";
      },
    },
    braces: {},
    bracesbracket: {
      cite: ({ content }: NormalAttr) => {
        return `<cite cite="${content}"></cite>`;
      },
      citeA: ({ content }: NormalAttr) => {
        return `<cite citeA="true" cite="${content}"></cite>`;
      },
      chapter: ({ content }: NormalAttr) =>
        `<h1 >${convertLatexToHtml(content)}</h1>`,
      section: ({ content }: NormalAttr) =>
        `<h2 >${convertLatexToHtml(content)}</h2>`,
      subsection: ({ content }: NormalAttr) =>
        `<h3>${convertLatexToHtml(content)}</h3>`,
      subsubsection: ({ content }: NormalAttr) =>
        `<h4>${convertLatexToHtml(content)}</h4>`,
      paragraph: ({ content }: NormalAttr) => `<h5>${content}</h5>`,
      subparagraph: ({ content }: NormalAttr) => `<h6>${content}</h6>`,
      textbf: ({ content }: NormalAttr) => `<b>${content}</b>`,
      textit: ({ content }: NormalAttr) => `<i>${content}</i>`,
      underline: ({ content }: NormalAttr) => `<u>${content}</u>`,
      par: ({ text }: NormalAttr) => `<p>${text}</p>`,
      textcolor: ({ content, color }: NormalAttr) =>
        `<span style="color:${color}">${content}</span>`,
      item: ({ text }: NormalAttr) => `<li>${convertLatexToHtml(text)}</li>`,
      includegraphics: ({ content }: NormalAttr) => `<img src="${content}"  />`,
      href: ({ content }: NormalAttr) => `<a href="">${content}</a>`,
      rule: () => `<hr />`,
      quote: ({ content }: NormalAttr) => `<blockquote>${content}</blockquote>`,
      texttt: ({ content }: NormalAttr) => `<code>${content}</code>`,
      verbatim: ({ content }: NormalAttr) => `<pre>${content}</pre>`,
      sup: ({ content }: NormalAttr) => `<sup>${content}</sup>`,
      sub: ({ content }: NormalAttr) => `<sub>${content}</sub>`,
      footnotesize: (content: any) => `<small>${content}</small>`,
      begin: (opt: NormalAttr) => {
        const content = opt.content;

        const begin = new Begin();
        return begin._call(content as any, opt);
      },
      end: (opt: NormalAttr) => {
        const end = new End();
        return end._call(opt.content as any, opt);
      },
      sqrt: ({ match }: NormalAttr) => {
        const placeholder = latexPlaceHolder(match);

        return `<katex>${placeholder}</katex>`;
      },
    },
  },
};

const getColor = (style: string): string => {
  const match = style.match(/color:\s*([^;]+)/);
  return match ? match[1] : "black";
};

export { LatexConverter };
