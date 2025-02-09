import { Node, mergeAttributes, type CommandProps } from "@tiptap/core";

export type PageOption = {
    content:any;
}
export const Page = Node.create<PageOption>({
  name: "page",
  group: "block",
  content: "block*",
  defining: true,
  atom:false,



  parseHTML() {
    return [
      {
        tag: "div.page",
    
      },
    ];
  },
  

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "page" }),
    this.options.content || 0, 
    ];
  },
  addCommands():Partial<any> {
    return {
      addPage:
        (number:number) =>
        ({ chain }:CommandProps) => {
          return chain()
            .insertContent({ type: "page" })
            .focus()
            .run();
        },
    };
  },
});
