import "./style.css";
import { Itheum } from "./itheum";

window.onload = () => {
  new Itheum(document.getElementsByClassName("viewport")[0] as HTMLElement, 100, 100);
};
