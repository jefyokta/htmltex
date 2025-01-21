   
export const citeA = (cite:Cite)=>{
        return `<a cite="a" citeId="${cite.id}>${cite.data?.author} (${cite.data?.year})</a>`
}

export const cite = (cite:Cite) =>{
    return `<a cite="normal" citeId="${cite.id}">(${cite.data?.author}, ${cite.data?.year})</a>`

}

export const formatAuthorName = (names:string)=>{

    if (names.includes(' and ')) {
        const arrnames = names.split(' and ')
        let result = ''

        arrnames.map(n=>{
            result += n +','
        })
        return result
        
    }
    return names

}