// for main page to setup poll and add options
$(() => {
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
  const addOption = function () {
    $(".add-option").on("click", function (element) {
      $("create-poll-form").append(createNewOption());
    });
  };
  // new poll-->ejs?

  // submit-->ejs?
  // send poll info on submit click
  const submitCreatorPoll = function () {
    $(".submit").on("click", function (element) {
      let $email = $(".email").val();
      let $question = $(".question").val();
      let $description = $(".description").val();
      let $options = $(".option").val();
      $("option")
        .toArray()
        .forEach((option) => {
          options.push($(option).val());
        });
    });
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

  $.ajax({
    url: "/submit",
    type: "POST",
    data: {
      // not sure how to format the data below - with $???
      $question,
      $description,
      $options,
      $email,
    },
    success: function (result) {
      console.log("new poll posted");
    },
    error: function (result, error) {
      console.log("ERROR:" + error);
    },
  });

  // need to think about errors(blank text fields, etc)
  createNewOption();
  addOption();
  submitCreatorPoll();
});
