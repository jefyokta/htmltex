import { Parser } from "htmlparser2";
import { DomHandler, Element, Text, Node } from "domhandler";
import { LatexConverter, type BracesBracketAttr } from "../htmltex";
import { CenteredLabeledImage } from "../utils";
import LatexVariable from "./texvariable";



export const convertHtmlToLatex = (html: string): string => {
    const handler = new DomHandler((e,dom)=>{
      if (e) throw e
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
        const tagName = element.tagName.toLowerCase();
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
    const latexPattern = /\\([a-z]+)(?:\{([^}]*)\}| ?(.+))?/g;
    const l = /\\([a-z]+)\{((?:[^{}]+|\{[^{}]*\})*)\}/g

    const variablePattern = /\\([a-zA-Z0-9]+(?:[A-Z][a-z0-9]*)*)/g;

    const BracketBracesPattern = /\\([a-zA-Z]+)\[(.*?)\]\{(.*?)\}/g;

    const figurePattern = /\\begin\{figure\}[\s\S]*?\\end\{figure\}/g;
    const tablePattern = /\\begin\{tabular\}{\{.*?\}}\\n\\hline[\s\S]*?\\end\{tabular\}/g
  
    return latex
      .replace(variablePattern,(match,varname,...others)=>{     
        const value =LatexVariable.get(varname)
        if (typeof value === 'string') {
            return value 
        }
        return match
    })       
      .replace(tablePattern,(match,content)=>{
        const records = match[1]
            return `<table record="${records}">
                        ${content}
            </table>`
        })
      .replace(figurePattern, (match) => {
        const figureContent = match.match(/\\includegraphics\[(.*?)\]\{(.*?)\}/);
        const caption = match.match(/\\caption\{(.*?)\}/);
        const centered = match.includes("\\centering");
        const label = match.match(/\\label\{(.*?)\}/);
        
        const imgWidth = figureContent ? figureContent[1].replace(`=`,(match)=>`:`) : ""; 
        const imgSrc = figureContent ? figureContent[2] : ""; 
        const imgAlt = caption ? caption[1] : "Figure"; 
        
        return `<figure ${centered ? CenteredLabeledImage : ""} ${label ?`id="${label[1]}"` : ""}>
            <img src="${imgSrc}"  ${imgWidth ? `style="${imgWidth};"` : ""} />
            ${caption ? `<figcaption>${imgAlt}</figcaption>` : ""}
          </figure>
        `;
      })
      .replaceAll(BracketBracesPattern, (match,command,bracket,braces,num,raw,...others) => {
        

        const converter = LatexConverter.texToHtml.bracketbraces[command]
        if (converter) {
          return  converter({braces,bracket})
            
        }
        console.log(match);
        
        return match;
      })
      .replaceAll(l, (match, command, content, text,num,raw,...others) => {
        const converter = LatexConverter.texToHtml.bracesbracket[command];
        if (converter) {
          const attrs:BracesBracketAttr = {
            color: content || "",
            src: content || "",
            href: content || "",
            content: content || "",
            num,
            raw,
            command,
            match,
            text,
            ...others
          };                    
          return converter(attrs);
        }
  
        return `<div class="latex-unknown" tex="${match}">[Unrecognized: ${match}]</div>`;
      })
      .replaceAll(latexPattern, (match, command, content, text,num,raw,...others) => {
        const converter = LatexConverter.texToHtml.bracesbracket[command];
        if (converter) {
          const attrs:BracesBracketAttr = {
            color: content || "",
            src: content || "",
            href: content || "",
            content: content || "",
            num,
            raw,
            command,
            match,
            text,
            ...others
          };  
                  
          return converter(attrs);
        }
  
        return match;
      });
  };
  