const globalState = {
  taskType: null,
  res: null,
  userNames: [],
  parentUserName: [],
  userId: "183e59fd-45c2-4eee-a1ee-2f526e937d33",
  taskId: null,
  listId: null,
};

// status can be "PENDING" or "COMPLETED"
const updateTasksStatus = async (status) => {
  const res = await fetch("http://localhost:3000/api/tasks", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId: globalState?.taskId,
      status: status,
    }),
  });

  const json = await res.json();

  if (json.success) {
    console.log("Updated status");
  } else {
    console.log(json?.error);
    // alert facing some error
  }
};

// add usernames to list on each iteration
const addUsernameToList = async (usernames) => {
  const res = await fetch("http://localhost:3000/api/lists", {
    method: "PATCH",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      listId: globalState?.listId,
      userNames: usernames,
    }),
  });
  const json = await res.json();

  if (json.success) {
    console.log("Updated the data in db");
  } else {
    console.log(json?.error);
    // alert facing some error
  }
};

const GET_FOLLOWERS_PROCESS = async () => {
  try {
    // update status to pendin -----
    await updateTasksStatus("PENDING");

    const promises = globalState?.parentUserName?.map((instaAccount) => {
      new Promise(async (resolve, reject) => {
        try {
          // const data = openInstagramFollowersTab(instaAccount);
          let data = [];

          chrome.tabs.sendMessage(
            instaAccount,
            { action: "getFollowers" },
            function (response) {
              data = response.followers;
            }
          );

          await addUsernameToList(data);

          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    });

    Promise.all(promises)
        .then(()=>{
            // update status to pendin -----
            updateTasksStatus("COMPLETED");
        })
        .catch((error)=>{
            console.log(error)
        })

  } catch (error) {
    // alert some error occured in processing -----
    console.log(error);
  }
};

document.getElementById("frontendData").addEventListener("click", async () => {
  const res = await fetch(
    `http://localhost:3000/api/tasks?userId=${globalState?.userId}`
  );
  const json = await res.json();

  if (json.success) {
    globalState.res = json?.data;
    globalState.taskId = json?.data?.id;
    globalState.taskType = json?.data?.type;
    if (json?.data?.list) {
      globalState.listId = json?.data?.listId;
      globalState.parentUserName = json?.data?.list?.parentUsernames;
    }
  } else {
    alert("Error processing task");
  }

  //  check types here -------------------------------
  if (!res) {
    alert("Error fetching types");
  }

  switch (globalState?.taskType) {
    case "GET_FOLLOWERS":
      // CODE TO FECH FOLLOWERS------
      // 1. status pending
      // promises execute ---
      // status completed
      // alert taks completed
      await GET_FOLLOWERS_PROCESS();
      console.log("done -------");
      break;

    case "GET_FOLLOWINGS":
      break;

    case "GET_LIKES":
      break;

    case "START_CAMPAIGNING":
      alert("Error fetching types");
      break;

    default:
      break;
  }
});

document.getElementById("sendButton").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!username || !message) {
    alert("Please enter both username and message.");
    return;
  }

  chrome.runtime.sendMessage({
    action: "openDM",
    username: username,
    message: message,
  });
});

document
  .getElementById("logFollowersButton")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getFollowers" },
        function (response) {
          const followerUsernames = response.followers;

          const followersListDiv = document.getElementById("followersList");
          const followersUl = document.getElementById("followers");
          followersUl.innerHTML = "";

          followerUsernames.forEach((username) => {
            const li = document.createElement("li");
            li.textContent = username;
            followersUl.appendChild(li);
          });

          followersListDiv.style.display = "block";
        }
      );
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const goToPostButton = document.getElementById("goToPostButton");
  const postUsernamesButton = document.getElementById("postUsernamesButton");
  const postUsernamesList = document.getElementById("postUsernamesList");
  const postUsernamesUl = document.getElementById("postUsernames");
  const postLinkInput = document.getElementById("postLink");

  goToPostButton.addEventListener("click", function () {
    const postLink = postLinkInput.value;
    if (postLink) {
      chrome.tabs.update({ url: postLink });
    } else {
      alert("Please enter a valid Instagram post link.");
    }
  });

  postUsernamesButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getPostUsernames" },
        function (response) {
          const userLinks = response.userLinks;
          postUsernamesUl.innerHTML = "";
          userLinks.forEach((userLink) => {
            const li = document.createElement("li");
            li.textContent = userLink.username;
            postUsernamesUl.appendChild(li);
          });
          postUsernamesList.style.display = "block";
        }
      );
    });
  });
});

document.getElementById("authButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "checkAuth" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      alert("Error checking authentication");
    } else {
      if (response.isLoggedIn) {
        alert(`User is logged in as ${response.username}`);
      } else {
        alert("User is not logged in");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const openFollowersButton = document.getElementById("openFollowersButton");
  const followersUsernameInput = document.getElementById("followersUsername");

  openFollowersButton.addEventListener("click", function () {
    const username = followersUsernameInput.value.trim();
    if (username) {
      chrome.runtime.sendMessage({
        action: "openFollowers",
        username: username,
      });
    } else {
      alert("Please enter a username");
    }
  });
});
