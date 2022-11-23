// for friends voting page w/ drag and drop ranking
$(() => {
  // Preventing XSS with Escaping
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // ranking functions
});
