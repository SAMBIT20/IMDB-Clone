// getting fata from local storage and fatch it ------------>
var titleStired = JSON.parse(localStorage.getItem("names") || "[]");

// function to create individual cards and display that ------->
function createCards(data) {
  // card body for display --------------->
  var parent = document.createElement("div");
  parent.classList.add("card");
  parent.setAttribute("id", Date.now());
  var child = document.createElement("div");
  child.classList.add("card-body");
  // H3 tag----->
  var h3 = document.createElement("h3");
  h3.classList.add("card-title");
  h3.innerText = data.name;
  child.appendChild(h3);
  // anchor tags & details button     ------->
  var details = document.createElement("a");
  details.classList.add("btn");
  details.classList.add("btn-success");
  details.setAttribute("href", "singlemovie.html?id=" + data.id);
  // icons for movie   -------->
  var iconDetails = document.createElement("i");
  iconDetails.classList.add("fa");
  iconDetails.classList.add("fa-info-circle");
  details.appendChild(iconDetails);
  var detailsText = document.createElement("span");
  detailsText.innerText = " Show Details";
  details.appendChild(detailsText);
  child.appendChild(details);
  // remove button    -------------------->
  var remove = document.createElement("a");
  remove.classList.add("btn");
  remove.classList.add("btn-danger");

  //remove icon  form list ----------->
  var iconRemove = document.createElement("i");
  iconRemove.classList.add("fa");
  iconRemove.classList.add("fa-times");
  remove.appendChild(iconRemove);
  var removeText = document.createElement("span");
  removeText.innerText = " Remove";
  remove.appendChild(removeText);
  remove.setAttribute("id", data.id);
  // Handling remove event on click event    ---------------->
  remove.addEventListener("click", function (ev) {
    console.log(titleStired);
    var id = this.id;
    removeMovie(titleStired, "id", id);
  });
  child.appendChild(remove);
  parent.appendChild(child);

  //Appending child to container -------------------->
  document.getElementById("cards-container").appendChild(parent);
}
// loop to add cards     ------------------>

for (let i = 0; i < titleStired.length; i++) {
  createCards(titleStired[i]);
}

// remove a Movie from fav list -------->
function removeMovie(arr, attr, value) {
  console.log(value);
  console.log(parent);
  var i = arr.length;
  while (i--) {
    if (arr[i][attr] === value) {
      arr.splice(i, 1);
    }
  }
  if (arr.length == 0) {
    window.localStorage.removeItem("names");
  }
  window.localStorage.setItem("names", JSON.stringify(arr));
  document.getElementById("cards-container").innerHTML = "";
  // addind cards back after removing movie ---------------->
  for (let i = 0; i < titleStired.length; i++) {
    createCards(titleStired[i]);
  }
}
