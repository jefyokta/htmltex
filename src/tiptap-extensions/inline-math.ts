import { Node } from "@tiptap/core";

export const InlineMath = Node.create<{ content: string }>({
  name: "inlineMath",
  group: "inline",
});
