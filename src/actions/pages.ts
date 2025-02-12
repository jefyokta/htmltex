export const updatePagination = (editorElement: HTMLElement) =>{
    const content = editorElement;
    const lines = content.children;
    let height = 0;
    const pageHeight = 297 * 3.78; // Konversi mm ke px (1 mm ≈ 3.78 px)
  
    document.querySelectorAll(".page-break").forEach((pb) => pb.remove());
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] as HTMLElement;
      height += line.offsetHeight;
  
      if (height > pageHeight) {
        const pageBreak = document.createElement("div");
        pageBreak.className = "page-break";
        content.insertBefore(pageBreak, line);
        height = line.offsetHeight; 
      }
    }
  }
  
