import button from "./button.twig";
import "./button.scss";

export default {
  title: "Atom/Button",
  args: {
    text: "This is a button",
    href: "#" 
  },
};

export const default_button = button.bind({});
