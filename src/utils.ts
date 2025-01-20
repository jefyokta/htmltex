const escapeLatex = (text: string): string => {
    return text
        .replace(/\\/g, '\\textbackslash ')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\$/g, '\\$')
        .replace(/%/g, '\\%')
        .replace(/_/g, '\\_')
        .replace(/#/g, '\\#')
        .replace(/&/g, '\\&')
        .replace(/~/g, '\\textasciitilde ')
        .replace(/\^/g, '\\textasciicircum ');
 }
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export const indexDb = () =>{

    const request = indexedDB.open('citations')
}

export default escapeLatex;
