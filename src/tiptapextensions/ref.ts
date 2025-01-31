import { Node } from "@tiptap/core";

export const Ref = Node.create({
    name: 'ref',
    group: 'block',
    content: 'inline*',
    defining: true,
    addAttributes:()=>{
        return {
            ref:{
                default:''
            }
        }
    },
    parseHTML(){
        return [
            {
                tag:'a',
             
            }
        ]
    },
    renderHTML({node,HTMLAttributes}){
        return ['a',{
            class:"ref",ref:node.attrs.ref
        },`[${node.attrs.ref}]`]
    }
})