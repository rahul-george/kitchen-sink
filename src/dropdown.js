import "./dropdown.css";
import chevronDown from "./assets/chevron-down.svg";
import chevronUp from "./assets/chevron-up.svg";

function initialize_dropdown(document) {
  const dropdownButtons = document.getElementsByClassName("dropdown-button");
  for (let dropdownButton of dropdownButtons) {
    dropdownButton.addEventListener(
      "click",
      onDropDownClicked(dropdownButton.parentNode),
    );
    dropdownButton.parentElement.dataset.status = "closed";
  }
}

function onDropDownClicked(dropdown) {
  // Using the wrapper here to pass the instance of parent dropdown properly instead of creating a global dependency
  // I could also move the inner function into initialize dropdown function and use the module pattern
  const dropdown_chevron = dropdown.querySelector("img");
  const dropdownContent = dropdown.querySelector(".dropdown-content");

  function onDropDownClickedHandler(event) {
    dropdownContent.classList.toggle("dropdown-content-show");

    dropdown.dataset.status === "closed"
      ? dropdownContent.classList.add("dropdown-content-show")
      : dropdownContent.classList.remove("dropdown-content-show");
    dropdown_chevron.src =
      dropdown.dataset.status === "closed" ? chevronUp : chevronDown;
    dropdown.dataset.status =
      dropdown.dataset.status === "closed" ? "open" : "closed";
  }
  return onDropDownClickedHandler;
}

export { initialize_dropdown };
