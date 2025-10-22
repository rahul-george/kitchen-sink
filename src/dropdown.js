import "./dropdown.css";
import chevronDown from "./assets/chevron-down.svg";
import chevronUp from "./assets/chevron-up.svg";

function initialize_dropdown(document) {
  const dropdownButtons = document.getElementsByClassName("dropdown-button");
  for (let dropdownButton of dropdownButtons) {
    const { onDropDownClickedHandler, outsideDropDownClickHandler } =
      onDropDownClicked(dropdownButton.parentNode);
    dropdownButton.addEventListener("click", onDropDownClickedHandler);
    dropdownButton.parentElement.dataset.status = "closed";
    window.addEventListener("click", outsideDropDownClickHandler);
  }
}

function onDropDownClicked(dropdown) {
  // Using the wrapper here to pass the instance of parent dropdown properly instead of creating a global dependency
  // I could also move the inner function into initialize dropdown function and use the module pattern
  const dropdownChevron = dropdown.querySelector("img");
  const dropdownContent = dropdown.querySelector(".dropdown-content");
  const dropdownButton = dropdown.querySelector(".dropdown-button");

  function closeDropdown() {
    dropdownContent.classList.remove("dropdown-content-show");
    dropdownChevron.src = chevronDown;
    dropdown.dataset.status = "closed";
  }

  function openDropdown() {
    dropdownContent.classList.add("dropdown-content-show");
    dropdownChevron.src = chevronUp;
    dropdown.dataset.status = "open";
  }

  const outsideDropDownClickHandler = function (event) {
    if (event.target !== dropdownButton && event.target !== dropdownChevron) {
      // Close dropdown if clicked outside
      closeDropdown();
    }
  };
  const onDropDownClickedHandler = function (event) {
    dropdown.dataset.status === "closed" ? openDropdown() : closeDropdown();
  };
  return { onDropDownClickedHandler, outsideDropDownClickHandler };
}

export { initialize_dropdown };
