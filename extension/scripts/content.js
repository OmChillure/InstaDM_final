function findElementsByText(text, selector = "*") {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).filter((element) =>
    element.textContent.trim().toLowerCase().includes(text.toLowerCase())
  );
}  

function findNewMessageButton() {
  console.log("Searching for New Message button...");
  const buttons = document.querySelectorAll('div[role="button"]');
  for (const button of buttons) {
    const svg = button.querySelector('svg[aria-label="New message"]');
    if (svg) {
      console.log("New Message button found");
      return button;
    }
  }
  console.log("New Message button not found");
  return null;
}

function findClosestParent(element, selector) {
  while (element) {
    if (element.matches(selector)) return element;
    element = element.parentElement;
  }
  return null;
}

function waitForElement(predicate, timeout = 30000) {
  console.log(`Waiting for element...`);
  return new Promise((resolve) => {
    if (predicate()) {
      console.log(`Element found immediately`);
      return resolve(predicate());
    }

    const observer = new MutationObserver(() => {
      if (predicate()) {
        console.log(`Element found after waiting`);
        resolve(predicate());
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      console.log(`Timeout waiting for element`);
      resolve(null);
    }, timeout);
  });
}

function findSearchInput() {
  console.log("Attempting to find search input...");
  const possibleInputs = [
    ...document.querySelectorAll('input[type="text"]'),
    ...document.querySelectorAll('input[type="search"]'),
    ...document.querySelectorAll('input[placeholder*="Search"]'),
  ];

  console.log(`Found ${possibleInputs.length} possible input elements`);

  for (let input of possibleInputs) {
    console.log(`Checking input:`, input);
    if (input.offsetParent !== null) {
      console.log("Found visible input, using this as search input");
      return input;
    }
  }

  console.log("No suitable search input found");
  return null;
}

function findSendButton() {
  console.log("Searching for send button...");
  const sendButtons = findElementsByText("Send", 'div[role="button"]');
  if (sendButtons.length > 0) {
    console.log("Send button found");
    return sendButtons[0];
  }
  console.log("Send button not found");
  return null;
}

function simulateTyping(message, initialDelay = 2000, typingDelay = 100) {
  return new Promise((resolve) => {
    const findMessageDiv = () =>
      document.querySelector('[aria-label="Message"][contenteditable="true"]');

    const waitForMessageDiv = () =>
      new Promise((innerResolve) => {
        const checkInterval = setInterval(() => {
          const messageDiv = findMessageDiv();
          if (messageDiv) {
            clearInterval(checkInterval);
            innerResolve(messageDiv);
          }
        }, 100);
      });

    waitForMessageDiv().then((messageDiv) => {
      console.log("Message div found:", messageDiv);
      messageDiv.innerHTML = "";
      console.log("Cleared existing content");

      const typeNextChar = (index) => {
        if (index < message.length) {
          messageDiv.focus();
          document.execCommand("insertText", false, message[index]);

          console.log("Typed character:", message[index]);
          messageDiv.dispatchEvent(new Event("input", { bubbles: true }));

          setTimeout(() => typeNextChar(index + 1), typingDelay);
        } else {
          console.log("Finished typing message");
          resolve();
        }
      };

      console.log(`Waiting ${initialDelay}ms before starting to type...`);
      setTimeout(() => typeNextChar(0), initialDelay);
    });
  });
}

async function getAllFollowerUsernames() {
  async function scrollToLoadAll() {
      let lastHeight;
      do {
          lastHeight = document.body.scrollHeight;
          window.scrollBy(0, window.innerHeight); 
          await new Promise(resolve => setTimeout(resolve, 5000)); 
      } while (document.body.scrollHeight > lastHeight);
  }

  function extractUsernames() {
      return Array.from(document.querySelectorAll('div[role="button"]:not([aria-label]):not([aria-pressed])'))
          .map(button => {
              const container = button.closest('div[class^="x9f619"]');
              const link = container?.querySelector('a[href^="/"][role="link"]');
              return link ? link.getAttribute('href').substring(1) : null;
          })
          .filter(Boolean);
  }

  await scrollToLoadAll();
  return extractUsernames();
}

function getUserLinksAndUsernames() {
  const linkAnchors = document.querySelectorAll('a[role="link"]');

  const unwantedUsernames = [
    'Privacy',
    'Terms',
    'Locations',
    'Instagram Lite',
    'Home',
    'Explore',
    'Reels',
    'Messages',
    'Profile'
  ];

  const userLinks = [];

  linkAnchors.forEach(anchor => {
    const hrefLink = anchor.getAttribute('href');
    if (hrefLink && hrefLink.startsWith('/') && !hrefLink.includes('?') && !hrefLink.includes('/p/')) {
      const usernameSpan = anchor.querySelector('span[dir="auto"]');
      if (usernameSpan) {
        const username = usernameSpan.innerText;

        if (!unwantedUsernames.includes(username)) {
          userLinks.push({ href: hrefLink, username: username });
        }
      }
    }
  });

  return userLinks;
}

async function runInstagramActions(username, message) {
  try {
    console.log("Searching for New Message button...");
    const button = await waitForElement(findNewMessageButton);
    if (!button) {
      throw new Error("New Message button not found");
    }
    console.log("New Message button found, clicking...");
    button.click();

    console.log("Waiting for search input...");
    let searchInput = await waitForElement(findSearchInput);
    if (!searchInput) {
      throw new Error("Could not find search input");
    }

    console.log("Search input found, entering username...");
    searchInput.value = username;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));

    console.log("Waiting for checkbox...");
    const checkbox = await waitForElement(() =>
      document.querySelector('input[type="checkbox"]')
    );
    if (!checkbox) {
      throw new Error("Checkbox not found after extended wait");
    }

    console.log("Checkbox found, toggling...");
    checkbox.click();
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));

    console.log("Waiting for Chat button...");
    const chatButton = await waitForElement(
      () => findElementsByText("Chat", 'div[role="button"]')[0]
    );
    if (!chatButton) {
      throw new Error("Chat button not found");
    }

    console.log("Chat button found, clicking...");
    chatButton.click();

    console.log("Waiting for message container...");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a delay here

    console.log("Message container found, preparing to type...");
    await simulateTyping(message);

    console.log("Message typed, waiting 2 seconds before sending...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const sendButton = findSendButton();
    if (!sendButton) {
      throw new Error("Send button not found");
    }

    console.log("Send button found, clicking...");
    sendButton.click();

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error during Instagram actions:", error);
  }
}


