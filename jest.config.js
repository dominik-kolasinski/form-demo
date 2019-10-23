module.exports = {
  testMatch: ["<rootDir>/**/*.test.(js|jsx)"],
  setupFiles: ["<rootDir>/test/setupTests.js"],
  transformIgnorePatterns: [`<rootDir>/node_modules/`],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  }
};
