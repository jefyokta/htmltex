// src/components/table.ts
var parseFieldPattern = (fieldpattern) => {
  return fieldpattern.split("|").map((char) => {
    switch (char) {
      case "c":
        return "text-align: center;";
      case "l":
        return "text-align: left;";
      case "r":
        return "text-align: right;";
      default:
        return char;
    }
  });
};
var table = ({
  caption,
  fieldpattern,
  rows,
  border = 1
}) => {
  const styles = parseFieldPattern(fieldpattern);
  const colgroup = styles.map((style) => `<col style="${style}">`).join("");
  const tableRows = rows.map((row) => `<tr>${row.map(({ content, colspan, rowspan }) => `<td contenteditable ${colspan ? ` colspan="${colspan}"` : ""}${rowspan ? ` rowspan="${rowspan}"` : ""}>${content}</td>`).join("")}</tr>`).join("");
  return `
      <table border="${border}">
        ${caption ? `<caption>${caption}</caption>` : ""}
        <colgroup>
          ${colgroup}
        </colgroup>
       
      </table>
    `;
};

// table.ts
var tableHTML = table({
  caption: "Example Table",
  fieldpattern: "l|l|l",
  rows: [
    [
      { content: "Header 1" },
      { content: "Header 2" },
      { content: "Header 3" }
    ],
    [
      { content: "Row 1, Col 1" },
      { content: "Row 1, Col 2", colspan: 2 }
    ],
    [
      { content: "Row 2, Col 1", rowspan: 2 },
      { content: "Row 2, Col 2" },
      { content: "Row 2, Col 3" }
    ],
    [
      { content: "Row 3, Col 2" },
      { content: "Row 3, Col 3" }
    ]
  ],
  border: 2
});
document.body.innerHTML = tableHTML;
