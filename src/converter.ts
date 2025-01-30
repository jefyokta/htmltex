import { Parser } from "htmlparser2";
import { DomHandler, Element, Text, Node } from "domhandler";
import { LatexConverter } from "./htmltex";
import { CenteredLabeledImage } from "./utils";



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
    const figurePattern = /\\begin\{figure\}[\s\S]*?\\end\{figure\}/g;
    const tablePattern = /\\begin\{tabular\}{\{.*?\}}\\n\\hline[\s\S]*?\\end\{tabular\}/g
  
    return latex
      .replace(tablePattern,(match,content)=>{
        const records = match[1]
            return `<table record="${records}">
                        ${content}
            </table`
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
      .replaceAll(latexPattern, (match, command, content, text,...f) => {
        const converter = LatexConverter.texToHtml[command];
        if (converter) {
          const attrs = {
            color: content || "",
            src: content || "",
            href: content || "",
            content: content || "",
          };
          // console.log(f);
          
  
          return converter(attrs, content || "", text || "");
        }
  
        return `<div class="latex-unknown" tex="${match}">[Unrecognized: ${match}]</div>`;
      });
  };
  