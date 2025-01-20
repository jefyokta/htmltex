
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

type cite = {
    ref:string,
    authors:string,
    title:string,
    years:string
}

type TexToHtmlParams = (attrs?:TexAttribute, content?:any, text?:any)=>string
type Cite = {
    id: string;
    type: string;
    data: Record<string,string>;
  };
