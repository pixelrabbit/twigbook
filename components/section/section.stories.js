import section from "./section.twig";
import "./section.scss";

export default { 
    title: "Organism/Section",
    parameters: {
      layout: 'fullscreen'
    },
    args: {

      }
};

export const Section = section.bind({});
// default_card.args = {};
