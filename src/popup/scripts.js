const addPageButtonElem = document.getElementById("add-link-button");
const showStorageButtonElem = document.getElementById("show-storage-button");
const manageLinksButtonElem = document.getElementById("manage-links-button");
// const listElem = document.getElementById("list_popup");

let getActiveTabLink = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];
    console.log(currentTab);
    const data = {
      date: new Date().toJSON(),
      title: currentTab.title,
      url: currentTab.url,
    };
    console.log(data);

    DataBase.create_record(data);
    // window.close();
  });
};

let showStorage = () => {
  console.log("Show Storage function was called");
  // const newWindow = manageLinks();
  // alert("newWindow= " + newWindow);
  // let listElem = newWindow.document.getElementById("list_popup");
  // alert("list_elem=" + listElem);

  let dbResponse = DataBase.read_records()
    .then(renderHTML)
    .then(function (response) {
      return response;
    });

  // alert(aaa);
  // const newWindow = window.open("../link_list/link_list.html", "_blank");
  // newWindow.document.write(aaa);

  dbResponse
    .then((response) => {
      const newWindow = window.open("../link_list/link_list.html", "_blank");
      return { page: newWindow, response: response };
    })
    .then((data) => {
      data["page"].document.write(data["response"]);
      // newWindow.document.write(a);
    });

  // .then((a) => {
  // newWindow.document.write(a);
  // alert(a);
  //   // newWindow.document.write("Your HTML 222222");
  //   // listElem.innerHTML = a;
  // });
  // alert("Rendered");
  // window.close();
  // let bbb = sss.then((value) => console.log(value));
  // alert(bbb);
};

let manageLinks = () => {
  const newWindow = window.open("../link_list/link_list.html", "_blank");
  return newWindow;
};

function renderHTML(content) {
  // console.log(content);
  return `<ol>${content
    .map(
      (c) =>
        `<li><div class="output-group">
        <div> <span id="output_data_title">${c.title}</span></div>
        <div> <span id="output_data_url">${c.url}</span></div>
        <div> <span id="output_data_date">${c.date.split("T")[0]}</span></div>
        </div></li>`
    )
    .join(" ")}</ol>`;
}

if (addPageButtonElem) {
  addPageButtonElem.addEventListener("click", getActiveTabLink);
}

if (showStorageButtonElem) {
  showStorageButtonElem.addEventListener("click", showStorage);
}

if (manageLinksButtonElem) {
  manageLinksButtonElem.addEventListener("click", manageLinks);
}
