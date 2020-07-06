module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
  },
  "extends": [
    "plugin:react/recommended",
    "google",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  // Use babel-eslint parser to fix : Parsing error: Unexpected token import
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2018,
  },
  "plugins": [
    "react",
  ],
  "rules": {
    // Turn off rule to fix: Component definition is missing display name  react/display-name
    "react/display-name": "off",
    // Turn off rule with functional React
    // "react/prop-types": "off",
  },
  // https://github.com/yannickcr/eslint-plugin-react#configuration
  "settings": {
    "react": {
      "version": "detect",
    },
  },
};
