import { handleFigureCaption, reRenderKatex } from "../actions";
import { Editor as TipTapEditor, type EditorEvents } from "@tiptap/core";
import { Cite, Figure } from "../tiptap-extensions";
import { style as s } from "../../dist/style";
import { convertHtmlToLatex, convertLatexToHtml } from "../converter";
import { Listener } from "../events/listener";
import { TexVarExtension } from "../tiptap-extensions/var";
import { VarConverter } from "../tiptap-extensions/var-converter";
import TexTable from "../tiptap-extensions/table";
import TableCell from "@tiptap/extension-table-cell";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";
import History from "@tiptap/extension-history";
import CodeBlock from "@tiptap/extension-code-block";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import { PageDocument } from "../tiptap-extensions/document";
import { Page } from "../tiptap-extensions/page";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";

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
    // page.classList.add("page");
    page.id = "page";
    page.style.overflowY = "auto"
    this.options.element?.append(page);

    this.editor = new TipTapEditor({
      element: page,
      extensions: [
        // StarterKit,
        PageDocument,
        Page,
        Paragraph,
        TexVarExtension,
        VarConverter,
        Cite,
        TexTable,
        TableCell,
        TableRow,
        TableHeader,
        Figure,
        Text,
        Heading,
        ListItem,
        HardBreak,
        OrderedList,
        BulletList,
        HorizontalRule,
        Blockquote,
        History,
        CodeBlock,
        Bold,
        Italic,
        Strike,
        Image,
        Dropcursor
      ],
        content: this.options.content,
      editable: true,
    });
    return this;
  }

  public replaceContent(content: string) {
    this.editor!.commands.setContent(content);
  }
  public replaceContentFromLatex(latex: string) {
    this.replaceContent(convertLatexToHtml(latex));
    return this;
  }

  public reRender() {
    this.replaceContentFromLatex(this.getHtml())
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



