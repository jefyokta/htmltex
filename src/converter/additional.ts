import type { NormalAttr } from "../htmltex";
import { CenteredLabeledImage, latexPlaceHolder } from "../utils";

export type BeginEndParams = {
  command: string;
  braces: string | undefined;
  bracket: string | undefined;
  content: any;
  match: any;
};

interface ConverterClass {
  _call(method: keyof this, args: NormalAttr | BeginEndParams): string;
  except(args: NormalAttr | BeginEndParams): string;
}

export abstract class BaseConverter implements ConverterClass {
  _call(method: keyof this, args: NormalAttr | BeginEndParams) {
    if (typeof this[method] === "function" && method !== "call") {
      return (this[method] as Function)(args);
    }
    return this.except(args);
  }

  except(args: NormalAttr | BeginEndParams): string {
    return args.match;
  }
}

export class Begin extends BaseConverter {
  figure() {
    return "<figure>";
  }
  enumerate() {
    return "<ol>";
  }
  itemize() {
    return "<ul>";
  }
}

export class End extends BaseConverter {
  figure() {
    return "</figure>";
  }
  enumerate() {
    return "</ol>";
  }
  itemize() {
    return "</ul>";
  }
}

type BeginEndCommand = Record<string, (args: BeginEndParams) => string>;

export class UserBeginEndConverter {
  public static commands: BeginEndCommand;

  static add(command: string, handler: (args: BeginEndParams) => string) {
    this.commands[command] = handler;
  }
}

export class BeginEndConverter extends BaseConverter {
  private toKatex(match: string) {
    const katexContent = latexPlaceHolder(match);
    return `<katex>${katexContent}</katex>`;
  }

  private toTable(args: BeginEndParams) {
    const { content } = args;

    const label = content.match(/\\label\{(.*?)\}/);
    const caption = content.match(/\\caption\{(.*?)\}/);

    return `<table type="${args.command}" cells="${args.braces}" option="${args.bracket}">
    ${content}
    
    <table>`;
  }
  center(args: BeginEndParams) {
    return `<div be="center" style="text-align:center !important;">${args.content}</div>`;
  }

  matrix(args: BeginEndParams) {
    return this.toKatex(args.match);
  }
  pmatrix(args: BeginEndParams) {
    return this.toKatex(args.match);
  }
  tabular(args: BeginEndParams) {
    return this.toTable(args);
  }
  longtable(args: BeginEndParams) {
    return this.toTable(args);
  }
  align(args: BeginEndParams) {}
  figure(args: BeginEndParams) {
    const match = args.content;
    const figureContent = match.match(/\\includegraphics\[(.*?)\]\{(.*?)\}/);
    const caption = match.match(/\\caption\{(.*?)\}/);
    const centered = match.includes("\\centering");
    const label = match.match(/\\label\{(.*?)\}/);
    const imgWidth = figureContent
      ? figureContent[1].replace(`=`, () => `:`)
      : "";
      console.log({args,figureContent});
      
    const imgSrc = figureContent ? figureContent[2] : "";
    const imgAlt = caption ? caption[1] : "Figure";

    return `<figure ${centered ? "centered=true":""} label="${label}" src="${imgSrc}" width="${imgWidth}" caption="${imgAlt}"></figure>`;

    // return `<figure ${centered ? CenteredLabeledImage : ""} ${label ? `label="${label[1]}"` : ""}>
    //             <img src="${imgSrc}"  ${imgWidth ? `style="${imgWidth};"` : ""} />
    //             ${caption ? `<figcaption>${imgAlt}</figcaption>` : ""}
    //           </figure>
    //         `;
  }

  except(args: BeginEndParams): string {
    return args.match;
  }
}
