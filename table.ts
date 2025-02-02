import { simplelTable } from "./src/components/table";

const table = simplelTable({ rows: 9, cols: 5, type: "longtable" });

document.body.innerHTML = table;
