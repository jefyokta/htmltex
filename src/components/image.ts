import { generateUniqueId } from "../utils"

type ImageOptions = {
    src:string,
    width?:string|undefined
    caption:string
    centered:boolean,
    cite?:string|undefined;
}

export const LabeledImage = (options:ImageOptions) =>{

    const label  =  generateUniqueId();

    return `<figure ${options.centered ?'style="text-align:center"':""} id="${label}">
         <image src="${options.src}" style="width:${options.width || '200px'}">
         <figcaption>${options.cite ? `<a href="${options.cite}"></a>` : options.caption}</figcaption>
    </figure>`

}