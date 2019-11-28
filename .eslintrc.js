module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "script",
    },
    "plugins": [
        "react",
        "eslint-plugin"
    ],
    "rules": {
        "comma-dangle": [2, "never"],
        "object-curly-spacing": [2, "never"],
        "array-bracket-spacing": [2, "never"],
        "max-len": [2, 120, {
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignoreComments": true,
        }],
        "operator-linebreak": [2, "after"],
        "consistent-return": 0,

        "prefer-destructuring": [2, { "array": false, "object": false }, { "enforceForRenamedProperties": false }],

        "function-paren-newline": 0,
        "no-plusplus": 1,
        "no-param-reassign": 1,
        "no-mixed-operators": 1,
        "no-restricted-syntax": 1,
        "valid-jsdoc": [2, {
            "requireReturn": false,
            "requireParamDescription": false,
            "requireReturnDescription": false,
        }],
    }
};
