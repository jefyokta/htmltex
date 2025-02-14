type TableCell = {
  content: string;
  colspan?: number;
  rowspan?: number;
};

type TableRow = TableCell[];

type TableOptions = {
  caption?: string;
  fieldpattern: string;
  rows: TableRow[];
  border?: number;
};

const parseFieldPattern = (fieldpattern: string): string[] => {
  return fieldpattern.split("|").map((char) => {
    switch (char) {
      case "c":
        return "text-align: center;";
      case "l":
        return "text-align: left;";
      case "r":
        return "text-align: right;";
      default:
        return `width:${char};`;
    }
  });
};

type NormalTable = {
  rows: number;
  cols: number;
  type: "tabular" | "longtable";
};

export const table = ({
  caption,
  fieldpattern,
  rows,
  border = 1,
}: TableOptions): string => {
  const styles = parseFieldPattern(fieldpattern);

  const colgroup = styles.map((style) => `<col style="${style}">`).join("");

  const tableRows = rows
    .map(
      (row) =>
        `<tr>${row
          .map(
            ({ content, colspan, rowspan }) =>
              `<td${colspan ? ` colspan="${colspan}"` : ""}${
                rowspan ? ` rowspan="${rowspan}"` : ""
              }>${content}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("");

  return `
      <table border="${border}">
        ${caption ? `<caption>${caption}</caption>` : ""}
        <colgroup>
          ${colgroup}
        </colgroup>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
};
const tableHTML = table({
  caption: "Example Table",
  fieldpattern: "c|l|r",
  rows: [
    [{ content: "Header 1" }, { content: "Header 2" }, { content: "Header 3" }],
    [{ content: "Row 1, Col 1" }, { content: "Row 1, Col 2", colspan: 2 }],
    [
      { content: "Row 2, Col 1", rowspan: 2 },
      { content: "Row 2, Col 2" },
      { content: "Row 2, Col 3" },
    ],
    [{ content: "Row 3, Col 2" }, { content: "Row 3, Col 3" }],
  ],
  border: 1,
});

export const simplelTable = (opt: NormalTable) => {
  const { rows, cols, type } = opt;
  let el = "";
  let col = "";
  for (let i = 0; i < cols; i++) {
    col +=
      '<td contenteditable style="text-align:left;max-width:200px;width:200px;;"></td>';
  }
  for (let index = 0; index < rows; index++) {
    el += `
        <tr>
        ${col}
        </tr>`;
  }
  return `<table type="${type}" border="1" style="text-align:left">
    ${el}
    </table>`;
};
