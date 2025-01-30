import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { htmlToTex } from ".";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { convertHtmlToLatex } from "./src/converter";



const editor = new Editor({
    element: document.querySelector("#page")||undefined,
    extensions:[
        StarterKit,
    ],
    content:htmlToTex,
    editable: true,
})

const content =document.querySelector('.tiptap')

if(content){
  const res = convertHtmlToLatex(content.innerHTML)
  console.log(res);
  
}