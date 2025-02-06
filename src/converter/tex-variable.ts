import { Listener } from "../events/listener";
import { VarChanged } from "../events/var-changed";

export default class LatexVariable {
  private static constantavars = ["nim", "nama", "judul"];
  private static variables: Record<string, string> = {};

  static get(key: string) {
    return LatexVariable.variables[`\\${key}`] || null;
  }

  static getAll() {
    return { ...LatexVariable.variables };
  }

  static set(key: string, value: string) {
    if (this.constantavars.includes(key.toLowerCase())) {
      throw new Error("Cannot set tex absolute var " + key);
    }
    this.variables[`\\${key}`] = value;
    Listener.emit(VarChanged.getEvent());
  }
  static setConstVar(vars: string[]) {
    this.constantavars = vars.map((v) => v.toLowerCase());
  }

  static setLatexVars(variables: string) {
    const pattern = /\\var\{(\\[^{}]+)\}\{([^{}]+)\}/g;
    const matches = [...variables.matchAll(pattern)];

    return matches.reduce(
      (acc, match) => {
        const [, key, value] = match;
        acc[key] = value;

        return (LatexVariable.variables = acc);
      },
      {} as Record<string, string>,
    );
  }
  static delete(key: string) {
    this.variables = Object.fromEntries(
      Object.entries(this.variables).filter(([k]) => k !== key),
    );
  }

  static convertToLatex() {
    return Object.entries(LatexVariable.variables)
      .map(([key, value]) => `\\var{${key}}{${value}}`)
      .join("\n");
  }
}
