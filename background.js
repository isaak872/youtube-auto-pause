
let lastTabId = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  
  if (lastTabId !== null) {
    let oldTab = await chrome.tabs.get(lastTabId);

    if (oldTab.url && oldTab.url.includes("youtube.com/watch")) {
      chrome.scripting.executeScript({
        target: { tabId: oldTab.id },
        func: () => {
          let video = document.querySelector("video");
          if (video) video.pause();
        }
      });
    }
  }

  let newTab = await chrome.tabs.get(activeInfo.tabId);

  if (newTab.url && newTab.url.includes("youtube.com/watch")) {
    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      func: () => {
        let video = document.querySelector("video");
        if (video) {
          video.currentTime -= 10;
          video.play();
        }
      }
    });
  }

  lastTabId = activeInfo.tabId;
});
``
