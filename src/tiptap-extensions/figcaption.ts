import { Node } from "@tiptap/core";

type FigCaptionProps = {
    content: any
}


export const FigCaption = Node.create<FigCaptionProps>({

    content: "inline* cite",
    parseHTML(){
        return [
            {tag:"figcaption"}
        ]
    },
    selectable:false,
    draggable:false,
    renderHTML({HTMLAttributes}){
        return ['figcaption',HTMLAttributes,0]
    }
   

})