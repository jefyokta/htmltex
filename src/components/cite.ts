   
export const citeA = (cite:Cite)=>{
        return `<a cite="a" citeId="${cite.id}>${cite.data?.author} (${cite.data?.year})</a>`
}

export const cite = (cite:Cite) =>{
    return `<a cite="normal" citeId="${cite.id}">${cite.data?.author} (${cite.data?.year})</a>`

}