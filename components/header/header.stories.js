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
          text: "Work",
          href: "#work"
        },{
          text: "About",
          href: "#about"
        },{
          text: "Stuff",
          href: "#stuff"
        }]
      }
};

export const Header = header.bind({});
// default_card.args = {};
