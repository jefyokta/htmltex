import { Node, mergeAttributes } from "@tiptap/core";
import LatexVariable from "../converter/tex-variable";

type VarExtensionOptions = {
  varname: string;
};

export const TexVarExtension = Node.create<VarExtensionOptions>({
  name: "var",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      varname: {
        default: "",
        parseHTML: (element) => element.getAttribute("var") || "",
        renderHTML: (attributes) => ({
          var: attributes.var,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[var]",
      },
    ];
  },

  renderHTML({ node }) {
    const val = LatexVariable.get(node.attrs.varname);
    if (!val) {
      return `\\${node.attrs.varname}`;
    }
    return [
      "span",
      mergeAttributes({ var: node.attrs.varname, class: "latex-var" }),
      val,
    ];
  },

  addCommands(): any {
    return {
      insertTexVar:
        (varname: string) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: { varname },
          });
        },
    };
  },
});
