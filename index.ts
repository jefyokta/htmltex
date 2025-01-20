import { Parser } from "htmlparser2";
import { LabeledImage } from "./src/components/image";
import { convertHtmlToLatex } from "./src/converter";
import { convertLatexToHtml } from "./src/converter";


const el = document.getElementById('page')
if (el) {
  el.innerHTML = LabeledImage({src:"test.jpg",caption:"Gambar",centered:true})
}
const changeWith =(node:Node)=>{

  const selection = window.getSelection()
  if (selection) {
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();
      node.textContent = selectedText
      range.deleteContents(); 
      range.insertNode(node); 

    }
  }

}
/**
 * Mengganti elemen baris tempat kursor berada dengan elemen baru.
 * @param newTagName - Nama tag baru yang akan menggantikan elemen lama (contoh: 'h1').
 * @param mutating - Callback untuk memodifikasi elemen baru sebelum menggantikan elemen lama.
 */
const changeLineTag = (newTagName: string, mutating: (newElement: HTMLElement) => void) => {
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
