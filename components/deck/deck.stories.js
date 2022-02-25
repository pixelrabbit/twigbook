import deck from "./deck.twig";
import "./deck.scss";

const card_dummy = {
  heading: "This is a deck card"
}

export default { 
    title: "Molecule/Deck",
    args: {
        heading: "Deck heading",
        content: "<p>This is HTML content here. Anim deserunt elit eiusmod laboris do mollit ipsum pariatur elit nulla.</p>",
        cards: [card_dummy, card_dummy]
      }
};

export const default_deck = deck.bind({});
// default_card.args = {};
