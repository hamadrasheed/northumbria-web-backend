module.exports = {
	'env': {
		'es6': true,
		'node': true
	},
	'parserOptions': {
		'ecmaVersion': 2020,
		'sourceType': 'module'
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'rules': {
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'warn'
		],
		'no-redeclare': ['error', { 'builtinGlobals': false }],
		'no-mixed-spaces-and-tabs': 'error',
		'no-invalid-regexp': 'error',
		'no-multi-spaces': 'error',
		'no-irregular-whitespace': 'error',
		'no-dupe-keys': 'error',
		'constructor-super': 'error',
		'no-global-assign': 'error',
		'comma-spacing': ['warn', { 'before': false, 'after': true }],
		'no-use-before-define': ['error'],
		'no-shadow-restricted-names': 'error',
		'array-bracket-spacing': ['warn'],
		'no-unused-vars': ['error'],
		'no-var': 'warn',
		'no-this-before-super': 'error',
		'no-dupe-args': 'error',
		'no-duplicate-case': 'error',
		'no-duplicate-imports': 'error',
		'no-undef': 'error',
		'no-ex-assign': 'error',
		'no-misleading-character-class': 'error',
		'no-const-assign': 'error',
		'no-self-assign': 'error',
		'no-self-compare': 'error',
		'no-dupe-else-if': 'error',
		'no-unreachable': 'error',
		'no-unsafe-negation': 'error',
		'no-useless-call': 'error',
		'block-spacing': ['error', 'always'],
		'prefer-const': ['error', {'destructuring': 'all'}],
		'rest-spread-spacing': ['error', 'never'],
		'no-useless-escape':['off']
	}
};