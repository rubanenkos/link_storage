// let link = () => {
//   let l = window.location.href;
//   console.log(l);
//   return l;
// };

try {
  let link = () => {
    return location.href;
  };

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
        alert(link());
        // Do some stuff...
      }
    },
    false
  );
} catch (e) {
  // console.error(e);
}
