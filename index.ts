import { LabeledImage } from "./src/components";
import { convertHtmlToLatex } from "./src/converter";
import { convertLatexToHtml } from "./src/converter";


const latexContent = `
\\section{bab 1}
Pada tahap analisa sistem lama atau sistem yang berjalan, penulis melihat langsung bagaimana proses pemesanan berlangsung dimana calon pembeli akan datang ke kantor pemasaran dan merencanakan pemesanan serta menanyakan dokumen yang perlu disiapkan. \\cite{jepi} Lalu dari pihak marketing akan memprosess dokumen yang diberikan oleh calon pembeli.
\\par Berikut adalah uraian dari sistem yang sedang berjalan pada  Pemesanan Rumah di Perumahan Kamela Permai: 
\\begin{enumerate}
    \\item Tamu Menanyakan Syarat Pemesanan: Proses dimulai dengan tamu yang ingin melakukan pemesanan, bertanya kepada staff mengenai syarat-syarat yang diperlukan.
    \\item Staff Memberikan Formulir Pemesanan: Staff memberikan formulir pemesanan kepada tamu untuk diisi. Formulir ini berisi informasi yang harus dilengkapi oleh tamu agar dapat memproses pemesanan.
    \\item Tamu Mengisi Formulir: 
    \\begin{enumerate}
    \\item tiem 1
    \\item item 2
    \\end{enumerate}
    \\item Tamu Membuat Pemesanan (Credit/Cash): Setelah mengisi formulir, tamu memilih metode pembayaran, apakah secara kredit atau tunai.
    \\item Staff Memeriksa Dokumen Syarat Pemesanan: Staff memeriksa apakah dokumen yang diserahkan oleh tamu memenuhi syarat pemesanan atau tidak.
    \\item Keputusan Dokumen Memenuhi: Jika dokumen memenuhi syarat, maka staff melanjutkan ke proses selanjutnya. Jika tidak, tamu mungkin diminta untuk melengkapi dokumen atau mengisi ulang formulir.
    \\item Memproses Dokumen Pemesanan: Setelah dokumen dinyatakan lengkap, staff memproses dokumen pemesanan sesuai prosedur yang berlaku.
    \\item Proses pemesanan selesai setelah dokumen diproses.
\\end{enumerate}
\\par berikut merupakan gambar 
\\begin{figure}
\\centering
  \\includegraphics[width=500px]{test.jpg}
  \\caption{gambar contoh \\cite{tesref}}
  \\label{gambarContoh}
\\end{figure}
`


;

const htmlContent = convertLatexToHtml(latexContent);
console.log(htmlContent);

const page =document.getElementById('page')
if (page) {
  page.innerHTML  = htmlContent
}

const tex = convertHtmlToLatex(htmlContent)

console.log(tex);


