import header from "./header.twig";
import "./header.scss";

export default { 
    title: "Organism/Header",
    parameters: {
      layout: 'fullscreen'
    },
    args: {
        logotext: "Pixel<span class='accent'>Rabbit</span>",
        nav: [{
          text: "About",
          href: "#about"
        },{
          text: "Tools",
          href: "#tools"
        },{
          text: "Methods",
          href: "#methods"
        }]
      }
};

export const Header = header.bind({});
// default_card.args = {};
