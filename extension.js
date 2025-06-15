chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "readText",
    title: "Read Selected Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "readText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          const utterance = new SpeechSynthesisUtterance(selectedText);
          speechSynthesis.speak(utterance);
        } else {
          console.error("No text selected.");
        }
      }
    });
  }
});

function readSelectedText() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const utterance = new SpeechSynthesisUtterance(selectedText);
    speechSynthesis.speak(utterance);
  }
}
