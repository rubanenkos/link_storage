class DataBase {
  static create(data) {
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
}
