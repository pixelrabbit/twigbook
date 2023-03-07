import Tmpl from "./video.twig";
import DrupalAttribute from "../../DrupalAttribute";

import styles from "./video.scss";
import scripts from "./video.js";

export default {
  title: "Video with wrapper",
  argTypes: {
    media_src: { control: "text" },
    progress: { control: 'color' },
    controls_background: { control: 'color' },
  },
  args: {
    media_src: "https://www.w3schools.com/html/mov_bbb.mp4",
    progress: "hsla(170, 80%, 62%, 0.75)",
    controls_background: "hsla(0, 0%, 0%, 0.5)"
  }
};

export const Video = (_, { loaded: { renderedStory } }) => renderedStory;

Video.render = Tmpl;
