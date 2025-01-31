

export default class LatexVariable {
    private variables:Record<string,string>;
    constructor(variables:string){
        this.variables = this.#getLatexVariable(variables)
    }
    get(key:string){
        return this.variables[key]
    }
    getAll(){
        return this.variables
    }
    #getLatexVariable = (variables: string) => {
        const pattern = /\\var{([\w]+)}{([^{}]+)}/g;
        
        const matches = [...variables.matchAll(pattern)];
        const varObject:Record<string,string> = {};
       matches.map((match) => {
    
            const [, key, value] = match;
            varObject[key] = value;
            
        })
        return varObject;
    }
    convertToLatex(){
        return Object.entries(this.variables).map(([key,value])=>{
            return `\\var{${key}}{${value}}`
        }).join("\n")
    }
}
