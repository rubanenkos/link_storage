let link = window.location.href;
// console.log(link);
// function do_alert(e) {
//   alert(e.key);
// }
// document.addEventListener("keydown", do_alert);

// window.addEventListener(
//   "keypress",
//   function (e) {
//     if (e.shiftKey) {
//       alert("Here it is.");
//     }
//   },
//   false
// );

document.addEventListener(
  "keydown",
  (e) => {
    if (
      e.ctrlKey &&
      e.shiftKey &&
      String.fromCharCode(e.keyCode).toLowerCase() === "f"
    ) {
      e.preventDefault();
      e.stopPropagation();
      alert(link);
      // Do some stuff...
    }
  },
  false
);
