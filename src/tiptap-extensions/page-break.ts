import { Node, type CommandProps } from "@tiptap/core";
import { style } from "../../dist/style";

const PageBreak = Node.create({
  name: "pageBreak",

  group: "block",

  parseHTML() {
    return [{ tag: "div[break]" }];
  },

  renderHTML({ node,HTMLAttributes }) {
    return [
      "div",
      {
        class: "page-break",
        style: "height:" + node.attrs.break,
        break: node.attrs.break,
      },
    ];
  },

  addCommands(): any {
    return {
      addPageBreak:
        () =>
        ({ commands }: CommandProps) => {
          return commands.insertContent("<div class='page-break'></div>");
        },
    };
  },
});

export default PageBreak;
