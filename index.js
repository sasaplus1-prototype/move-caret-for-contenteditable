(() => {
  // index.ts
  (function() {
    "use strict";
    const editor = document.querySelector("#js-editor");
    const insert = document.querySelector("#js-insert");
    const info = document.querySelector("#js-caret-info");
    const html = document.querySelector("#js-html");
    function onClickInsert() {
      if (!editor) {
        return;
      }
      editor.focus();
      const selection = window.getSelection();
      if (selection.rangeCount <= 0) {
        return;
      }
      const fragment = document.createDocumentFragment();
      const parser = new DOMParser();
      const dom = parser.parseFromString(html.value, "text/html");
      fragment.append(...dom.body.childNodes);
      const range = selection.getRangeAt(0);
      range.insertNode(fragment);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      editor.focus();
    }
    function onMoveCaret() {
      if (!info) {
        return;
      }
      const selection = window.getSelection();
      info.innerHTML = `
      anchorNode: ${selection.anchorNode.nodeName},
      anchorOffset: ${selection.anchorOffset},
      focusNode: ${selection.focusNode.nodeName},
      focusOffset: ${selection.focusOffset},
      isCollapsed: ${selection.isCollapsed},
      type: ${selection.type}
    `;
    }
    if (insert && html) {
      insert.addEventListener("click", onClickInsert, false);
    }
    document.addEventListener("selectionchange", onMoveCaret, false);
  })();
})();
//# sourceMappingURL=index.js.map
