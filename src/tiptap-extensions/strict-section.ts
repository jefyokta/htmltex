import { Node } from "@tiptap/core";

type StrictSectionOption = {
  content: string;
};

export const StrictSection = Node.create<StrictSectionOption>({
  name: "strictSection",
  atom: true,
  defining: true,
  parseHTML() {
    return [{ tag: "h2[content]" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ["h2", { content: node.attrs.content }, node.attrs.content];
  },
});
