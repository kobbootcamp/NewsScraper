$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})



$(".delete-article").on("click", function (event) {
  var thisId = $(this).attr("data-id");

  $.ajax({
    url: "/deleteArticle/" + thisId,
    type: "DELETE"
  }).then(
    function () {
      location.reload();
    }
  )
})



$(".save-article").on("click", function (event) {
  var thisId = $(this).attr("data-id");

  $.ajax({
    url: "/saveArticle/" + thisId,
    type: "POST"
  }).then(
    function () {
      location.reload();
    }
  )
})


$("#commentButton").on("click", function () {


  // Empty the notes from the note section
   $("#articleName").empty();

  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#articleName").text(data.title);
      $("#message-text").text(data.note);

      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        $("#message-text").val(data.note.body);

      }
    });
});

// When you click the savenote button
$("#saveNoteButton").on("click", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#articleName").val(),
        // Value taken from note textarea
        body: $("#message-text").val()
      }
    })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#articleName").val("");
  $("#message-text").val("");
});