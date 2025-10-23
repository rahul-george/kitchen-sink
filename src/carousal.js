import chevronLeft from "./assets/chevron-left.svg";
import chevronRight from "./assets/chevron-right.svg";
import "./carousal.css";

function setupTimeout(carousal, timeout) {
  return setTimeout(() => {
    Carousal.navigateToNextImage(carousal);
    setupTimeout(carousal, timeout);
  }, timeout);
}

export class Carousal {
  constructor(document, carousal_id) {
    this.document = document;
    this.carousal_id = carousal_id;
    this.carousal = this.document.querySelector(this.carousal_id);
    this.carousalImages = this.document.querySelectorAll(
      `${this.carousal_id}>img`
    );
    console.log(this.carousalImages);
    this.currentIdx = 0;
  }

  setup() {
    // This method generates all the divs and the structure for the carousal
    const carousalFragment = document.createDocumentFragment();
    carousalFragment.appendChild(this._setupLeftNavigationButton());
    carousalFragment.appendChild(this._setupRightNavigationButton());
    this._setupCarousalImages();
    this.carousal.appendChild(carousalFragment);
    setupTimeout(this, 5000);
  }

  static timedNavigate(carousal, timeout) {
    Carousal.navigateToNextImage(carousal);
    setTimeout(Carousal.timedNavigate, timeout);
  }

  static navigateToPreviousImage(carousal) {
    carousal.currentIdx =
      carousal.currentIdx === 0
        ? carousal.carousalImages.length - 1
        : carousal.currentIdx - 1;
    carousal._setupCarousalImages();
  }

  static navigateToNextImage(carousal) {
    carousal.currentIdx =
      carousal.currentIdx === carousal.carousalImages.length - 1
        ? 0
        : carousal.currentIdx + 1;
    carousal._setupCarousalImages();
  }

  _setupCarousalImages() {
    this.carousalImages.forEach((element, idx) => {
      if (idx !== this.currentIdx) {
        element.classList.add("hide");
      } else {
        element.classList.remove("hide");
      }
    });
  }

  _generateCarousalNavigationCircles(carousalFragment, count) {}

  _generateNavigationButton(imgClass, imgSrc, altText, callback) {
    const handle = document.createElement("img");
    handle.classList.add(imgClass);
    handle.src = imgSrc;
    handle.alt = altText;
    handle.addEventListener("click", (e) => {
      callback(this);
    });
    return handle;
  }
  _setupLeftNavigationButton() {
    return this._generateNavigationButton(
      "carousal-control-left",
      chevronLeft,
      "Carousal navigate left",
      Carousal.navigateToPreviousImage
    );
  }

  _setupRightNavigationButton() {
    return this._generateNavigationButton(
      "carousal-control-right",
      chevronRight,
      "Carousal navigate right",
      Carousal.navigateToNextImage
    );
  }
}
