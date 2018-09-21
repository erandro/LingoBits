function loadScript(url, callback) {
  var script = document.createElement("script")
  script.type = "text/javascript";
  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

$(document).ready(function () {
  // Get references to page elements
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $exampleList = $("#example-list");

  // Display changes action
  function hideAndShow(hideTag, showTag) {
    if (hideTag.hasClass("show_class_name")) {
      $(hideTag).removeClass("show_class_name").addClass("disable_class_name");
    };
    if (showTag.hasClass("disable_class_name")) {
      $(showTag).removeClass("disable_class_name").addClass("show_class_name");
    }
  };

  // The API methods
  $(function () {

    // show idiom's adding form
    $(".adding_button").on("click", function (event) {
      // can change the "adding_button" button name
      event.preventDefault();
      // we should have the add button have an id of the idiom  
      var id = $(this).data("id");
      hideAndShow("#home_page_div", "#add_idiom_div");
      $(".submit_button").attr("data-id", id)
    });

    // create new idiom
    $(".submit_button").on("click", function (event) {
      // can change the "submit_button" button name
      event.preventDefault();
      // we should have the add button have an id of the idiom
      var id = $(this).data("id");
      var newIdiom = {
        language: $("#language_form"), // send language name or id?
        origin_idiom: $("#idiom_form").val().trim(),
        pronunciation: $("#pronunciation_form").val().trim(),
        literal_meaning: $("#literal_form").val().trim(),
        meaning: $("#meaning_form").val().trim(),
        category: $("#category_form").val().trim(),
        equevilant_id: id
      };
      console.log(newIdiom);
      $.ajax("/api/idioms", {
        type: "post",
        data: newIdiom
      }).then(
        function () {
          $(".submit_button").removeAttr("data-id")
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    });

    // get specific idiom
    $("#search_ber_submit".on("click", function (event) {
      // can change the "search_ber_submit" and "search_bar_input" button/class/id name
      var name = $("#search_bar_input")
      idiomName = {
        idiomName: name
      }
      event.preventDefault();
      $.ajax("/api/idioms/:idiom", {
        type: "get",
        data: idiomName
      }).then(
        function () {
          hideAndShow()
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    })
    updateTodo: function (example) {
        return $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: "api/examples",
          data: JSON.stringify(example)
        });
      },

      getExamples: function () {
        return $.ajax({
          url: "api/examples",
          type: "GET"
        });
      },

      deleteExample: function (id) {
        return $.ajax({
          url: "api/examples/" + id,
          type: "DELETE"
        });
      }
  };

});
