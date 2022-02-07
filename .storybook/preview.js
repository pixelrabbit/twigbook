import { configure } from '@storybook/html';
import Twig from 'twig';
import twigDrupal from 'twig-drupal-filters';
// Add the filters to Twig instance.
twigDrupal(Twig);
configure(require.context('../components', true, /\.stories\.js$/), module);


export const parameters = {
    options: {
      storySort: {
        order: ['Foundation', 'Atom', 'Molecule','Organism'],
      },
    },
  };