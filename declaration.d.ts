
type Content = string | Node

type HtmlMapping = {
    [key:string ]:HtmlConverterFunction
}

type LatexMapping = any;

type HtmlConverterFunction = (attrs: Record<string, string>, content: string) => string;
type TexToHtmlMap = Record<string, ConverterFunction>;

type ConverterMap = {
    htmlToTex:HtmlMapping,
    texToHtml:LatexMapping,
}


type TexAttribute = {
    content: any,
    [...keys:any]
}

type TexToHtmlParams = (attrs?:TexAttribute, content?:any, text?:any)=>string
