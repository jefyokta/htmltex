import { mergeAttributes, Node } from "@tiptap/core";
import { latexPlaceHolder, parseLatexPlaceHolder } from "../utils";

type KatexOption = { content: string };
export const MathTex = Node.create<KatexOption>({
  name: "katex",
  group: "block",
  content: "inline*",
  defining: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: "x-katex",
        getAttrs(node): KatexOption {
          return {
            content: latexPlaceHolder(node.getAttribute("content") || ""),
          };
        },
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "x-katex",
      mergeAttributes(HTMLAttributes, node.attrs.content),
      parseLatexPlaceHolder(node.attrs.content),
    ];
  },
  addCommands(): Partial<any> {
    return {
      insertKatex:
        (attrs: KatexOption) =>
        ({ command }: any) => {
          return command.insertContent({
            type: this.name,
            attrs,
            content: parseLatexPlaceHolder(attrs.content),
          });
        },
    };
  },
});
