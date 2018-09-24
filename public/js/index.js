$(document).ready(function () {

  // assign values to all elements that are called
  // cards
  var homepageDiv = $("#home_page_div");
  var categoryDiv = $("#the_category_div");
  var languageDiv = $("#the_language_div");
  var idiomDiv = $("#the_idiom_div");
  var multiDiv = $("#multi_res_div");
  var addIdiomDiv = $("#add_page_div");
  // header
  var searchIdiomSubmit = $("#search_idiom_submit");
  var searchIdiomImput = $("#search_idiom_input");
  // home gage card - category
  var categoryButton = $(".category_button");
  var searchCategorySubmit = $("#search_category_submit");
  var searchCategoryImput = $("#search_category_input");
  // home gage card - language
  var languageButton = $(".language_button");
  var searchLanguageSubmit = $("#search_language_submit");
  var searchLanguageImput = $("#search_language_input");
  // idiom card
  var addIdiomButton = $("#adding_button");
  var equivalentIdiom = $(".link_idiom");
  // add idiom card
  var addIdiomSubmit = $("#submit_idiom");
  var formLanguage = $("#language_form");
  var formIdiom = $("#idiom_form");
  var formPronunciation = $("#pronunciation_form");
  var formLiteral = $("#literal_form");
  var formMeaning = $("#meaning_form");
  var formCategory = $("#category_form"); // delete (pass value from idiom card)

  // Cards display changes
  function hideAndShow(showTag) {
    if (showTag !== homepageDiv) {
      homepageDiv.addClass("hideDiv");
    }
    if (showTag !== categoryDiv) {
      categoryDiv.addClass("hideDiv");
    }
    if (showTag !== languageDiv) {
      languageDiv.addClass("hideDiv");
    }
    if (showTag !== idiomDiv) {
      idiomDiv.addClass("hideDiv");
    }
    if (showTag !== addIdiomDiv) {
      addIdiomDiv.addClass("hideDiv");
    }
    if (showTag !== multiDiv) {
      multiDiv.addClass("hideDiv");
    }
    showTag.removeClass("hideDiv");
  }

  // Autocomplete
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function () {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function () {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) {
        x = x.getElementsByTagName("div");
      }
      if (e.keyCode === 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) {
            x[currentFocus].click();
          }
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) {
        return false;
      }
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) {
        currentFocus = 0;
      }
      if (currentFocus < 0) {
        currentFocus = (x.length - 1);
      }
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
  var idiomsNames = [];
  autocomplete(document.getElementById("search_idiom_input"), idiomsNames);

  // The API methods
  $(function () {

    // show idiom's adding form
    addIdiomButton.on("click", function (event) {
      event.preventDefault();
      // we should have the add button have an id of the idiom  
      var id = $(this).data("id");
      var category =
        hideAndShow(addIdiomDiv);
      addIdiomSubmit.attr("data-id", id).attr("data-category", category);
    });

    // "get" all idioms and push to an array
    $.ajax("/api/idioms", {
      type: "get"
    }).then(
      function (data) {
        data.forEach(function (element) {
          idiomsNames.push(element.origin_idiom)
        });
      }
    ).catch(function (err) {
      console.log(err);
    });

    // "get" all languages and append to homepage drop-down
    $.ajax("/api/languages", {
      type: "get"
    }).then(
      function (data) {
        data.forEach(function (element) {
          searchLanguageImput.append(
            `<option class="search_language_input"
            data-id="${element.id}"
            data-name="${element.language_name}"
            data-abbreviation="${element.abbreviation}"
            data-icon="${element.icon}"
            >${element.language_name}</option>`
          );
          formLanguage.append(
            `<option class="search_language_input"
            data-id="${element.id}"
            data-name="${element.language_name}"
            data-abbreviation="${element.abbreviation}"
            data-icon="${element.icon}"
            >${element.language_name}</option>`
          );
        });
      }
    ).catch(function (err) {
      console.log(err);
    });

    // get all categories and append to homepage drop-down
    /*$.ajax("/api/categories", {
      type: "get"
    }).then(
      function (data) {
        data.forEach(function (element) {
          searchCategoryImput.append(
            `<option class="search_language_input"
            data-id="${element.id}"
            data-name="${element.language_name}"
            data-abbreviation="${element.abbreviation}"
            data-icon="${element.icon}"
            >${element.language_name}</option>`
          );
        });
      }
    ).catch(function (err) {
      console.log(err);
    });*/

    // ajax calls:

    // create new idiom
    addIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      // we should have the add button have an id of the idiom
      var id = $(this).data("id");
      var idiomCategory = $(this).data("category");
      var newIdiom = {
        LanguageId: formLanguage, // send language id
        origin_idiom: formIdiom.val().trim(),
        pronunciation: formPronunciation.val().trim(),
        literal_meaning: formLiteral.val().trim(),
        meaning: formMeaning.val().trim(),
        category: idiomCategory
      };
      $.ajax("/api/idioms/" + id, {
        type: "post"
      }).then(
        function () {
          addIdiomSubmit.removeAttr("data-id").removeAttr("data-category");
          hideAndShow(idiomDiv);
          //getting an object with the info I need + Linked Idioms
        }
      ).catch(function (err) {
        console.log(err);
      });
    });

    // get all (or one) idioms - search by name
    searchIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      var name = searchIdiomImput.replace(/\s+/g, "+");
      $.ajax("/api/idiomsbyName" + name, {
        type: "get"
      }).then(
        function () {
          hideAndShow(idiomDiv);
          // I'm getting an array with objects
          // if this array lengh === 1 
          // Show idiomDiv
          // if this array lengh > 1 
          // Show idiomsDiv
        }
      );
    });

    // get specific idiom - by id
    equivalentIdiom.on("click", function (event) {
      event.preventDefault();
      // we should have the equivalentIdiom button have an id of the idiom
      var id = $(this).data("id");
      $.ajax("/api/idiom/" + id, {
        type: "get"
      }).then(
        function () {
          hideAndShow(idiomDiv);
        }
      );
    });

    // get all idioms from specific category - search by category
    categoryButton.on("click", function (event) {
      event.preventDefault();
      // we should have the category button have an name of the category  
      var category = $(this).data("name");
      $.ajax("/api/idiomsbyCategory/" + category, {
        type: "get"
      }).then(
        function () {
          hideAndShow(categoryDiv);
          // do things to show the idioms by category on category card
        }
      );
    });
    searchCategorySubmit.on("click", function (event) {
      event.preventDefault();
      var category = searchCategoryImput;
      $.ajax("/api/idiomsbyCategory/" + category, {
        type: "get"
      }).then(
        function () {
          hideAndShow(categoryDiv);
          // do things to show the idioms by language on language card
          location.reload();
        }
      );
    });

    // get all idioms from specific language - search by language
    languageButton.on("click", function (event) {
      event.preventDefault();
      // we should have the language button have an name of the language  
      var language = $(this).data("name");
      $.ajax("/api/idiomsbyLanguage/" + language, {
        type: "get"
      }).then(
        function () {
          hideAndShow(languageDiv);
          // do things to show the idioms by language on language card
        }
      );
    });
    searchLanguageSubmit.on("click", function (event) {
      event.preventDefault();
      var language = searchLanguageImput;
      $.ajax("/api/idiomsbyLanguage/" + language, {
        type: "get"
      }).then(
        function () {
          hideAndShow(languageDiv);
          // do things to show the idioms by language on language card
        }
      );
    });

  });
});

//test function area ******************* v down here v

var testFunction = function () {
  console.log("test");
};

testFunction();
//test function area ******************* ^  up here  ^

/*
var testFunction = function (event) {
  //event.preventDefault();
  var id = "3";
  var newIdiom = {
    LanguageId: 1,
    origin_idiom: "this is a test origin_idiom 1",
    pronunciation: "this is a test pronunciation 1",
    literal_meaning: "this is a test literal_meaning 1",
    meaning: "this is a test meaning 1",
    category: "this is a test category 1"
  };
  $.ajax("/api/idiom/" + id, {
    type: "post",
    data: newIdiom
  }).then(
    function (data) {
      console.log(data);
      // addIdiomSubmit.removeAttr("data-id");
      // hideAndShow(idiomDiv);
      // need to run the "get specific idiom" function
      // do things to show the new idiom as a card
      // location.reload();
    }
  ).catch(function (err) {
    console.log(err);
  });
};
*/