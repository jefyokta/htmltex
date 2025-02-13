export function paginate(editor: any) {
  const proseMirror = document.querySelector(".ProseMirror");
  if (!proseMirror) return;

  const blocks = Array.from(proseMirror.children); // Semua elemen di editor
  const pageHeight = 800; // Misalnya batas tiap halaman 800px
  let currentHeight = 0;
  let lastBreak: any = null;

  blocks.forEach((block) => {
    const blockHeight = block.getBoundingClientRect().height;
    currentHeight += blockHeight;

    // Jika tinggi halaman melebihi batas, cari titik potong
    if (currentHeight > pageHeight) {
      if (lastBreak) {
        lastBreak.classList.add("page-break");
        currentHeight = blockHeight; // Reset tinggi halaman baru
      }
    } else {
      lastBreak = block; // Simpan elemen terakhir sebelum batas
    }
  });
}
