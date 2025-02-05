import { Node, mergeAttributes } from "@tiptap/core";
import { CenteredLabeledImage, generateUniqueId } from "../utils";

export const LabeledImage = Node.create<ImageOptions>({
  name: "labeledImage",

  group: "block",

  content: "inline*",

  defining: true,

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
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const label = generateUniqueId();
    const { src, width, caption, centered, cite } = node.attrs;

    return [
      "figure",
      mergeAttributes(HTMLAttributes, {
        id: label,
        style: centered ? CenteredLabeledImage : "",
      }),
      [
        "img",
        {
          src,
          style: `width:${width}`,
        },
      ],
      [
        "figcaption",
        {
          content: `${caption}${cite ? cite : ""}`,
        },
      ],
    ];
  },

  addCommands(): Partial<any> {
    return {
      insertLabeledImage:
        (attrs: {
          src: string;
          width: string;
          caption: string;
          centered: boolean;
          cite: string;
        }) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs,
            content: [{ type: "text", text: attrs.caption }],
          });
        },

      setLabeledImage:
        (attrs: {
          src: string;
          width: string;
          caption: string;
          centered: boolean;
          cite: string;
        }) =>
        ({ commands }: any) => {
          return commands.setNodeMarkup(this.name, attrs);
        },

      deleteLabeledImage:
        () =>
        ({ commands }: any) => {
          return commands.deleteNode();
        },
    };
  },
});
