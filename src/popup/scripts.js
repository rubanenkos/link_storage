const addPageButtonElem = document.getElementById("add-link-button");
const showStorageButtonElem = document.getElementById("show-storage-button");

let getActiveTabLink = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];
    console.log(currentTab);
    // alert(`"'add-link-button' was pressed\n ${currentTab.url}"`);

    const data = {
      date: new Date().toJSON(),
      title: currentTab.title,
      url: currentTab.url,
    };
    console.log(data);

    DataBase.create(data);
  });
};

let showStorage = () => {
  console.log("Show Storage function was called");
};

if (addPageButtonElem) {
  addPageButtonElem.addEventListener("click", getActiveTabLink);
}

if (showStorageButtonElem) {
  showStorageButtonElem.addEventListener("click", showStorage);
}
