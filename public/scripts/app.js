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

  // drag and drop
});
