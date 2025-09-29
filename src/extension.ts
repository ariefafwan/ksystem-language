import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("K-System Language Extension aktif 🚀");

  // Atur indentasi default saat dokumen dibuka
  vscode.workspace.onDidOpenTextDocument((doc) => {
    if (doc.languageId === "ksystem") {
      const editor = vscode.window.visibleTextEditors.find(
        (e) => e.document === doc
      );
      if (editor) {
        editor.options = {
          ...editor.options,
          insertSpaces: false,
          tabSize: 8,
        };
      }
    }
  });
}

export function deactivate() {}
