class DataBase {
  static create_record(data) {
    console.log(data);
    fetch(
      "https://personal-link-storage-default-rtdb.europe-west1.firebasedatabase.app/links.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }

  static read_records() {
    return fetch(
      "https://personal-link-storage-default-rtdb.europe-west1.firebasedatabase.app/links.json"
    )
      .then((response) => response.json())
      .then((response) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
        // console.log(response);
      });
  }
}
