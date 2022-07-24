const addPageButtonElem = document.getElementById("add-link-button");
const showStorageButtonElem = document.getElementById("show-storage-button");
const manageLinksButtonElem = document.getElementById("manage-links-button");

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
  let dbResponse = DataBase.read_records()
    // .then(renderHTML)
    .then(function (response) {
      return response;
    });

  dbResponse
    .then((response) => {
      const newWindow = window.open("../link_list/link_list.html", "_blank");
      // const newWindow = window;
      return { page: newWindow, response: response };
    })
    .then((data) => {
      data["page"].document.write(
        `<html lang="en">
        <head>
          <style type="text/css">
            #data_list {color: rgb(55, 80, 5);font-family: "Arial, Helvetica, sans-serif"; font-size: 18px;}
          </style>
          <title>Full list of links</title>
        </head>
        <body>
        <div class="output-group"><ol id="data_list"></ol></div>
        </body>
        </html>`
      );
      console.log(data["response"]);
      addDataToHTML(data["page"], data["response"]);
      // newWindow.document.write(a);
    });
};

function addDataToHTML(page, data) {
  // page = window;
  for (let key in data) {
    console.log(key, data[key]);

    const recordDate = createCustomElement(
      page,
      "div",
      { class: "date" },
      `${data[key].date.split("T")[0]} `
    );
    const recordTitle = createCustomElement(
      page,
      "div",
      { class: "title" },
      `${data[key].title} `
    );
    const recordUrl = createCustomElement(
      page,
      "a",
      { href: data[key].url, class: "url" },
      data[key].url
    );

    // const recordSeparator = createCustomElement(page, "br");

    const node = createCustomElement(page, "li", { id: data[key].id }, [
      recordTitle,
      // recordSeparator,
      recordUrl,
      // recordSeparator,
      recordDate,
    ]);

    console.log(node);
    const elem = page.document.getElementById("data_list");
    elem.appendChild(node);
  }
}

function createCustomElement(page, element, attribute, inner) {
  if (typeof element === "undefined") {
    return false;
  }
  if (typeof inner === "undefined") {
    inner = "";
  }
  var el = page.document.createElement(element);
  if (typeof attribute === "object") {
    for (var key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }
  if (!Array.isArray(inner)) {
    inner = [inner];
  }
  for (var k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(page.document.createTextNode(inner[k]));
    }
  }
  return el;
}

function renderHTML(content) {
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

let manageLinks = () => {
  const newWindow = window.open("../link_list/link_list.html", "_blank");
  return newWindow;
};

if (addPageButtonElem) {
  addPageButtonElem.addEventListener("click", getActiveTabLink);
}

if (showStorageButtonElem) {
  showStorageButtonElem.addEventListener("click", showStorage);
}

if (manageLinksButtonElem) {
  manageLinksButtonElem.addEventListener("click", manageLinks);
}
