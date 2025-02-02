import { handleFigureCaption, reRenderKatex } from "../actions";
import { Editor as TipTapEditor, type EditorEvents } from "@tiptap/core";
import { LabeledImage } from "../tiptap-extensions";
import { style as s } from "../../dist/style";
import StarterKit from "@tiptap/starter-kit";
import { convertHtmlToLatex, convertLatexToHtml } from "../converter";
import { Listener } from "../events/listener";
import { TexVarExtension } from "../tiptap-extensions/var";

type EditorOptions = {
  element: HTMLElement | null;
  content: string;
  tiptapextensions?: any;
};

export default class Editor {
  private editor: TipTapEditor | undefined;
  private listener: Listener;

  constructor(private options: EditorOptions) {
    this.injectStyle().handleTipTapEditor().handleFigureCaptions();
    this.listener = new Listener();
  }

  private handleFigureCaptions() {
    handleFigureCaption(this.options.element);
  }

  private handleTipTapEditor() {
    const page = document.createElement("div");
    page.classList.add("page");
    page.id = "page";
    this.options.element?.append(page);

    this.editor = new TipTapEditor({
      element: page,
      extensions: [LabeledImage, StarterKit,TexVarExtension,  ...this.options.tiptapextensions],
      content: this.options.content,
      editable: true,
    });
    return this;
  }

  public replaceContent(content: string) {
    this.editor!.commands.setContent(content);
  }
  public replaceContenFromLatex(latex: string) {
    const content = convertLatexToHtml(latex);

    this.editor!.commands.setContent(content);
    return this;
  }
  public reRender() {
    this.replaceContenFromLatex(this.getHtml())
      .reRenderKatex()
      .handleFigureCaptions();
  }
  public getListener() {
    return this.listener;
  }

  public getHtml() {
    return this.editor!.getHTML();
  }

  public getElement() {
    return this.options.element;
  }

  public getLatex() {
    return convertHtmlToLatex(this.getHtml());
  }

  private getStyle(): string {
    return s;
  }

  public reRenderKatex() {
    reRenderKatex(this.options.element);
    return this;
  }

  private injectStyle() {
    const style = document.createElement("style");
    style.innerHTML = this.getStyle();
    document.head.appendChild(style);
    return this;
  }

  public editorOn(event: keyof EditorEvents, callback: any) {
    this.editor?.on(event, callback);
  }
  public getEditor() {
    return this.editor;
  }
}
