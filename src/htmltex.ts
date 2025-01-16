import { Parser } from "htmlparser2";
import { DomHandler, Element, Text, Node } from "domhandler";



const LatexConverter: ConverterMap = {
  htmlToTex: {
    h1: (_, content) => `\\chapter{${content}}`,
    h2: (_, content) => `\\section{${content}}`,
    h3: (_, content) => `\\subsection{${content}}`,
    h4: (_, content) => `\\subsubsection{${content}}`,
    h5: (_, content) => `\\paragraph{${content}}`,
    h6: (_, content) => `\\subparagraph{${content}}`,
    b: (_, content) => `\\textbf{${content}}`,
    i: (_, content) => `\\textit{${content}}`,
    u: (_, content) => `\\underline{${content}}`,
    p: (_, content) => `\\par ${content}`,
    span: (attrs, content) =>
      attrs.style?.includes("color")
        ? `\\textcolor{${getColor(attrs.style)}}{${content}}`
        : content,
    br: () => `\\\\`,
    ul: (_, content) => `\\begin{itemize}${content} \\end{itemize}`,
    ol: (_, content) => `\\begin{enumerate}${content} \\end{enumerate}`,
    li: (_, content) => `\\item ${content}`,
    img: (attrs) =>{      
    return  `\\includegraphics[width=${attrs.width || "0.5\\textwidth"}]{${attrs.src}}`},
    a: (attrs, content) => `\\href{${attrs.href}}{${content}}`,
    hr: () => `\\noindent\\rule{\\textwidth}{0.4pt}`,
    blockquote: (_, content) => `\\begin{quote}${content}\\end{quote}`,
    code: (_, content) => `\\texttt{${content}}`,
    pre: (_, content) => `\\begin{verbatim}${content}\\end{verbatim}`,
    sup: (_, content) => `^{${content}}`,
    sub: (_, content) => `_{${content}}`,
    small: (_, content) => `\\footnotesize{${content}}`,
    strong: (_, content) => `\\textbf{${content}}`,
    figcaption:(_,content)=>`\\caption{${content}}`,
    figure:(attrs,content)=>{
     const alignment = attrs?.style?.match(/text-align:\s*([^;]+)/)
     if (alignment) {
      if (alignment[0] == 'center') {

        return `
        \\begin{figure}
        \\centering${content}
        \\end{figure}
        ` 
      }      
     }
      return  `
        \\begin{figure}
        \\centering${content}\\end{figure}
      `
    },
    div:(attrs,content)=>{
        if (attrs?.begin) {
            return `\\begin{${attrs?.content}}\n`;
        }
        if (attrs?.end) {
            return `\\end{${attrs?.content}}\n`;      
        }
        if (attrs?.tex) {

            return attrs.tex
            
        }

        return ""
    }
  },
  texToHtml: {
    cite: (attrs:any, content:any) => `<a href="#${content}" style="color:black;text-decoration:none" >${content}</a>`,
    chapter: ({content}:any) => `<h1>${content}</h1>`,
    section: ({content}:any) => `<h2 style="counter-reset: subsection;font-size: 1.4rem;font-weight: bold;margin-top: 3.5ex;margin-bottom: 2.3ex;" >${content}</h2>`,
    subsection: ({content}:any) => `<h3>${content}</h3>`,
    subsubsection: ({content}:any) => `<h4>${content}</h4>`,
    paragraph: ({content}:any) => `<h5>${content}</h5>`,
    subparagraph: (content:string) => `<h6>${content}</h6>`,
    textbf: ({content}:TexAttribute) => `<b>${content}</b>`,
    textit: ({content}:TexAttribute) => `<i>${content}</i>`,
    underline: ({content}:TexAttribute) => `<u>${content}</u>`,
    par: (data:any,content:any,text:any) => {
    return  `<p>${text}</p>`
  },
    textcolor: (attrs:any, content:string) =>
      `<span style="color:${attrs[1]}">${content}</span>`,
    begin_itemize: () => `<ul>`,
    end_itemize: () => `</ul>`,
    begin_enumerate: () => `<ol>`,
    end_enumerate: () => `</ol>`,
    item: (attrs:TexAttribute,content:any,text:any) =>   `<li>${text}</li>`,
    includegraphics: (attrs:any) =>
      `<img src="${attrs[1]}" style="width:${attrs[2] || "50%"}" />`,
    href: (attrs:any, content:any) => `<a href="${attrs[1]}">${content}</a>`,
    rule: () => `<hr />`,
    quote: (content:any) => `<blockquote>${content}</blockquote>`,
    texttt: (content:any) => `<code>${content}</code>`,
    verbatim: (content:any) => `<pre>${content}</pre>`,
    sup: (content:any) => `<sup>${content}</sup>`,
    sub: (content:any) => `<sub>${content}</sub>`,
    footnotesize: (content:any) => `<small>${content}</small>`,
    begin:({content}:any)=> {
      if (content == 'itemize') {
        return LatexConverter.texToHtml.begin_itemize()
      }
      if (content == "enumerate") {
        return LatexConverter.texToHtml.begin_enumerate()
      }
      if (content === 'figure') {
        return `<figure>`
        
      }
      return `<div  content="${content}" begin="true"></div>`
    
    },
    end:({content}:any)=>{
      if (content == 'itemize') {
        return LatexConverter.texToHtml.end_itemize()
      }
      if (content == "enumerate") {
        return LatexConverter.texToHtml.end_enumerate()
      }

      if (content === 'figure') {
        return `</figure>`
        
      }
     return `<div content="${content}" end="true"></div>`
    }
  },
};

const getColor = (style: string): string => {
  const match = style.match(/color:\s*([^;]+)/);
  return match ? match[1] : "black";
};



export { LatexConverter };
