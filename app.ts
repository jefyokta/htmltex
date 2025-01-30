import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { htmlToTex } from ".";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { convertHtmlToLatex } from "./src/converter";
import { LabeledImage } from "./src/tiptapextensions/image";



const editor = new Editor({
    element: document.querySelector("#page")||undefined,
    extensions:[
        StarterKit,
        LabeledImage
    ],
    content:htmlToTex,
    editable: true,
})


