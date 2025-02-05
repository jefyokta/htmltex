import { Extension } from "@tiptap/core";
import LatexVariable from "../converter/tex-variable";

export const VarConverter = Extension.create({
  name: "varConverter",

  addKeyboardShortcuts() {
    return {
      " ": ({ editor }) => {
        const { state, dispatch } = editor.view;
        const { tr, selection } = state;
        const textBefore = tr.doc.textBetween(
          selection.from - 20,
          selection.from,
          "",
        );

        const match = textBefore.match(/\\([a-zA-Z0-9_]+)/);
        if (match) {
          const varName = match[1];
          const value = LatexVariable.get(varName);
          if (value) {
            tr.replaceWith(
              selection.from - match[0].length,
              selection.from,
              editor.schema.nodes.var.create({ varname: varName }),
            );

            dispatch(tr);

            return true;
          }
          return false;
        }

        return false;
      },
    };
  },
});
