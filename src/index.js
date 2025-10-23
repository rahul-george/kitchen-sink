import { initialize_dropdown } from "./dropdown";
import { Carousal } from "./carousal";
import "./styles.css";

initialize_dropdown(document);

const carousal = new Carousal(document, "#carousal_1");
carousal.setup();
