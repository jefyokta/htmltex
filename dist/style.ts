export const style: string = `
body {
  counter-reset: h1-counter;
}

h1 {
  font-size: 14pt;
  font-weight: 700;
  text-align: center;
  counter-reset: h2-counter fig-counter;
  counter-increment: h1-counter;
  margin-bottom: 10pt;
  margin-top: 10pt;

}

h1::before {
  content: "BAB " counter(h1-counter) "\A" ;
  font-weight: bold;
}

h2 {
  font-size: 12pt;
  font-weight: 600;
  margin-bottom: 4pt;
  display: list-item;
  list-style: none;
  counter-increment: h2-counter;
  counter-reset: h3-counter;
}

h2::before {
  content: counter(h1-counter) "." counter(h2-counter) "    ";
  font-weight: bold;
}

h3 {
  font-size: 12pt;
  font-weight: 600;
  margin-bottom: 3pt;
  display: list-item;
  list-style: none;
  counter-increment: h3-counter;
}

h3::before {
  content: counter(h1-counter) "." counter(h2-counter) "." counter(h3-counter) "    ";
  font-weight: bold;
}
figcaption{
  counter-increment: fig-counter;
}
figcaption::before{
  content:"Gambar " counter(h1-counter)"."counter(fig-counter) ". ";
}

p {
  word-break: break-word;
  text-indent: 1.27cm;
  text-align: justify;

}

li p {
  text-indent: 0;
}

.page ol {
  list-style-type: decimal;
}

.page ul {
  list-style-type: disc;
}

.page ul, ol {
  margin-left: 2.5em;
}

.page {
  width: 210mm;
  min-height: 297mm;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding-left: 4cm;
  padding-right: 3cm;
  padding-top: 3cm;
  padding-bottom: 4cm;
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5;

}


.tiptap:focus {
  outline: none;
}`;
