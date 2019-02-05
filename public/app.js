// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<div class='card'><p class='title' data-id='" + data[i]._id + "'>" + data[i].title + "<br /> <a class='article-link' target='_blank' rel='noopener noreferrer' href='" + data[i].link + "'>" + data[i].link + "</a></p></div>");
//   }
// });



// $.getJSON("/saved", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<div class='card'><p data-id='" + data[i]._id + "'>" + data[i].title + "<br /> <a class='article-link' target='_blank' rel='noopener noreferrer' href='" + data[i].link + "'>" + data[i].link + "</a></p></div>");
//   }
// });

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})


// $('#exampleModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })



$(".delete-article").on("click", function(event) {
  var thisId = $(this).attr("data-id");

  $.ajax({
    url: "/deleteArticle/" + thisId,
    type: "DELETE"
  }).then(
    function() {
      location.reload();
    }
  )
})



$(".save-article").on("click", function(event) {
  var thisId = $(this).attr("data-id");

  $.ajax({
    url: "/saveArticle/" + thisId,
    type: "POST"
  }).then(
    function() {
      location.reload();
    }
  )
})


// $(".add-note").on("click", function() {
//   $("#articleName").
// })

// Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
  $(".add-note").on("click", function() {
  // Empty the notes from the note section
  // $("#notes").empty();

  $("#articleName").empty();

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
// console.log(thisId)
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      // $("#notes").append("<h2>" + data.title + "</h2>");
      $("#articleName").text(data.title);
      $("#message-text").text(data.note);
      // An input to enter a new title
      // $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        // $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#message-text").val(data.note.body);

      }
    });
});

// When you click the savenote button
// $(document).on("click", "#savenote", function() {
  $("#saveNoteButton").on("click", function() {
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
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#articleName").val("");
  $("#message-text").val("");
});
