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
          return `width:${char}`;
      }
    });
  };
  
  export const table = ({
    caption,
    fieldpattern,
    rows,
    border = 1,
  }: TableOptions): string => {
    const styles = parseFieldPattern(fieldpattern);
  
    const colgroup = styles
      .map((style) => `<col style="${style}">`)
      .join("");
  
    const tableRows = rows
      .map((row) =>
        `<tr>${row
          .map(
            ({ content, colspan, rowspan }) =>
              `<td contenteditable ${colspan ? ` colspan="${colspan}"` : ""}${
                rowspan ? ` rowspan="${rowspan}"` : ""
              }>${content}</td>`
          )
          .join("")}</tr>`
      )
      .join("");
  
    return `
      <table border="${border}">
        ${caption ? `<caption>${caption}</caption>` : ""}
        <colgroup>
          ${colgroup}
        </colgroup>
          ${tableRows}
      </table>
    `;
  };

  