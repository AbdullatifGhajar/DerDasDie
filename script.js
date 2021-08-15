// function getWordByClick() {
//   let selection = window.getSelection();
//   if (!selection || selection.rangeCount < 1) return true;
//   let range = selection.getRangeAt(0);
//   let node = selection.anchorNode;
//   let word_regexp = /^[\wäüöÄÖÜß]*$/;

//   // Extend the range backward until it matches word beginning
//   while (range.startOffset > 0 && range.toString().match(word_regexp)) {
//     range.setStart(node, range.startOffset - 1);
//   }
//   // Restore the valid word match after overshooting
//   if (!range.toString().match(word_regexp)) {
//     range.setStart(node, range.startOffset + 1);
//   }

//   // Extend the range forward until it matches word ending
//   while (range.endOffset < node.length && range.toString().match(word_regexp)) {
//     range.setEnd(node, range.endOffset + 1);
//   }
//   // Restore the valid word match after overshooting
//   if (!range.toString().match(word_regexp)) {
//     range.setEnd(node, range.endOffset - 1);
//   }

//   let word = range.toString();
//   chrome.runtime.sendMessage({ message: "search_word", word: word });
// }

function getSelectedWord() {
  let selectedText = window.getSelection().toString().trim();
  if (selectedText === "" || selectedText.includes(" ")) return;
  console.log(selectedText);
}

function searchWord() {
  chrome.storage.local.get(["active"], (result) => {
    if (result["active"]) {
      let selectedText = window.getSelection().toString().trim();
      if (selectedText === "" || selectedText.includes(" ")) return;
      // you may choose getWordByClick
      chrome.runtime.sendMessage({
        message: "search_word",
        word: selectedText,
      });
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.message === "set_active") {
    setActive(request.active);
    console.log("set_active received", request.active);
  }
});

// function setActive(active) {
//   if (active) document.addEventListener("mouseup", searchWord);
//   else document.removeEventListener("mouseup", searchWord);
// }

// // Set active as default
// chrome.storage.local.get(["active"], (result) => {
//   setActive(result["active"]);
// });

document.addEventListener("mouseup", searchWord);
