import { Mark, type CommandProps } from "@tiptap/core";
type RefOption = {
  ref: string;
  type: "img" | "tab";
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    ref: {
      setRef: (attributes: RefOption) => ReturnType;

      toggleRef: (attributes: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType;

      unsetRef: () => ReturnType;
    };
  }
}

export const Ref = Mark.create<RefOption>({
  name: "ref",
  group: "block",
  content: "inline*",
  defining: true,
  addAttributes: () => {
    return {
      ref: {
        default: "",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[ref]",
        getAttrs: (attr) => {
          return false;
        },
      },
    ];
  },
  addCommands(): any {
    return {
      setRef:
        (attrs: RefOption) =>
        ({ chain }: CommandProps) => {
          return "";
        },
    };
  },
});
