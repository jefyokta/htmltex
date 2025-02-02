import { Node, mergeAttributes } from "@tiptap/core";
import CiteManager from "../cite/cite-manager";
import { formatAuthorName } from "../components/cite";
import { CiteUtils } from "../cite";

type CiteOptions = {
  cite: string;
  citeA: boolean;
};

export const Cite = Node.create<CiteOptions>({
  name: "cite",
  group: "inline", 
  inline: true,
  atom: true,
  addAttributes() {
    return {
      cite: {
        default: "",
        parseHTML: (element) => element.getAttribute("cite") || "",
        renderHTML: (attributes) => ({ cite: attributes.cite }),
      },
      citeA: {
        default: false,
        parseHTML: (element) => element.hasAttribute("citeA"),
        renderHTML: (attributes) => (attributes.citeA ? { citeA: "true" } : {}),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "cite[cite]",
      },
    ];
  },

  renderHTML({ node }) {
    const cite = CiteManager.get(node.attrs.cite);
    if (!cite) {
      return ["cite", { class: "cite", cite: "not-found" }, "(Citation Not Found)"];
    }
    const c =new CiteUtils({cite:cite})

    return [
      "cite",
      mergeAttributes({ class: "cite",cite:cite.id }),
      c.toCite()
      ,
    ];
  },

  addCommands():any {
    return {
      insertCitation:
        (citeId: string) =>
        ({ commands }:any) => {
          return commands.insertContent({
            type: this.name,
            attrs: { cite: citeId },
          });
        },
    };
  },
});
