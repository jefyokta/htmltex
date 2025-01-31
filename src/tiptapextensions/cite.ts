import { Node } from "@tiptap/core";
import CiteManager from "../cite/citemanager";
import { formatAuthorName } from "../components/cite";

type CiteOptions = {
    cite:Cite;
}
export const Cite = Node.create<CiteOptions>({
    name: 'cite',
    group: 'block',
    content: 'inline*',
    defining: true,
    addAttributes:()=>{
        return {
            cite:{
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
        const cite = CiteManager.get(node.attrs.cite)
        return ['a',{
            class:"cite",citeId:cite?.id,cite:'normal'
        },`(${formatAuthorName(cite?.data?.author || 'unknown')}, ${cite?.data?.year})`]
    }
  
})


export const CiteA= Node.create<CiteOptions>({
    name: 'cite',
    group: 'block',
    content: 'inline*',
    defining: true,
    addAttributes:()=>{
        return {
            cite:{
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
        const cite = CiteManager.get(node.attrs.cite)
        return ['a',{class:"cite",citeId:cite?.id,cite:'a'},`${formatAuthorName(cite?.data?.author || 'unknown')} (${cite?.data?.year})`]
    },
    addCommands:():Partial<any>=>{
        return {
            setCite:(attrs:CiteOptions)=> ( {commands}:any)=>{
                    return commands.updateAttributes('cite',{cite:'a'})
                
            },
            insertCite:(attrs:CiteOptions)=>({commands}:any)=>{
                return commands.insertContent({
                    type:'cite',
                    attrs:attrs
                })
            }
        }
    }
  
})