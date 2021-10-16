// Trigger function get Data on each keyup event in input  for Movie=============>
document.getElementById("movie-name").onkeyup = getData;

//Movie id
let movieId = 0;
// function to get data
function getData() {
  var val = document.getElementById("movie-name").value;
  var list = document.getElementById("auto-complete");
  clearList();

  var xhrRequest = new XMLHttpRequest();
  // Handling http request ------------------>
  xhrRequest.onload = function () {
    var result = JSON.parse(xhrRequest.response);
    // Getting all the available data and  get =--------------->
    var names = result.Search;

    if (names == null) {
      clearList();
      console.log("not found!");
    } else {
      for (var i of names) {
        // creating individual list item and appending it to list --------->
        var li = document.createElement("li");
        li.innerText = i.Title;
        li.id = i.imdbID;
        li.classList.add("list-group-item");
        li.addEventListener("click", function () {
          movieId = this.id;
          document.getElementById("movie-name").value = this.innerText;
          clearList();
          // brings the focus to input and display --------------------->
          document.getElementById("movie-name").focus();
          return;
        });
        var ul = document.getElementById("auto-complete").appendChild(li);
      }
    }
  };
  // xmlRequest
  xhrRequest.open("get", "https://www.omdbapi.com/?&apikey=a6f1758c&s=" + val);
  xhrRequest.send();
}
// handling enter key event ----------->

document
  .getElementById("movie-name")
  .addEventListener("keydown", function (ev) {
    if (ev.keyCode == 13) {
      if (movieId == 0) {
        alert("No Movie found! ");
      } else {
        showmovie();
      }
    }
  });

// Function to clear the list items from list
function clearList() {
  var list = document.getElementById("auto-complete");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}
// on clicking search button to Search
document.getElementById("btn-search").addEventListener("click", showmovie);
function showmovie() {
  var name = document.getElementById("movie-name").value;
  if (name == "") {
    alert("Enter the name to be searched");
  } else if (movieId == 0) {
    alert("No Movie found! ");
  } else {
    window.open("singlemovie.html?id=" + movieId, "blank");
    console.log(movieId);
  }
}
// on clicking envent my favourite button ------------------>
document.getElementById("btn-favourite").addEventListener("click", function () {
  window.location.assign("favourite.html");
});
