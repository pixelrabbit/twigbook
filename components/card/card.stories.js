export default { title: 'Card' };

import card from './card.twig';
import './card.scss';

export const default_card = () => (
    card({
        heading: "Card heading",
        content: "<p>This is HTML content.</p>",
        buttons: [{}]
    })
);