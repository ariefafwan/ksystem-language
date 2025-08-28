import * as vscode from "vscode";
import * as prettier from "prettier";

export function activate(context: vscode.ExtensionContext) {
  console.log("KSystem formatter aktif 🚀");

  const provider = vscode.languages.registerDocumentFormattingEditProvider("ksystem", {
    async provideDocumentFormattingEdits(document: vscode.TextDocument) {
      const text = document.getText();

      // 🔹 contoh: pakai Prettier dengan config custom
      const formatted = prettier.format(text, {
        parser: "babel", // sementara pakai babel, nanti bisa custom parser
        semi: false,
        singleQuote: true,
        tabWidth: 4,
      });

      const firstLine = document.lineAt(0);
      const lastLine = document.lineAt(document.lineCount - 1);
      const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

      return [vscode.TextEdit.replace(fullRange, formatted)];
    },
  });

  context.subscriptions.push(provider);
}

export function deactivate() {}
