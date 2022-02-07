export default { title: 'Button' };

import button from './button.twig';
import './button.scss';

export const default_button = () => (
    button({
        text: "Im a button"
    })
);