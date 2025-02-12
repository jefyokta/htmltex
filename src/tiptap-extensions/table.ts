import type { CommandProps } from "@tiptap/core";
import Table, { type TableOptions } from "@tiptap/extension-table";

export type TexTableOptions = {
  type: "longtable" | "tabular";
  cells: string;
  caption: string;
  label?: string;
  option?: string;
};

const TexTable = Table.extend<TableOptions, TexTableOptions>({
  addAttributes() {
    return {
      ...this.parent?.(),
      cells: {
        default: "|c|c|c|",
        parseHTML: (element) => element.getAttribute("cells") || "|c|c|c|",
        renderHTML: (attributes) => ({ cells: attributes.cells }),
      },
      caption: {
        default: "",
        parseHTML: (element) =>
          element.querySelector("caption")?.textContent || "",
        renderHTML: (attributes) =>
          attributes.caption ? ["caption", {}, attributes.caption] : null,
      },
      label: {
        default: "",
        parseHTML: (element) => element.getAttribute("label") || "",
        renderHTML: (attributes) =>
          attributes.label ? { label: attributes.label } : {},
      },
      option: {
        default: "c",
        parseHTML: (element) => element.getAttribute("option") || "c",
        renderHTML: (attributes) =>
          attributes.option ? { option: attributes.option } : {},
      },
      type: {
        default: "longtable",
        parseHTML: (element) => element.getAttribute("type") || "longtable",
        renderHTML: (attributes) =>
          attributes.type ? { type: attributes.type } : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "table",
        getAttrs: (element) => ({
          type: element.getAttribute("type") || "longtable",
          cells: element.getAttribute("cells") || "|c|c|c|",
          caption: element.querySelector("caption")?.textContent || "",
          label: element.getAttribute("label") || "",
          option: element.getAttribute("option") || "c",
        }),
        contentElement: "tbody",
      },
    ];
  },

  renderHTML({ node }) {
    const cellStyles = node.attrs.cells
      .split("|")
      .filter((r: string) => r.trim().length > 0);

    const caption = node.attrs.caption;

    return [
      "table",
      {
        type: node.attrs.type,
        cells: node.attrs.cells,
        label: node.attrs.label,
        option: node.attrs.option,
      },
      ...(caption ? [["caption", {}, caption]] : []),
      [
        "colgroup",
        {},
        ...cellStyles.map((r: string) => ["col", { style: "" }]),
      ], //incomplete
      ["tbody", {}, ["tr", {}, ...cellStyles.map(() => ["td", {}, 0])]],
    ];
  },

  addCommands(): any {
    return {
      insertTexTable:
        (options: Partial<TexTableOptions> = {}) =>
        ({ chain }: CommandProps) => {
          const cellFormats = options.cells?.split("|") || ["c", "c", "c"];

          return chain()
            .insertContent({
              type: this.name,
              attrs: {
                type: options.type || "longtable",
                cells: options.cells || "|c|c|c|",
                caption: options.caption || "",
                label: options.label || "",
                option: options.option || "c",
              },
              content: [
                {
                  type: "tableRow",
                  content: cellFormats.map((format) => ({
                    type: "tableCell",
                    attrs: { style: format },
                    content: [{ type: "paragraph" }],
                  })),
                },
              ],
            })
            .focus()
            .run();
        },
    };
  },
});

export default TexTable;
