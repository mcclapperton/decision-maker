$(document).ready(function () {
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
      let $options = $(".option").val();
      let options = [];
      $("option")
        .toArray()
        .forEach((option) => {
          options.push($(option).val());
        });
    });
  };
  // question and options all filled out - send ajax post request
  if ($options && $question) {
    $.ajax({
      url: "/submit",
      type: "POST",
      data: {
        // not sure how to format the data below - with $???
        question,
        options,
        email,
      },
      success: function (result) {
        // handle data??
      },
      error: function (result, statut, error) {
        // handle errors
      },
    });
  }
  // need to think about errors(blank text fields, etc)
  // drag and drop
  createNewOption();
  addOption();
  submitCreatorPoll();
});
