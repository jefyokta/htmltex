import { table } from "./src/components/table";


const tableHTML = table({
    caption: "Example Table",
    fieldpattern: "l|l|l", 
    rows: [
      [
        { content: "Header 1" },
        { content: "Header 2" },
        { content: "Header 3" },
      ],
      [
        { content: "Row 1, Col 1" },
        { content: "Row 1, Col 2", colspan: 2 },
      ],
      [
        { content: "Row 2, Col 1", rowspan: 2 },
        { content: "Row 2, Col 2" },
        { content: "Row 2, Col 3" },
      ],
      [
        { content: "Row 3, Col 2" },
        { content: "Row 3, Col 3" },
      ],
    ],
    border: 2,
  });
  

  document.body.innerHTML = tableHTML