let isProcessing = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendMessage" && !isProcessing) {
    isProcessing = true;
    runInstagramActions(request.username, request.message).then(() => {
      isProcessing = false;
    });
  } else if (request.action === "reset") {
    isProcessing = false;
    console.log("Script reset, can run again");
  }
});

console.log("Instagram Helper content script loaded for DM inbox");


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getFollowers') {
      getAllFollowerUsernames().then(followerUsernames => {
          sendResponse({ followers: followerUsernames });
      });
      return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPostUsernames') {
    const userLinks = getUserLinksAndUsernames();
    sendResponse({ userLinks: userLinks });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkAuth") {
      const usernameElement = document.querySelector('a[href^="/"] > div > span');

      let username = null;

      if (usernameElement) {
          username = usernameElement.textContent;
      }

      sendResponse({ isLoggedIn: !!username, username: username });
  }
});

// function waitForElement(selector, timeout = 5000) {
//   return new Promise((resolve, reject) => {
//       const startTime = Date.now();
//       const interval = setInterval(() => {
//           const element = document.querySelector(selector);
//           if (element) {
//               clearInterval(interval);
//               resolve(element);
//           } else if (Date.now() - startTime > timeout) {
//               clearInterval(interval);
//               reject(new Error(`Element ${selector} not found within ${timeout}ms`));
//           }
//       }, 100);
//   });
// }

function openFollowersDialog(username) {
  console.log(`Attempting to open followers dialog for ${username}`);
  waitForElement(`a[href="/${username}/followers/"]`)
      .then(followersLink => {
          console.log("Followers link found, clicking...");
          followersLink.click();
      })
      .catch(() => {
          console.log("Followers link not found in header, trying alternative method...");
          return waitForElement('div[role="dialog"]');
      })
      .then(dialogElement => {
          if (dialogElement) {
              console.log("Dialog element found, looking for followers button...");
              const followersButton = dialogElement.querySelector(`a[href="/${username}/followers/"]`);
              if (followersButton) {
                  console.log("Followers button found in dialog, clicking...");
                  followersButton.click();
              } else {
                  throw new Error("Followers button not found within dialog");
              }
          }
      })
      .catch(error => {
          console.error("Failed to open followers dialog:", error);
          alert("Couldn't open followers dialog. Please make sure you're on the correct profile page and try again.");
      });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openFollowersDialog") {
      openFollowersDialog(request.username);
  }
});