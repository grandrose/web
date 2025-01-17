const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@assets": path.resolve(__dirname, "src/assets"),
    "@api": path.resolve(__dirname, "src/api"),
    "@common": path.resolve(__dirname, "src/common"),
    "@theme": path.resolve(__dirname, "src/components/theme"),
    "@components": path.resolve(__dirname, "src/components/common"),
    "@context": path.resolve(__dirname, "src/context"),
    "@pages": path.resolve(__dirname, "src/pages"),
  };
  return config;
};
