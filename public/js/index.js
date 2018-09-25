$(document).ready(function () {
  // _______________________________________________
  // # assign values to all elements that are called:
  // ## cards
  var homepageDiv = $("#home_page_div");
  var categoryDiv = $("#the_category_div");
  var languageDiv = $("#the_language_div");
  var idiomDiv = $("#the_idiom_div");
  var multiDiv = $("#multi_res_div");
  var addIdiomDiv = $("#add_page_div");
  // ## header
  var searchIdiomSubmit = $("#search_idiom_submit");
  var searchIdiomImput = $("#search_idiom_input");
  var homepageButton = $("#home_page_button");
  // ## home gage card - category
  var categoryButton = $(".category_button");
  var searchCategorySubmit = $("#search_category_submit");
  var searchCategoryImput = $("#search_category_input");
  // ## home gage card - language
  var languageButton = $(".language_button");
  var searchLanguageSubmit = $("#search_language_submit");
  var searchLanguageImput = $("#search_language_input");
  // ## multi idioms card
  var multiIdiomHolder = $("#multi_idiom_holder");
  // ## idiom card
  var addIdiomButton = $("#adding_button");
  var idiomCardName = $("#idiom_card_name");
  var idiomCardCategory = $("#idiom_card_category");
  var idiomCardPronunciation = $("#idiom_card_pronunciation");
  var idiomCardLiteralTrans = $("#idiom_card_literalTrans");
  var idiomCardMeaning = $("#idiom_card_meaning");
  var idiomCardLanguage = $("#idiom_card_language");
  var linkHolder = $("#link_holder");
  var copyButton = $("#copy_button");
  // ## add idiom card
  var addIdiomSubmit = $("#submit_idiom");
  var formLanguage = $("#language_form");
  var formIdiom = $("#idiom_form");
  var formPronunciation = $("#pronunciation_form");
  var formLiteral = $("#literal_form");
  var formMeaning = $("#meaning_form");
  // ## arrays
  var idiomsNames = [];
  var allCategories = [];
  var allLanguages = [0];

  // ___________________
  // # General functions:
  // ## Cards display changes
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
  // ## Autocomplete
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
  };
  autocomplete(document.getElementById("search_idiom_input"), idiomsNames);
  // ## Show searched idiom 
  function showSearchedIdiom(idiomObject) {
    idiomCardName.text(idiomObject[0].origin_idiom);
    idiomCardCategory.text(idiomObject[0].category);
    idiomCardPronunciation.text(idiomObject[0].pronunciation);
    idiomCardLiteralTrans.text(idiomObject[0].literal_meaning);
    idiomCardMeaning.text(idiomObject[0].meaning);
    idiomCardLanguage.attr("src", allLanguages[idiomObject[0].LanguageId].icon);
    addIdiomButton.attr("data-id", idiomObject[0].id).attr("data-category", idiomObject[0].category);
    copyButton.removeAttr("data-name");
    copyButton.attr("data-name", idiomObject[0].origin_idiom);
  };
  // ## Show all searched idioms
  function showMutiSearchedIdioms(multiIdiomObject) {
    multiIdiomHolder.empty();
    multiIdiomObject.forEach(function (element) {
      multiIdiomHolder.append(`<div class="multi_idiom_card col align-self-center card-deck justify-content-center"
      data-id="${element.id}"
      data-name="${element.origin_idiom}"
      data-category="${element.category}"
      data-pronunciation="${element.pronunciation}"
      data-literal="${element.literal_meaning}"
      data-meaning="${element.meaning}"
      data-languageid="${element.LanguageId}">
            <div class="resultCard card border-dark mb-3 card text-white text-center mb-3">
              <div class="card-header">
                <h3 class="card-title">${element.origin_idiom}</h3>
              </div>
              <div class="card-body justify-content-center">
                <p class="card-text" style="font-weight: bold">Meaning:</p>
                <p class="meaning">${element.meaning}</p>
              </div>
              <div class="container">
                <h1></h1>
              </div>
            </div>
          </div>`)
    });
  };
  // ## Making the links for idiom card
  function appendLinks(linksArray) {
    $(linkHolder).empty();
    $(linkHolder).append(
      `<h3 class="card-title" id="connections">Connections:</h3>`
    );
    linksArray.forEach(function (element) {
      var languageAbb = allLanguages[element.idiom.LanguageId].abbreviation;
      $(linkHolder).append(
        `<p class="card-title idiom_link"
          data-id="${element.idiom.id}"
          data-name="${element.idiom.origin_idiom}"
          data-category="${element.idiom.category}"
          data-pronunciation="${element.idiom.pronunciation}"
          data-literal="${element.idiom.literal_meaning}"
          data-meaning="${element.idiom.meaning}"
          data-languageid="${element.idiom.LanguageId}"
          >${element.idiom.origin_idiom}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          ${languageAbb}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <i class="fas fa-thumbs-up"></i>
          &nbsp;&nbsp;${element.rating}&nbsp;&nbsp;
          <i class="fas fa-thumbs-down fa-flip-horizontal"></i>
        </p>`
      );
    });
  };
  // ## Copy to clipborad function
  var $body = document.getElementsByTagName('body')[0];
  function clipboradCopy(idionText) {
    var $tempInput = document.createElement('INPUT');
    $body.appendChild($tempInput);
    $tempInput.setAttribute('value', idionText);
    $tempInput.select();
    document.execCommand('copy');
    $tempInput.removeAttribute('value', idionText);
    $body.removeChild($tempInput);
  };
  // ## clean form
  function cleanAddForm() {
    addIdiomSubmit.removeAttr("data-id").removeAttr("data-category");
    formIdiom.val("");
    formPronunciation.val("");
    formLiteral.val("");
    formMeaning.val("");
  };

  // _________________
  // # The API methods:
  $(function () {
    // ____________________
    // ## Button functions:
    // ### show idiom's adding form card
    addIdiomButton.on("click", function (event) {
      event.preventDefault();
      var id = $(this).data("id");
      var category = $(this).data("category");
      hideAndShow(addIdiomDiv);
      addIdiomSubmit.attr("data-id", id).attr("data-category", category);
    });
    // ### show homepage card
    homepageButton.on("click", function (event) {
      event.preventDefault();
      hideAndShow(homepageDiv);
    });
    // ### show idiom (from multi idioms) card
    $(document).on("click", ".multi_idiom_card", function (event) {
      event.preventDefault();
      var name = $(this).data("name");
      idiomCardName.text(name);
      idiomCardCategory.text($(this).data("category"));
      idiomCardPronunciation.text($(this).data("pronunciation"));
      idiomCardLiteralTrans.text($(this).data("literal_meaning"));
      idiomCardMeaning.text($(this).data("meaning"));
      idiomCardLanguage.attr("src", allLanguages[$(this).data("languageid")].icon);
      $(addIdiomButton).attr("data-id", $(this).data("id")).attr("data-category", $(this).data("category"));
      copyButton.removeAttr("data-name");
      copyButton.attr("data-name", name);
      getIdiomLinks($(this).data("id"));
      hideAndShow(idiomDiv);
    });
    // ### show idiom (from link) card
    $(document).on("click", ".idiom_link", function (event) {
      event.preventDefault();
      var name = $(this).data("name");
      idiomCardName.text(name);
      idiomCardCategory.text($(this).data("category"));
      idiomCardPronunciation.text($(this).data("pronunciation"));
      idiomCardLiteralTrans.text($(this).data("literal_meaning"));
      idiomCardMeaning.text($(this).data("meaning"));
      idiomCardLanguage.attr("src", allLanguages[$(this).data("languageid")].icon);
      $(addIdiomButton).attr("data-id", $(this).data("id")).attr("data-category", $(this).data("category"));
      copyButton.removeAttr("data-name");
      copyButton.attr("data-name", name);
      getIdiomLinks($(this).data("id"));
      hideAndShow(idiomDiv);
    });
    // ### Copy to clipboard "click"
    copyButton.on("click", function (event) {
      event.preventDefault();
      var idiom = $(this).data("name")
      clipboradCopy(idiom);
    });

    // ____________________________________________
    // ## Getting information when loading the page:
    // ### "get" all idioms and push to an array
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
    // ### "get" all languages and append to drop-downs
    $.ajax("/api/languages", {
      type: "get"
    }).then(
      function (data) {
        data.forEach(function (element) {
          allLanguages.push(element);
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
    // ### "get" all categories and append to homepage drop-down
    $.ajax("/api/categories", {
      type: "get"
    }).then(
      function (data) {
        data.forEach(function (element) {
          allCategories.push(element);
          searchCategoryImput.append(
            `<option class="search_Category_input"
            data-name="${element}">
            ${element}
            </option>`
          );
        });
      }
    ).catch(function (err) {
      console.log(err);
    });

    // ______________
    // ## ajax calls:
    // ### create new idiom
    addIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      var id = $(this).data("id").toString();
      var idiomCategory = $(this).data("category");
      var langId = formLanguage.find(":selected").data("id");
      var newIdiom = {
        LanguageId: langId,
        origin_idiom: formIdiom.val().trim(),
        pronunciation: formPronunciation.val().trim(),
        literal_meaning: formLiteral.val().trim(),
        meaning: formMeaning.val().trim(),
        category: idiomCategory
      };
      $.ajax("/api/idiom/" + id, {
        type: "post",
        data: newIdiom
      }).then(
        function (data) {
          getIdiomLinks(id);
          hideAndShow(idiomDiv);
          cleanAddForm();
        }
      ).catch(function (err) {
        console.log(err);
      });
    });
    // ### get all (or one) idioms - search by name
    searchIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      var name = searchIdiomImput.val().trim();
      name = name.replace(/\s+/g, '+');
      $.ajax("/api/idiomsbyName/" + name, {
        type: "get"
      }).then(
        function (data) {
          $(searchIdiomImput).val("");
          if (data.length === 1) {
            hideAndShow(idiomDiv);
            showSearchedIdiom(data);
            getIdiomLinks(data[0].id);
          } else {
            hideAndShow(multiDiv);
            showMutiSearchedIdioms(data);
          }
        }
      );
    });
    // ### get specific idiom - by id
    function getIdiomLinks(idiomId) {
      $.ajax("/api/idiom/" + idiomId, {
        type: "get"
      }).then(
        function (data) {
          appendLinks(data.LinkedIdioms)
        }
      );
    };
    // ### get all idioms from specific category - search by category
    categoryButton.on("click", function (event) {
      event.preventDefault();
      var category = $(this).data("name");
      $.ajax("/api/idiomsbyCategory/" + category, {
        type: "get"
      }).then(
        function (data) {
          hideAndShow(multiDiv);
          showMutiSearchedIdioms(data)
        }
      );
    });
    searchCategorySubmit.on("click", function (event) {
      event.preventDefault();
      var category = searchCategoryImput.find(":selected").data("name");
      $.ajax("/api/idiomsbyCategory/" + category, {
        type: "get"
      }).then(
        function (data) {
          hideAndShow(multiDiv);
          showMutiSearchedIdioms(data)
        }
      );
    });
    // ### get all idioms from specific language - search by language
    languageButton.on("click", function (event) {
      event.preventDefault();
      var languageId = $(this).data("id");
      $.ajax("/api/idiomsbyLanguage/" + languageId, {
        type: "get"
      }).then(
        function (data) {
          hideAndShow(multiDiv);
          showMutiSearchedIdioms(data)
        }
      );
    });
    searchLanguageSubmit.on("click", function (event) {
      event.preventDefault();
      var language = searchLanguageImput.find(":selected").data("id");
      $.ajax("/api/idiomsbyLanguage/" + language, {
        type: "get"
      }).then(
        function (data) {
          hideAndShow(multiDiv);
          showMutiSearchedIdioms(data)
        }
      );
    });

  });
});