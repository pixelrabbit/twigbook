import Tmpl from "./video.twig";
import DrupalAttribute from "../../DrupalAttribute";

import styles from "./video.scss";
import scripts from "./video.js";

export default {
  title: "Video with wrapper",
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    test: "test works"
  }
};

export const Video = (_, { loaded: { renderedStory } }) => renderedStory;

Video.render = Tmpl;
