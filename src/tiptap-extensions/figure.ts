import { Node, mergeAttributes, type CommandProps } from "@tiptap/core";
import { CenteredLabeledImage, generateUniqueId } from "../utils";
import CiteManager from "../cite/cite-manager";
import { CiteUtils } from "../cite";

export type FigureOptions = {
  src: string;
  width?: string | undefined;
  caption: string;
  centered: boolean;
  cite?: string | undefined;
  label: string;
};
export const Figure = Node.create<FigureOptions>({
  name: "figure",

  group: "block",

  content: "inline*",

  defining: true,
  isolating:true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: "",
      },
      width: {
        default: "200px",
      },
      caption: {
        default: "",
      },
      centered: {
        default: false,
      },
      cite: {
        default: "",
      },
    };
  },
  addOptions: () => {
    return {
      src: "",
      width: "200px",
      caption: "",
      centered: true,
      cite: "",
      label: "",
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        getAttrs(node): FigureOptions {
          return {
            src: node.getAttribute("src") || "",
            width: node.getAttribute("width") || undefined,
            caption: node.getAttribute("caption") || "",
            centered: node.getAttribute("centered") ? true : false,
            cite: node.getAttribute("cite") || undefined,
            label: node.getAttribute("label") || "",
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const label = generateUniqueId();
    const { src, width, caption, centered, cite } = node.attrs;

    const ct = CiteManager.get(cite);

    return [
      "figure",
      mergeAttributes(HTMLAttributes, {
        id: label,
        style: centered ? CenteredLabeledImage : "",
      }),
      [
        "img",
        {
          src:src,
          style: `${width}`,
        },
      ],
      [
        "figcaption",
        {
          content: `${caption} ${ct ? new CiteUtils(ct).toCite() : ""}`,
          
        },caption
      ],
    ];
  },

  addCommands(): Partial<any> {
    return {
      setLabeledImage:
        (attrs: {
          src: string;
          width: string;
          caption: string;
          centered: boolean;
          cite: string;
        }) =>
        ({ commands}: CommandProps) => {
          return commands.updateAttributes(this.name, attrs);
        },

      deleteLabeledImage:
        () =>
        ({ commands,editor }: CommandProps) => {
        
          return commands.deleteNode(this.name);
        },
    };
  },
});
