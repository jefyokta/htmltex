import { bibToObject } from "./citeconverter"

const citeManager = (cite:string)=>{
    const cites = bibToObject(cite)
    localStorage.setItem("cites",JSON.stringify(cites))
}

export default class CiteManager {

    constructor(cite:string){
        citeManager(cite)
    }
   static #getAll(){
       const cites:Cite[] = JSON.parse(localStorage.getItem("cites")||"[]")
       return cites
    }

   static get(key:string){
        const cites:Cite[] = this.#getAll()
        return cites.find((cite:any)=>cite.id===key)
    }
   static update(key:string, data:Record<string,string>){
        const cites:Cite[]  = CiteManager.#getAll()
        const index = cites.findIndex((cite:any)=>cite.id===key)
        cites[index].data = data
        localStorage.setItem("cites",JSON.stringify(cites))
    }
   static delete(key:string){
        const cites:Cite[]  = CiteManager.#getAll()
        const index = cites.findIndex((cite:any)=>cite.id===key)
        cites.splice(index,1)
        localStorage.setItem("cites",JSON.stringify(cites))
    }

   static add(cite:Cite){
        const cites:Cite[] = CiteManager.#getAll()
        cites.push(cite)
        localStorage.setItem("cites",JSON.stringify(cites))
    }
}