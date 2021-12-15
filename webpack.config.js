const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    manager: './src/manager.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true
};
