export type CiteLanguage ={
    conjunction:string 
    etal:string 
}

type CiteUtilsOptions = {
    lang?:CiteLanguage 
    cite:Cite
}

export  class CiteUtils {
    private cite:Cite;
    private lang:CiteLanguage = CiteLangID
    private maxAuthors = 5

    constructor(options:CiteUtilsOptions){
        this.cite = options.cite
        if (options.lang) this.lang = options.lang
    }
    toCiteA():string{
        return `${this.formatAuthorname()} (${this.cite.data.year})`

    }
    setCite(cite:Cite){
        this.cite = cite
        return this
    }

    setOptions(options:CiteUtilsOptions){
        this.cite = options.cite
        if (options.lang) this.lang = options.lang
        return this

    }
    setMaxAuthors(maxAuthors:number){
        this.maxAuthors = maxAuthors
        return this
    }

    setLang(lang:CiteLanguage){
        this.lang = lang
        return this
    }

    getTitle(){
        return this.cite.data.title
    }

    formatAuthorname(){
        const names = this.cite.data.author
        if (!names) return "";

        const arr = names.split(" and ");
      const nameArray =  arr.map(name=>{
            if (name.includes(",")){
                const nameParts = name.split(",")
                return ` ${nameParts[0]}`.trim()
                
            }
            return name
        })
    
        if (nameArray.length > this.maxAuthors) {
            return nameArray.slice(0, 5).join(", ") + " "+this.lang.etal;
        }
    
        if (nameArray.length > 1) {
            return nameArray.slice(0, -1).join(", ") + ` ${this.lang.conjunction} ` + nameArray[nameArray.length - 1];
        }
    
        return names;
        
    }

}

export const CiteLangID:CiteLanguage = {
    conjunction:"dan",
    etal:"dkk."
}

export const CiteLangEN:CiteLanguage = {
    conjunction:"and",
    etal:"et al."
}