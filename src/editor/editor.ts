import { handleFigureCaption } from "../actions";
import {  Editor as TipTapEditor, type EditorEvents } from "@tiptap/core";
import { LabeledImage } from "../tiptapextensions";
import { style as s } from "../../dist/style";
import StarterKit from "@tiptap/starter-kit";
import { convertHtmlToLatex } from "../converter";


type EditorOptions = {
    element: HTMLElement ;
    content:string;
   
}

export default class Editor {
    private editor:TipTapEditor|undefined

    constructor(private options:EditorOptions){
        this.injectStyle().handleTipTapEditor().handleFigureCaptions()
    }

    private handleFigureCaptions(){
        handleFigureCaption(this.options.element);


    }

    public handleTipTapEditor(){

        const page = document.createElement('div')
        page.classList.add('page')
        page.id = 'page'
        this.options.element.append(page)

        this.editor = new TipTapEditor({
            element: page,
            extensions:[LabeledImage,StarterKit],
            content:this.options.content,
            editable:true
        });
        return this
    }

    public getHtml(){
        return this.editor!.getHTML()
    }
    
    public getElement(){
        return this.options.element
    }

    public getLatex(){
        return convertHtmlToLatex(this.getHtml())
    }

    private getStyle():string{
        return s
    }

    private injectStyle(){
        const style = document.createElement('style');
        style.innerHTML = this.getStyle();
        document.head.appendChild(style);
        return this
    }

    public editorOn(event:keyof EditorEvents,callback:any){
        this.editor?.on(event,callback)
    }
}
