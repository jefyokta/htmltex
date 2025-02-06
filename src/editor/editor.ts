import { handleFigureCaption, reRenderKatex } from "../actions";
import { Editor as TipTapEditor, type EditorEvents } from "@tiptap/core";
import { Cite, Figure } from "../tiptap-extensions";
import { style as s } from "../../dist/style";
import StarterKit from "@tiptap/starter-kit";
import { convertHtmlToLatex, convertLatexToHtml } from "../converter";
import { Listener } from "../events/listener";
import { TexVarExtension } from "../tiptap-extensions/var";
import { VarConverter } from "../tiptap-extensions/var-converter";
import TexTable from "../tiptap-extensions/table";
import TableCell from "@tiptap/extension-table-cell";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";

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
      extensions: [
        StarterKit,
        TexVarExtension,
        VarConverter,
        Cite,
        TexTable,
        TableCell,
        TableRow,
        TableHeader,
        Figure,
      ],
      content: this.options.content,
      editable: true,
    });
    return this;
  }

  public replaceContent(content: string) {
    this.editor!.commands.setContent(content);
  }
  public replaceContenFromLatex(latex: string) {
    this.replaceContent(convertLatexToHtml(latex));
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
