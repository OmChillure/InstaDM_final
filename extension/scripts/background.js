function openInstagramDMTab(username, message) {
  chrome.tabs.query(
    { url: "https://www.instagram.com/direct/inbox/*" },
    (tabs) => {
      if (tabs.length === 0) {
        chrome.tabs.create(
          { url: "https://www.instagram.com/direct/inbox/" },
          (newTab) => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
              if (tabId === newTab.id && info.status === "complete") {
                chrome.tabs.sendMessage(newTab.id, {
                  action: "sendMessage",
                  username: username,
                  message: message,
                });
                chrome.tabs.onUpdated.removeListener(listener);
              }
            });
          }
        );
      } else {
        chrome.tabs.update(tabs[0].id, { active: true }, () => {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "sendMessage",
            username: username,
            message: message,
          });
        });
      }
    }
  );
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openDM") {
    openInstagramDMTab(request.username, request.message);
  }
});


chrome.runtime.onInstalled.addListener(() => {
  console.log("Instagram Helper installed");
  openInstagramDMTab();
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("instagram.com/direct/inbox")) {
    chrome.tabs.sendMessage(tab.id, { action: "clickButton" });
  } else {
    openInstagramDMTab();
  }
});

chrome.runtime.onStartup.addListener(() => {
  openInstagramDMTab();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkAuth") {
    chrome.cookies.get({ url: 'https://www.instagram.com', name: 'ds_user_id' }, (cookie) => {
      sendResponse({ isLoggedIn: !!cookie });
    });
    return true; 
  }
});

function openInstagramFollowersTab(username) {
  const userNames = [];
  const url = `https://www.instagram.com/${username}/`;
  chrome.tabs.query({ url: "https://www.instagram.com/*" }, (tabs) => {
      if (tabs.length === 0) {
          chrome.tabs.create({ url: url }, (newTab) => {
              chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                  if (tabId === newTab.id && info.status === "complete") {
                      setTimeout(() => {
                          chrome.tabs.sendMessage(newTab.id, {
                              action: "openFollowersDialog",
                              username: username
                          });
                      }, 2000);
                      chrome.tabs.onUpdated.removeListener(listener);
                  }
              });
          });
      } else {
          chrome.tabs.update(tabs[0].id, { url: url, active: true }, () => {
              setTimeout(() => {
                  chrome.tabs.sendMessage(tabs[0].id, {
                      action: "openFollowersDialog",
                      username: username
                  });
              }, 2000);
          });
      }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openFollowers") {
      openInstagramFollowersTab(request.username);
  }
});