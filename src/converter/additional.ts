import type { NormalAttr } from "../htmltex";
import { latexPlaceHolder } from "../utils";

export type BeginEndParams = {
  command: string;
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

export class BeginEndConverter extends BaseConverter {
  private toKatex(match: string) {
    const katexContent = latexPlaceHolder(match);
    return `<katex>${katexContent}</katex>`;
  }

  matrix(args: BeginEndParams) {
    return this.toKatex(args.match);
  }
  pmatrix(args: BeginEndParams) {
    return this.toKatex(args.match);
  }

  except(args: BeginEndParams): string {
    return args.match;
  }
}
