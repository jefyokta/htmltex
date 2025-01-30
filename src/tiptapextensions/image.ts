import { Node, mergeAttributes } from '@tiptap/core';
import { generateUniqueId } from '../utils';  

export const LabeledImage = Node.create({
  name: 'labeledImage',

  group: 'block',

  content: 'inline*',

  defining: true,

  addAttributes() {
    return {
      src: {
        default: '',
      },
      width: {
        default: '200px',
      },
      caption: {
        default: '',
      },
      centered: {
        default: false,
      },
      cite: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const label = generateUniqueId();  // Generate unique ID for the figure
    const { src, width, caption, centered, cite } = node.attrs;

    return [
      'figure',
      mergeAttributes(HTMLAttributes, { id: label, style: centered ? 'text-align:center' : '' }),
      [
        'img',
        {
          src,
          style: `width:${width}`,
        },
      ],
      [
        'figcaption',
        cite
          ? `<a href="${cite}">${caption}</a>`
          : caption,
      ],
    ];
  },

//   addCommands() {
//     return {
//       setLabeledImage:
//         (options:ImageOptions) =>
//         ({ commands }:any) => {
//           return commands.insertContent({
//             type: this.name,
//             attrs: options,
//           });
//         },
//     };
//   },
});
