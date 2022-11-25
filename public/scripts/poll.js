// for main page to setup poll and add options
$(() => {
  $("#poll-form").on("submit", submitPoll);

  $(".add-option").on("click", function () {
    createNewOption().insertBefore(".add-option-div");
  });

  $(".create-poll-form").on("click", ".remove_option", function () {
    $(this).closest("div").remove();
  });
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
  <div class="form-group">
          <input class="form-control option" type="text" />
          <button type="button" id="remove_option" class="remove_option btn">Remove option</button>
        </div>
      `);
  return $option;
};
// send poll info on submit click
const submitPoll = function (event) {
  event.preventDefault();
  console.log("submitPoll");
  let email = $("#email").val();
  let question = $("#question").val();
  let description = $("#description").val();
  const options = [];
  $(".option")
    .toArray()
    .forEach((option) => {
      options.push({ name: $(option).val() });
    });

  if (email === "" || question === "" || description === "" || options === "") {
    alert("Make sure all fields have been filled out!");
    return;
  }
  createPoll(question, description, options, email);
};

const createPoll = function (question, description, options, email) {
  const data = {
    title: question,
    description,
    options,
    email,
  };

  return $.post("/api/poll/create", data)
    .done((result) => {
      // if response empty
      console.log("This is the result:", result);
      // document.location = "api/poll/results/" + result.poll.id;
      $("body").append(`
      <div class="show-urls">
    <h5>Poll Created!</h5>
    <h6>Here are your urls:</h6>
    <div class="alert alert-success" role="alert">
      Admin Link: <a href="/api/poll/results/${result.poll.id}" class="alert-link">
      /api/poll/results/${result.poll.id}
      </a>
      Voter Link:<a href="/api/poll/page/${result.poll.id}" class="alert-link">
      /api/poll/page/${result.poll.id}
      </a>
    </div>
  </div>`);
      return result;
    })
    .fail((err) => {
      console.log(err.message);
      alert("Error:", err.message);
    });
};
