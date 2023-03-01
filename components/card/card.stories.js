import Tmpl from "./card.twig";
// import DrupalAttribute from "../../DrupalAttribute";

import styles from "./card.scss";
// import scripts from "./video.js";

export default {
  title: "Card",
  argTypes: {
    palette: {
      control: {
        type: "select",
        options: ["primary","secondary","tertiary","quarternary"]
      }
    }
  },
  args: {
    palette: "primary"
  }
};

export const Card = (_, { loaded: { renderedStory } }) => renderedStory;
Card.render = Tmpl;

// export const ButtonSecondary = (_, { loaded: { renderedStory } }) => renderedStory;
// ButtonSecondary.args = {
//   button_variant: "secondary"
// }
// ButtonSecondary.render = Tmpl;