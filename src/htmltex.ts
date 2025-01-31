
import { convertLatexToHtml ,Begin, End} from "./converter";
export type BracesBracketAttr = {
  color: string,
  src: string,
  href: string,
  content: string,
  num:number,
  raw:string,
  command:string,
  match:string,
  text:string
}
export type BracketBracesAttr = {
  bracket:any,
  braces:any
}



type HtmlConverterFunction = (attrs: Record<string, string>, content: string) => string;
type HtmlMapping = Record<string, HtmlConverterFunction>


type BracesBracketFunc = (attrs:BracesBracketAttr) =>string;


type BracketBraceFunc = (attr:BracketBracesAttr) =>string

type LatexMapping = {
  bracesbracket:Record<string,BracesBracketFunc>,
  braces:any,
  bracketbraces:Record<string,BracketBraceFunc>,
};


type ConverterMap = {
  htmlToTex:HtmlMapping,
  texToHtml:LatexMapping,
}









const LatexConverter: ConverterMap = {
  htmlToTex: {
    h1: (_:any, content:string) => `\\chapter{${content}}`,
    h2: (_:any, content:string) => `\\section{${content}}`,
    h3: (_:any, content:string) => `\\subsection{${content}}`,
    h4: (_:any, content:string) => `\\subsubsection{${content}}`,
    h5: (_:any, content:string) => `\\paragraph{${content}}`,
    h6: (_:any, content:string) => `\\subparagraph{${content}}`,
    b: (_:any, content:string) => `\\textbf{${content}}`,
    i: (_:any, content:string) => `\\textit{${content}}`,
    u: (_:any, content:string) => `\\underline{${content}}`,
    p: (_:any, content:string) => `\\par ${content}`,
    span: (attrs:any, content:any) =>
      attrs.style?.includes("color")
        ? `\\textcolor{${getColor(attrs.style)}}{${content}}`
        : content,
    br: () => `\\\\`,
    ul: (_:any, content:string) => `\\begin{itemize}${content} \\end{itemize}`,
    ol: (_:any, content:string) => `\\begin{enumerate}${content} \\end{enumerate}`,
    li: (_:any, content:string) => `\\item ${content}`,
    img: (attrs:any) =>{      
    return  `\\includegraphics[width=${attrs.width || "0.5\\textwidth"}]{${attrs.src}}`},
    a: (attrs:any, content:any) =>{ 
      if (attrs.cite) {
        if (attrs.cite === "normal") {
          return `\\cite{${attrs.citeId}}`
        }
        return `\\citeA{${attrs.citeId}}`

        
      }
      return`\\href{${attrs.href}}{${content}}`}
      ,
    hr: () => `\\noindent\\rule{\\textwidth}{0.4pt}`,
    blockquote: (_:any, content:string) => `\\begin{quote}${content}\\end{quote}`,
    code: (_:any, content:string) => `\\texttt{${content}}`,
    pre: (_:any, content:string) => `\\begin{verbatim}${content}\\end{verbatim}`,
    sup: (_:any, content:string) => `^{${content}}`,
    sub: (_:any, content:string) => `_{${content}}`,
    small: (_:any, content:string) => `\\footnotesize{${content}}`,
    strong: (_:any, content:string) => `\\textbf{${content}}`,
    figcaption:(_:any,content:any)=>`\\caption{${content}}`,
    table: (attrs:any, content:any) => `\\begin{tabular}{${ attrs.records }}\n\\hline\n${content}\\end{tabular}\n\\vspace{1em}`,
    tr: (attrs:any, content:any) => {
       return `${content} \\\\\n\\hline`
      },
    td: (attrs:any, content:any) => {
      let options = "";
      if (attrs.colspan) options += `\\multicolumn{${attrs.colspan}}{c}{${content}}`;
      if (attrs.rowspan) options += `\\multirow{${attrs.rowspan}}{*}{${content}}`;
      return options || `${content} &`;
    },
    th: (attrs:any, content:string) => {
      let options = "";
      if (attrs.colspan) options += `\\multicolumn{${attrs.colspan}}{c}{\\textbf{${content}}}`;
      if (attrs.rowspan) options += `\\multirow{${attrs.rowspan}}{*}{\\textbf{${content}}}`;
      return options || `\\textbf{${content}} &`;
    },    
    figure:(attrs:any,content:any)=>{
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
    div:(attrs:any,content:any)=>{
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
    bracketbraces:{
      includegraphics:(attr:BracketBracesAttr)=>{
        const {braces,bracket} = attr
        return `<img src="${braces}" ${bracket ? `style="${bracket.replace(/=/g, ':')}"` : ""} />`;
      }
    },
    braces:{},
    bracesbracket:{
      cite: ({content}:BracesBracketAttr) => {
        return  `<a href="#" class="cite" cite="normal" citeId="${content}" style="color:black;text-decoration:none" ></a>`
        },
        citeA:({content}:BracesBracketAttr) => {
          return  `<a href="#" class="citeA" cite="a" citeId="${content}" style="color:black;text-decoration:none" ></a>`
          },
        chapter: ({content}:BracesBracketAttr) => `<h1 >${convertLatexToHtml(content)}</h1>`,
        section: ({content}:BracesBracketAttr) => `<h2 >${convertLatexToHtml(content)}</h2>`,
        subsection: ({content}:BracesBracketAttr) => `<h3>${convertLatexToHtml(content)}</h3>`,
        subsubsection: ({content}:BracesBracketAttr) => `<h4>${convertLatexToHtml(content)}</h4>`,
        paragraph: ({content}:BracesBracketAttr) => `<h5>${content}</h5>`,
        subparagraph: ({content}:BracesBracketAttr) => `<h6>${content}</h6>`,
        textbf: ({content}:BracesBracketAttr) => `<b>${content}</b>`,
        textit: ({content}:BracesBracketAttr) => `<i>${content}</i>`,
        underline: ({content}:BracesBracketAttr) => `<u>${content}</u>`,
        par: ({text}:BracesBracketAttr) =>  `<p>${text}</p>`,
        textcolor: ({content,color}:BracesBracketAttr) =>
          `<span style="color:${color}">${content}</span>`,
        begin_itemize: () => `<ul>`,
        end_itemize: () => `</ul>`,
        begin_enumerate: () => `<ol>`,
        end_enumerate: () => `</ol>`,
        item: ({text}:BracesBracketAttr) =>   `<li>${convertLatexToHtml(text)}</li>`,
        includegraphics: (attrs:any) =>`<img src="${attrs[1]}" style="width:${attrs[2] || "50%"}" />`,
        href: ({content}:BracesBracketAttr) => `<a href="">${content}</a>`,
        rule: () => `<hr />`,
        quote: (content:any) => `<blockquote>${content}</blockquote>`,
        texttt: (content:any) => `<code>${content}</code>`,
        verbatim: (content:any) => `<pre>${content}</pre>`,
        sup: (content:any) => `<sup>${content}</sup>`,
        sub: (content:any) => `<sub>${content}</sub>`,
        footnotesize: (content:any) => `<small>${content}</small>`,
        begin:(opt:BracesBracketAttr)=> {     
          const content = opt.content
    
          const begin = new Begin        
          return  begin.call(content as  any,opt)
          
          
        
        },
        end:(opt:BracesBracketAttr)=>{
    
          const end = new End
          return end.call(opt.content as any, opt)
        }

    },
  
  },

};

const getColor = (style: string): string => {
  const match = style.match(/color:\s*([^;]+)/);
  return match ? match[1] : "black";
};






export { LatexConverter };
