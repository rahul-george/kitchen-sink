function initialize_dropdown(document) {
  const dropdown_button = document.getElementsByClassName("dropdown-button");
  dropdown_button[0].addEventListener("click", onDropDownClicked);
}

function onDropDownClicked(event) {
  console.log("Clicked!");
}

export { initialize_dropdown };
