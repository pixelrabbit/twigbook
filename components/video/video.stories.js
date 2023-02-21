import Tmpl from "./video.twig";
import DrupalAttribute from "../../DrupalAttribute";

import styles from "./video.scss";
import scripts from "./video.js";

export default {
  title: "Video with wrapper",
  argTypes: {
    media_src: { control: "text" },
  },
  args: {
    media_src: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
};

export const Video = (_, { loaded: { renderedStory } }) => renderedStory;

Video.render = Tmpl;
