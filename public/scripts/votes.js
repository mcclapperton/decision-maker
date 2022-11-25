// for friends voting page w/ drag and drop ranking
$(() => {
  console.log("READY");

  $(".vote_button").on("submit", voteInPoll);

  const draggables = document.querySelectorAll(".draggable");
  const containers = document.querySelectorAll(".container");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      // console.log("dragstart");
      // adds opacity when dragging
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      // console.log("dragend");
      // removes opacity when dropped
      draggable.classList.remove("dragging");
    });
  });

  // looping thru any container elements
  containers.forEach((container) => {
    // listening for dragover event
    container.addEventListener("dragover", (event) => {
      // enable dropping element
      event.preventDefault();
      const afterElement = getDragAfterElement(container, event.clientY);
      // console.log(afterElement);
      const draggable = document.querySelector(".dragging");
      // const draggable = document.querySelectorAll(".dragging");
      if (afterElement == null) {
        // append when you drag into different spot in container
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  });

  // determine mouse position when dragging element
  function getDragAfterElement(container, y) {
    // get all draggable element so we know where placing in list
    const draggableElements = [
      // every draggable that we re not dragging, spread so this is a new array
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];
    // returns loop thru and determine which element is directly after mouse
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        // console.log(offset);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  console.log("READY COMPLETE");
});

// send array of options IN RANKED ORDER
const voteInPoll = function (event) {
  event.preventDefault();
  console.log("voteInPoll");
  // response:{
  // id
  // username
  // ranking [{id:, name:},{id:, name:} ]
  // }
  let username = $("#username").val();
  const ranking = [];
  $(".draggable")
    .toArray()
    .forEach((draggable) => {
      ranking.push({ id: $(id).val(), name: $(name).val() });
    });
  console.log("voteInPoll", id, username, ranking);

  createSubmission(id, username, ranking);
};

createSubmission = function (id, username, ranking) {
  const data = {
    id,
    username,
    ranking,
  };
  console.log("this is data:", data);

  return $.post("/api/poll/submit", data)
    .done((result) => {
      console.log("This is the result:", result);
      $("body").append(`
      <div class="alert alert-success" role="alert">
      <p>Your answer has been submitted successfully</p>
    </div>
      `);
      return result;
    })
    .fail((err) => {
      console.log(err.message);
      alert("Error:", err.message);
    });
};
