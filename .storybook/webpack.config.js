const path = require("path");

module.exports = ({ config }) => {

  // Twig:
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      {
        loader: "twigjs-loader",
      },
    ],
  });

  // alias
  config.resolve.alias = {
      '@components': path.resolve(__dirname, '../components')
  }

  return config;
};
