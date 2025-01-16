import { convertLatexToHtml } from "./converter";

type ImageCaption ={
    text:string
    cite?:string|undefined
}
type ImageAttr = {
    src:string,
    width:string|number;
    caption:ImageCaption,

}

export const LabeledImage= (label:string,{src,caption,width}:ImageAttr):string=>{
    let cap =caption.text;
    if (null !== caption.cite) {
        cap =caption + " "+ `\\cite{${caption.cite}}`;    
}
    return convertLatexToHtml(`
        \\begin{figure}
        \\centering
            \\includegraphics[${width}]{${src}}
            \\caption{${cap}}
            \\label{${label}}
        \\end{figure}
        `)
}

