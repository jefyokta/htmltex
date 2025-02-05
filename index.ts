import { convertLatexToHtml } from "./loader";
import { KatexComponents } from "./src/components/katex";


// customElements.define('katex',KatexComponents)

// const content: string = '_tex.bs.figure{test}';
// const newContent = content.replace(/_tex\.bs\.(\w+)/g, '\\$1'); 
// console.log(newContent);


fetch('https://coretaxdjp.pajak.go.id/registrationportal/api/NewRegistration/registerPortalDomesticNikTaxpayerWithoutCase',{
  method:'POST',
  headers:{
    "accept":"application/json, text/plain, */*",
    "accept-language":"en-US,en;q=0.7",
    "content-type":"multipart/form-data",
    "sec-ch-ua":"\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Brave\";v=\"132\"",
    "sec-ch-mobile":"?0",
    "sec-ch-platform":"\"Windows\"",
    "sec-fetch-dest":"empty",
    "sec-fetc-mode":"cors",
    "sec-fetc-site":"same-origin",
    "sec-gcp":"1",
    "x-security-request":"required"



  }
}).then(r=>{
  console.log(r)
  // r.json().then(rs=>console.log(rs))
  r.text().then(rt=>console.log(rt))

})



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
