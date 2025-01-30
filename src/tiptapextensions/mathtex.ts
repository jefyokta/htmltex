
import { Node } from "@tiptap/core"
export const MathTex = Node.create({
    name:'mathtex',
    group:'block',
    content:'inline*',
    defining:true,
    addAttributes(){
        return {
            tex:{
                default:''
            }
        }
    },

})