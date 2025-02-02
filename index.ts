import { convertLatexToHtml } from "./loader";
import { KatexComponents } from "./src/etc/custom-components";


customElements.define('katex',KatexComponents)

const content: string = '_tex.bs.figure{test}';
const newContent = content.replace(/_tex\.bs\.(\w+)/g, '\\$1'); 
console.log(newContent);




// console.log(convertLatexToHtml(`
//   \\begin{matrix}
// 1 & 2 //
// 3 & 4 //

//   \\end{matrix}

//   `));


//   const patern =/\\([a-zA-Z]+)(?:\[((?:[^\]\\]|\\.)*)\])?(?:\{([^}]*)\})?(?:\[((?:[^\]\\]|\\.)*)\])?/g ;

// `
//   \\begin[bracket1]{matrix}[bracket2]
// 1 & 2 //
// 3 & 4 //

//   \\end{matrix}

//   `.replaceAll(patern,(match, command,firstbracket, braces, secondbracket, num, raw)=>{
//     console.log({match, command,firstbracket, braces, secondbracket, num, raw});

//     return ''
//   })
