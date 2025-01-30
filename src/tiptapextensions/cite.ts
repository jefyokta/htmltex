import { Node } from "@tiptap/core";

export const Cite = Node.create({
    name: 'cite',
    group: 'block',
    content: 'inline*',
    defining: true,
    parseHTML(){
        return [
            {
                tag:'a',
                attrs:{
                    id:'cite'
                }
            }
        ]
    },
    renderHTML(){
        return ['a',{class:"cite"},0]
    }
  
})