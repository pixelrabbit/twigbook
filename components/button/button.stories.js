import Tmpl from "./button.twig";
// import DrupalAttribute from "../../DrupalAttribute";

import styles from "./button.scss";
// import scripts from "./video.js";

export default {
  title: "Button",
  argTypes: {
    button_href: {control: "text"},
    button_content: { control: "text" },
    button_variant: {
      control: {
        type: "select",
        options: ["primary","secondary","tertiary","quarternary"]
      }
    }
  },
  args: {
    button_href: "#",
    button_variant: "primary"
  }
};

export const Button = (_, { loaded: { renderedStory } }) => renderedStory;
Button.render = Tmpl;

// export const ButtonSecondary = (_, { loaded: { renderedStory } }) => renderedStory;
// ButtonSecondary.args = {
//   button_variant: "secondary"
// }
// ButtonSecondary.render = Tmpl;