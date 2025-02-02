import { generateUniqueId } from "../utils";

import { Node, mergeAttributes } from "@tiptap/core";

export const MyLabeledImage = (options: ImageOptions) => {
  const label = generateUniqueId();

  return `<figure ${options.centered ? 'style="text-align:center"' : ""} id="${label}">
         <image src="${options.src}" style="width:${options.width || "200px"}">
         <figcaption>${options.cite ? `<a href="${options.cite}"></a>` : options.caption}</figcaption>
    </figure>`;
};

export const LabeledImage = Node.create({
  name: "labeledImage",

  group: "block",

  content: "inline*",

  defining: true,

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
        style: centered ? "text-align:center" : "",
      }),
      [
        "img",
        {
          src,
          style: `width:${width}`,
        },
      ],
      ["figcaption", cite ? `<a href="${cite}">${caption}</a>` : caption],
    ];
  },

  addCommands() {
    return {
      setLabeledImage:
        (options: any) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
