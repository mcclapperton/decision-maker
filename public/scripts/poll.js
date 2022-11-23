// for main page to setup poll and add options
$(() => {
  console.log("READY!");
  $("#poll-form").on("submit", submitPoll);

  $(".add-option").on("click", function (element) {
    $("create-poll-form").append(createNewOption());
  });

  // need to think about errors(blank text fields, etc)
  createNewOption();
  addOption();
  console.log("READY COMPLETE");
});
// Preventing XSS with Escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// add new option
const createNewOption = function () {
  const $option = $(`
  <div class="new-option">
  <label for="option">Option:</label>
    <input
      type="text"
      class="optionN"
      placeholder="Enter an option"/>
      </div>
      `);
  return $option;
};
// append createNewOption to the bottom of form when add option clicked
const addOption = function () {};
// send poll info on submit click
const submitPoll = function (event) {
  event.preventDefault();
  console.log("createPollElement");
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
// question and options all filled out - send ajax post request
const completeFields = function () {
  let $email = $(".email").val();
  let $question = $(".question").val();
  let $description = $(".description").val();
  let $options = $(".option").val();
  if (
    $email === "" ||
    $question === "" ||
    $description === "" ||
    $options === ""
  ) {
    // message to fill all fields
  }
};

const createPoll = function (question, description, options, email) {
  const data = {
    title: question,
    description,
    options,
    email,
  };
  console.log("this is data:", data);
  // return Promise.resolve();

  return $.post("/api/poll/create", data)
    .done((result) => {
      console.log("This is the result:", result);
      document.location = "api/poll/results/" + result.poll.id;
      return result;
    })
    .fail((err) => {
      console.log(err.message);
      // we should display error message
    });
};
