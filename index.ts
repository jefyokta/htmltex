import { Parser } from "htmlparser2";
import { LabeledImage } from "./src/components/image";
import { convertHtmlToLatex } from "./src/converter";
import { convertLatexToHtml } from "./src/converter";
import { bibToObject, objectToBib } from "./src/citeconverter";


// const el = document.getElementById('page')
// if (el) {
//   el.innerHTML = LabeledImage({src:"test.jpg",caption:"Gambar",centered:true})
// }
const changeWith =(node:Node)=>{

  const selection = window.getSelection()
  if (selection) {
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();
      node.textContent = selectedText
      range.deleteContents(); 
      range.insertNode(node); 

    }
  }

}


const obj = bibToObject(
  `@article{poley2000latex,
  title={Latex allergy},
  author={Poley Jr, Gerald E and Slater, Jay E},
  journal={Journal of allergy and clinical immunology},
  volume={105},
  number={6},
  pages={1054--1062},
  year={2000},
  publisher={Elsevier}

  @book{butti2023high,
  title={High Performance with Laravel Octane: Learn to fine-tune and optimize PHP and Laravel apps using Octane and an asynchronous approach},
  author={Butti, Roberto},
  year={2023},
  publisher={Packt Publishing Ltd}
}
}`
);

const bib = objectToBib(obj)

console.log(obj,bib);
