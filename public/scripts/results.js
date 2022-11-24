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
// send array of options IN RANKED ORDER
const voteInPoll = function (event) {
  event.preventDefault();
  console.log("voteInPoll");
  let email = $("#email").val();
  let question = $("#question").val();
  let description = $("#description").val();
  const options = [];
  $(".option")
    .toArray()
    .forEach((option) => {
      options.push({ name: $(option).val() });
    });
  console.log("submit poll:", question, description, options, email);

  // display something on screen (give user option to click away?)
  createPoll(question, description, options, email);
};
