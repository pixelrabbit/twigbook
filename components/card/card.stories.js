import card from "./card.twig";
import "./card.scss";

export default { 
    title: "Molecule/Card",
    args: {
        heading: "Card heading",
        content: "<p>This is HTML content here.</p>",
        buttons: [{}],
      }
};

export const default_card = card.bind({});
// default_card.args = {};
