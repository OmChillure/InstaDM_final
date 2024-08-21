const url =
  "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry";

async function fetchData() {
  const res = await fetch("http://localhost:3000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "yuvraj",
    }),
  });
  let data = await res.json();
  console.log(data);
}

function openInstagramDMTab(username, message) {
  chrome.tabs.query(
    { url: "https://www.instagram.com/direct/inbox/*" },
    (tabs) => {
      if (tabs.length === 0) {
        // If no Instagram DM tab is open, create a new one and pass the username and message
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
        // If an Instagram DM tab exists, activate it and send the username and message
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

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Instagram Helper installed");
  setInterval(() => {
    
  }, 5000);
  await fetchData();
  // openInstagramDMTab();
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("instagram.com/direct/inbox")) {
    chrome.tabs.sendMessage(tab.id, { action: "clickButton" });
  } else {
    openInstagramDMTab();
  }
});

// Listen for extension startup
chrome.runtime.onStartup.addListener(() => {
  openInstagramDMTab();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkAuth") {
    chrome.cookies.get(
      { url: "https://www.instagram.com", name: "ds_user_id" },
      (cookie) => {
        sendResponse({ isLoggedIn: !!cookie, username: "jay" });
      }
    );
    return true;
  }
});
