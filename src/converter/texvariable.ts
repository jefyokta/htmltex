

export default class LatexVariable {
    private static variables: Record<string, string> = {}; 
 
    static get(key: string) {
        console.log(key);
        
        return LatexVariable.variables[`\\${key}`] || null; 
    }
 
    static getAll() {
        return { ...LatexVariable.variables }; 
    }
 
    static set(key: string, value: string) {

        LatexVariable.variables[`\\${key}`] = value; 
    }
 
    static getLatexVariable(variables: string) {
        const pattern = /\\var\{(\\[^{}]+)\}\{([^{}]+)\}/g
;
        const matches = [...variables.matchAll(pattern)];
        
        
        
        return matches.reduce((acc, match) => {
            const [, key, value] = match;
            acc[key] = value;
            
            return LatexVariable.variables = acc;
        }, {} as Record<string, string>);
    }
 
    static convertToLatex() {
        return Object.entries(LatexVariable.variables)
            .map(([key, value]) => `\\var{${key}}{${value}}`)
            .join("\n");
    }
 }
 