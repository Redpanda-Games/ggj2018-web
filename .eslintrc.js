module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'jquery': true,
    },
    "globals": {
    },
    'extends': 'standard',
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 6,
    },
    'rules': {
        'no-new': 'off',
        'array-bracket-newline': ['error', {'multiline': true}],
        'array-bracket-spacing': ['error', 'never'],
        'comma-dangle': ['error', 'always-multiline'],
        'computed-property-spacing': ['error', 'never'],
        'consistent-return': ['error'],
        'for-direction': ['error'],
        'function-paren-newline': ['error', 'multiline'],
        'getter-return': 'error',
        'implicit-arrow-linebreak': ['error', 'beside'],
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'lines-around-comment': ['error', {
            'beforeBlockComment': true,
            'allowArrayStart': true,
            'allowBlockStart': true,
            'allowClassStart': true,
            'allowObjectStart': true,
        }],
        'padding-line-between-statements': ['error',
            {'blankLine': 'always', 'prev': '*', 'next': 'class'},
            {'blankLine': 'always', 'prev': '*', 'next': 'function'},
            {'blankLine': 'always', 'prev': '*', 'next': 'return'},
        ],
        'lines-between-class-members': ['error', 'always'],
        'max-statements-per-line': ['error', {'max': 1}],
        'multiline-ternary': ['error', 'always-multiline'],
        'no-alert': 'error',
        'no-catch-shadow': 'error',
        'no-console': 'error',
        'no-empty': ['error', {'allowEmptyCatch': true}],
        'no-empty-function': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-multi-assign': 'error',
        'no-param-reassign': ['error', {'props': false}],
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'object-curly-newline': ['error', {'consistent': true}],
        'object-curly-spacing': ['error', 'never'],
        'switch-colon-spacing': ['error', {'after': true, 'before': false}],
        'semi': ['error', 'always'],
    },
};