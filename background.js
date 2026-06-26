
let lastTabId = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {

  if (lastTabId !== null) {
    let oldTab = await chrome.tabs.get(lastTabId);

    if (oldTab.url) {

      if (
        oldTab.url.includes("youtube.com") ||
        oldTab.url.includes("netflix.com") ||
        oldTab.url.includes("twitter.com") ||
        oldTab.url.includes("x.com")
      ) {
        chrome.scripting.executeScript({
          target: { tabId: oldTab.id },
          func: () => {
            let v = document.querySelector("video");
            if (v) v.pause();
          }
        });
      }

      if (oldTab.url.includes("spotify.com")) {
        chrome.scripting.executeScript({
          target: { tabId: oldTab.id },
          func: () => {
            let btn = document.querySelector('[data-testid="control-button-playpause"]');
            if (btn) btn.click();
          }
        });
      }
    }
  }

  let newTab = await chrome.tabs.get(activeInfo.tabId);

  if (newTab.url) {

    if (newTab.url.includes("youtube.com/watch")) {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        func: () => {
          let v = document.querySelector("video");
          if (v) {
            v.currentTime -= 10;
            v.play();
          }
        }
      });
    }

    if (
      newTab.url.includes("netflix.com") ||
      newTab.url.includes("twitter.com") ||
      newTab.url.includes("x.com")
    ) {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        func: () => {
          let v = document.querySelector("video");
          if (v) v.play();
        }
      });
    }

    if (newTab.url.includes("spotify.com")) {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
