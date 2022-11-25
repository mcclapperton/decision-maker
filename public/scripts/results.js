// for poll results page
$(() => {
  console.log("READY!");
  $(".vote_button").on("submit", voteInPoll);
});
// Preventing XSS with Escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
