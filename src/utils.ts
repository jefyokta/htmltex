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
export const CenteredLabeledImage:string = 'display:flex;flex-direction:column;align-items:center;'



/**
 * @param newTagName 
 * @param mutating 
 */
export const changeLineTag = (newTagName: string, mutating: (newElement: HTMLElement) => void) => {
    const selection = window.getSelection();
  
    if (selection && selection.anchorNode) {
      const anchorNode = selection.anchorNode;
      const lineElement = anchorNode.nodeType === 3 ? anchorNode.parentNode : anchorNode;
  
      if (lineElement instanceof HTMLElement) {
        const newElement = document.createElement(newTagName);
  
        if (lineElement.tagName === newElement.tagName) {
          lineElement.replaceWith('p')
          return
        }
  
        newElement.innerHTML = lineElement.innerHTML;
  
        mutating(newElement);
  
        lineElement.replaceWith(newElement);
  
        console.log(`Elemen lama diganti dengan: <${newTagName}>`);
      }
    }
  };

export default escapeLatex;
