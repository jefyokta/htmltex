import { Node } from "@tiptap/core";
export const MathTex = Node.create({
  name: "katex",
  group: "block",
  content: "inline*",
  defining: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: "katex",
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ["katex", HTMLAttributes, node.content.content];
  },
  addCommands(): Partial<any> {
    return {
      insertKatex:
        (latex: string) =>
        ({ command }: any) => {
          return command.insertContent({
            type: this.name,
            attrs: [],
            content: latex,
          });
        },
    };
  },
});
