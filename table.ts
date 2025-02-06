// `
// \\begin{longtable}[c]{|l|l|p{9cm}|}
// \\hline
// Column 1 & Column 2 & Column 3 \\\
// \\hline
// \\end{longtable}

import { BeginEndConverter } from "./loader";

// `
// .replace(/p\{([a-zA-Z0-9_]+)\}/g,(match,val)=>{
   
//     if (val) {
//         return `p-${val}`
//     }
//     return match

// }
// )

// .replace(/\\begin\{([a-zA-Z]+)\}(?:\[(.*?)\])?\{([^}]*)\}([\s\S]*?)\\end\{\1\}/,(match,command,braces,bracket,content,...others)=>{
// console.log({match,command,braces,bracket,content});


//     return''
// })
function toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  }
console.log(toCamelCase('katex'));
